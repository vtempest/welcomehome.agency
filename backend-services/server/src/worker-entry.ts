/**
 * Cloudflare Workers Entry Point
 * This file adapts the Koa application to work with Cloudflare Workers Fetch API
 */

import "reflect-metadata";
import "./providers/index.js";
import { container } from "tsyringe";
import app from "./app.js";
import config from "./config.js";
import type { AppConfig } from "./config.js";
import { Env } from "./types/worker-env.js";

/**
 * Convert Koa context to Fetch API Response
 */
async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  // Create a Koa-compatible request/response context
  const url = new URL(request.url);
  
  // Build Koa-compatible request object
  const koaRequest = {
    method: request.method,
    url: url.pathname + url.search,
    header: Object.fromEntries(request.headers),
    headers: request.headers,
    query: Object.fromEntries(url.searchParams),
    path: url.pathname,
    host: url.host,
    hostname: url.hostname,
    protocol: url.protocol.slice(0, -1), // Remove trailing ':'
    secure: url.protocol === 'https:',
    ip: request.headers.get('cf-connecting-ip') || 'unknown',
    ips: [],
    subdomains: [],
    originalUrl: url.pathname + url.search,
    href: url.href,
    origin: url.origin,
    fresh: false,
    stale: false,
    idempotent: false,
    charset: '',
    length: request.headers.get('content-length') ? parseInt(request.headers.get('content-length')!) : undefined,
    type: request.headers.get('content-type') || '',
    body: request,
    read: async () => {
      const arrayBuffer = await request.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    },
    get: (key: string) => request.headers.get(key),
    has: (key: string) => request.headers.has(key),
  };

  // Build Koa-compatible response object
  let status = 200;
  let headers: Record<string, string> = {};
  let body: any = null;
  let contentType: string | undefined;

  const koaResponse = {
    status: 200,
    message: '',
    header: {},
    headers: {},
    body: null,
    type: '',
    lastModified: null,
    etag: null,
    length: 0,
    writable: true,
    set: (key: string, value?: string) => {
      if (value !== undefined) {
        headers[key] = value;
        koaResponse.headers[key] = value;
        koaResponse.header[key] = value;
      } else if (typeof key === 'object') {
        Object.assign(headers, key);
        Object.assign(koaResponse.headers, key);
        Object.assign(koaResponse.header, key);
      }
      return koaResponse;
    },
    get: (key: string) => headers[key],
    has: (key: string) => key in headers,
    remove: (key: string) => {
      delete headers[key];
      delete koaResponse.headers[key];
      delete koaResponse.header[key];
      return koaResponse;
    },
    type: '',
    set type(value: string) {
      contentType = value;
      koaResponse.set('Content-Type', value);
    },
    get type() {
      return contentType || '';
    },
    body: null,
    set body(value: any) {
      body = value;
      koaResponse.body = value;
    },
    get body() {
      return body;
    },
    status: 200,
    set status(code: number) {
      status = code;
      koaResponse.status = code;
    },
    get status() {
      return status;
    },
    message: '',
    length: 0,
    writable: true,
    redirect: (url: string, alt?: string) => {
      koaResponse.status = 301;
      koaResponse.set('Location', url);
      return koaResponse;
    },
    attachment: () => koaResponse,
    headerSent: false,
    lastModified: null,
    etag: null,
  };

  // Create Koa context
  const koaContext: any = {
    request: koaRequest,
    response: koaResponse,
    req: koaRequest,
    res: koaResponse,
    state: {},
    app: app,
    originalUrl: url.pathname + url.search,
    ip: request.headers.get('cf-connecting-ip') || 'unknown',
    accept: null,
    cookies: {
      get: (name: string) => {
        const cookieHeader = request.headers.get('cookie');
        if (!cookieHeader) return undefined;
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        return cookies[name];
      },
      set: () => {},
    },
    assert: (condition: any, status: number, message: string) => {
      if (!condition) {
        const error: any = new Error(message);
        error.status = status;
        throw error;
      }
    },
    throw: (status: number, message?: string) => {
      const error: any = new Error(message || 'Error');
      error.status = status;
      throw error;
    },
    params: {},
    query: Object.fromEntries(url.searchParams),
    get: (key: string) => request.headers.get(key),
    set: (key: string, value: string) => koaResponse.set(key, value),
    remove: (key: string) => koaResponse.remove(key),
    status: 200,
    set status(code: number) {
      status = code;
      koaContext.status = code;
    },
    get status() {
      return status;
    },
    message: '',
    body: null,
    set body(value: any) {
      body = value;
      koaContext.body = value;
    },
    get body() {
      return body;
    },
  };

  try {
    // Process request body if present
    if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        body = await request.json();
        koaRequest.body = body;
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        body = Object.fromEntries(formData);
        koaRequest.body = body;
      } else if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        body = Object.fromEntries(formData);
        koaRequest.body = body;
      } else {
        body = await request.text();
        koaRequest.body = body;
      }
    }

    // Execute Koa middleware chain
    await app.callback()(koaContext);

    // Convert Koa response to Fetch Response
    let responseBody: BodyInit;
    const finalBody = koaContext.body || body;

    if (finalBody === null || finalBody === undefined) {
      responseBody = '';
    } else if (typeof finalBody === 'string') {
      responseBody = finalBody;
    } else if (finalBody instanceof ReadableStream) {
      responseBody = finalBody;
    } else if (finalBody instanceof ArrayBuffer) {
      responseBody = finalBody;
    } else if (finalBody instanceof Uint8Array) {
      responseBody = finalBody;
    } else if (typeof finalBody === 'object') {
      responseBody = JSON.stringify(finalBody);
      if (!koaResponse.type) {
        koaResponse.set('Content-Type', 'application/json');
      }
    } else {
      responseBody = String(finalBody);
    }

    // Merge headers from koaResponse
    const responseHeaders = new Headers();
    Object.entries(headers).forEach(([key, value]) => {
      responseHeaders.set(key, value);
    });

    // Ensure Content-Type is set if not already
    if (!responseHeaders.has('Content-Type') && typeof finalBody === 'object' && finalBody !== null) {
      responseHeaders.set('Content-Type', 'application/json');
    }

    return new Response(responseBody, {
      status: koaContext.status || status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    // Error handling
    const statusCode = error.status || 500;
    const message = error.message || 'Internal Server Error';
    
    return new Response(JSON.stringify({ 
      message,
      error: config.env !== 'production' ? error.stack : undefined 
    }), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Cloudflare Workers Export
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Set environment variables from Workers env
    if (env) {
      Object.assign(process.env, env);
    }
    
    return handleRequest(request, env, ctx);
  },
};

