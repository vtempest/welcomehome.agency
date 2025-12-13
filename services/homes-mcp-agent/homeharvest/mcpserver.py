"""
👋 Welcome to your Smithery project!
To run your server, use "uv run dev"
To test interactively, use "uv run playground"

You might find this resources useful:

🧑‍💻 MCP's Python SDK (helps you define your server)
https://github.com/modelcontextprotocol/python-sdk
"""

from mcp.server.fastmcp import Context, FastMCP
from pydantic import BaseModel, Field
from typing import Optional, List, Annotated
from datetime import datetime
import json

from smithery.decorators import smithery
from homeharvest import scrape_property, ListingType, SearchPropertyType


class ConfigSchema(BaseModel):
    proxy_url: str = Field(False, description="Proxy URL for requests (if needed)")


@smithery.server()
def create_server():
    """Create and configure the MCP server."""

    # Create your FastMCP server as usual
    server = FastMCP("HomeHarvest MCP Server")

    @server.tool()
    def scrape_properties(
        location: Annotated[str, Field(description="Location to search (ZIP code, city, address, neighborhood, county, etc.)")],
        listing_type: Annotated[ListingType, Field(description="Type of listing: FOR_SALE, FOR_RENT, SOLD, or PENDING")],
        property_type: Annotated[Optional[List[SearchPropertyType]], Field(
            default=None,
            description="Filter by property types: single_family, multi_family, condos, condo_townhome_rowhome_coop, condo_townhome, townhomes, duplex_triplex, farm, land, mobile"
        )] = None,
        past_days: Annotated[Optional[int], Field(
            default=None, 
            description="Filter properties listed/sold within the last N days"
        )] = None,
        radius: Annotated[Optional[float], Field(
            default=None,
            description="Search radius in miles around the specified location"
        )] = None,
        limit: Annotated[Optional[int], Field(
            default=5,
            description="Maximum number of properties to return (max 10,000, default 5)"
        )] = 5,
        date_from: Annotated[Optional[str], Field(
            default=None,
            description="Start date for listing search in YYYY-MM-DD format"
        )] = None,
        date_to: Annotated[Optional[str], Field(
            default=None,
            description="End date for listing search in YYYY-MM-DD format"
        )] = None,
        mls_only: Annotated[Optional[bool], Field(
            default=False,
            description="Fetch only MLS listings (excludes non-MLS sources)"
        )] = False,
        foreclosure: Annotated[Optional[bool], Field(
            default=False,
            description="Fetch only foreclosure properties"
        )] = False,
        extra_property_data: Annotated[Optional[bool], Field(
            default=False,
            description="Fetch additional property details (may increase request time)"
        )] = False,
        exclude_pending: Annotated[Optional[bool], Field(
            default=False,
            description="Exclude pending properties from for_sale results"
        )] = False,
        ctx: Context = None
    ) -> str:
        """Scrape real estate properties using HomeHarvest.
        
        This tool provides comprehensive real estate data scraping with flexible
        filtering options for location, property type, date ranges, and more.
        """

        session_config = ctx.session_config

        try:
            # Validate date formats if provided
            if date_from:
                try:
                    datetime.strptime(date_from, '%Y-%m-%d')
                except ValueError:
                    return "Error: date_from must be in YYYY-MM-DD format.\n\nFix the errors and try again."
            
            if date_to:
                try:
                    datetime.strptime(date_to, '%Y-%m-%d')
                except ValueError:
                    return "Error: date_to must be in YYYY-MM-DD format.\n\nFix the errors and try again."

            # Scrape properties using homeharvest
            properties_data = scrape_property(
                location=location,
                listing_type=listing_type.value,
                property_type=[property_type_value.value for property_type_value in property_type] if property_type else None,
                past_days=past_days,
                radius=radius,
                limit=limit,
                date_from=date_from,
                date_to=date_to,
                mls_only=mls_only,
                foreclosure=foreclosure,
                extra_property_data=extra_property_data,
                exclude_pending=exclude_pending,
                proxy=session_config.proxy_url if hasattr(session_config, 'proxy_url') else None,
                return_type="raw"
            )
            
            # Handle empty results
            if not properties_data:
                return "No properties found matching the specified criteria."
            
            return json.dumps(properties_data, default=str)
            
        except Exception as e:
            return f"Unexpected error retrieving properties:\n\n{str(e)}\n\nFix the errors (if possible) and try again."

    return server
