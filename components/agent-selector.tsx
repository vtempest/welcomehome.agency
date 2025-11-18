'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Agent {
  name: string
  description: string
  category: string
}

export const AI_AGENTS: Agent[] = [
  // Legal AI Agents
  { name: 'AI Contract Review Agent', description: 'Automates legal contract analysis to extract key terms, flag risks, and ensure compliance in minutes.', category: 'Legal' },
  { name: 'AI Regulatory Compliance Agent', description: 'Automatically checks policies and contracts against regulatory standards like GDPR and FINRA to prevent fines.', category: 'Legal' },
  { name: 'Legal Risk Identification Agent', description: 'Proactively identifies legal and financial risks hidden in contracts, reports, and due diligence documents.', category: 'Legal' },
  { name: 'AI Legal Research Agent', description: 'Finds relevant case law, summarizes legal arguments, and synthesizes precedents from legal databases.', category: 'Legal' },
  { name: 'Legal Q&A Agent', description: 'Get instant, cited answers to plain-language questions from your contracts and case files.', category: 'Legal' },
  { name: 'Legal Due Diligence Agent', description: 'Automates M&A legal diligence by analyzing data rooms to find contractual risks and compliance issues.', category: 'Legal' },
  { name: 'Contract Analysis Agent', description: 'Turns contracts into structured data by automatically extracting key dates, terms, and obligations.', category: 'Legal' },
  { name: 'AI Document Comparison & Redlining Agent', description: 'Instantly compares two documents to create a smart redline and summary of all material changes.', category: 'Legal' },
  { name: 'AI Contract Anomaly Detection Agent', description: 'Finds risky, non-standard clauses by comparing contracts against an approved baseline.', category: 'Legal' },
  { name: 'AI Contract Drafting Agent', description: 'Automatically generates first-draft contracts like NDAs and MSAs from your approved templates.', category: 'Legal' },
  { name: 'AI Contract Repository Analysis Agent', description: 'Analyzes entire contract repositories to answer portfolio-wide questions about risk and compliance.', category: 'Legal' },
  { name: 'AI Automated Document Redaction Agent', description: 'Automatically finds and redacts sensitive PII and confidential information from documents.', category: 'Legal' },
  { name: 'AI M&A Summary Document Agent', description: 'Instantly summarizes key commercial terms from definitive M&A agreements for deal teams.', category: 'Legal' },
  { name: 'AI NDA Processing Agent', description: 'Automates the review and redlining of third-party NDAs against your firm\'s legal playbook.', category: 'Legal' },
  { name: 'AI Compliance Reporting Agent', description: 'Automates the creation of compliance reports by gathering data and populating your templates.', category: 'Legal' },
  { name: 'AI Contract Redlining Agent', description: 'Automates contract redlining by inserting your preferred clauses into third-party agreements.', category: 'Legal' },
  { name: 'AI Stock Purchase Agreement Analysis Agent', description: 'Automates the review of Stock Purchase Agreements to extract key terms and flag non-standard clauses.', category: 'Legal' },

  // Finance AI Agents
  { name: 'AI Financial Due Diligence Agent', description: 'Automates data room analysis to extract financials, normalize data, and identify red flags for faster M&A.', category: 'Finance' },
  { name: 'AI Investment Analysis Agent', description: 'Synthesizes analyst reports, earnings calls, and filings to build investment theses and bull/bear cases.', category: 'Finance' },
  { name: 'AI Financial Statement Analysis Agent', description: 'Automates financial spreading by extracting data from statements to calculate key ratios and trends.', category: 'Finance' },
  { name: 'Financial Valuation Agent', description: 'Automates DCF and comps analysis by pulling data, finding comparables, and populating valuation models.', category: 'Finance' },
  { name: 'Investment Document Analysis Agent', description: 'Analyzes prospectuses and PPMs to instantly extract fees, liquidity terms, and key risk factors.', category: 'Finance' },
  { name: 'Portfolio Rebalancing Agent', description: 'Automates portfolio rebalancing by generating a precise trade list based on target models.', category: 'Finance' },
  { name: 'Data Room Analysis Agent', description: 'Instantly indexes, summarizes, and answers questions from any virtual data room for faster diligence.', category: 'Finance' },
  { name: 'AI E-Invoicing Agent', description: 'Automates global e-invoicing compliance by validating formats, extracting data, and managing submissions.', category: 'Finance' },
  { name: 'AI VAT Compliance Agent', description: 'Automates VAT checks on invoices to ensure correct rates, valid numbers, and regulatory compliance.', category: 'Finance' },
  { name: 'AI Tax Authority Correspondence Agent', description: 'Automates the intake and analysis of tax notices to extract deadlines and summarize key issues.', category: 'Finance' },
  { name: 'AI Tax Exposure Analysis Agent', description: 'Automates tax due diligence by analyzing data rooms for risks like PE and transfer pricing issues.', category: 'Finance' },
  { name: 'AI Financial Reconciliation Agent', description: 'Automates financial reconciliation by matching transactions and flagging discrepancies between systems.', category: 'Finance' },
  { name: 'AI 10-K Disclosure Analysis Agent', description: 'Automates the analysis of SEC 10-K filings to find risks and compare year-over-year changes.', category: 'Finance' },
  { name: 'AI Early Payment Discount Identification Agent', description: 'Finds and flags early payment discount opportunities buried in vendor invoices to capture savings.', category: 'Finance' },
  { name: 'AI Discounted Cash Flow (DCF) Modeling Agent', description: 'Automates DCF model creation by populating historical financials from SEC filings into your Excel templates.', category: 'Finance' },
  { name: 'VC Market Sizing Agent', description: 'Automates TAM/SAM/SOM analysis by pulling industry data, analyzing competitors, and projecting growth.', category: 'Finance' },
  { name: 'PE Screening & Deal Flow Agent', description: 'Automates PE deal screening and triage by analyzing CIMs against your investment thesis.', category: 'Finance' },
  { name: 'AI Annual Report Analysis Agent', description: 'Automates analysis of annual reports to extract financials, compare year-over-year changes, and find risks.', category: 'Finance' },
  { name: 'AI Cash Flow Forecasting Agent', description: 'Automates cash flow forecasting by analyzing sales pipelines, AR/AP, and payroll data.', category: 'Finance' },
  { name: 'AI Chart Data Extraction Agent', description: 'Extracts the underlying data from images of charts and graphs in reports and presentations.', category: 'Finance' },
  { name: 'AI Comparable Analysis Agent', description: 'Automates comparable company analysis by finding peer groups and pulling trading multiples.', category: 'Finance' },
  { name: 'AI Contrarian Analysis Agent', description: 'Identifies contrarian investment opportunities by analyzing market sentiment and finding overlooked value.', category: 'Finance' },
  { name: 'AI Credit Note Processing Agent', description: 'Automates the processing and reconciliation of credit notes against original invoices.', category: 'Finance' },
  { name: 'AI Cross-Portfolio Analysis Agent', description: 'Analyzes data across your entire investment portfolio to identify systemic trends, risks, and opportunities.', category: 'Finance' },
  { name: 'AI DCF Model Generation Agent', description: 'Automates the entire creation of DCF models, from data extraction to populating your custom Excel templates.', category: 'Finance' },
  { name: 'AI DDQ Response Generation Agent', description: 'Automates responses to investor Due Diligence Questionnaires (DDQs) using your firm\'s knowledge base.', category: 'Finance' },
  { name: 'AI Deal Flow Synthesis Agent', description: 'Automates the creation of a synthesized deal flow report by analyzing all incoming CIMs and teasers.', category: 'Finance' },
  { name: 'AI Deal Screening and Triage Agent', description: 'Automates deal screening by analyzing CIMs and pitch decks to triage your investment pipeline.', category: 'Finance' },
  { name: 'AI Excel Financial Modeling Agent', description: 'Automates the creation of 3-statement financial models by extracting data and generating linked Excel files.', category: 'Finance' },
  { name: 'AI Excel Template Population Agent', description: 'Automatically populates your custom Excel and spreadsheet templates with data from any source document.', category: 'Finance' },
  { name: 'AI Financial Accuracy Agent', description: 'Ensures financial data accuracy by automatically cross-referencing numbers across multiple documents.', category: 'Finance' },
  { name: 'AI Financial Model Builder Agent', description: 'Automates the creation of complex financial models like LBOs and DCFs in your firm\'s custom templates.', category: 'Finance' },
  { name: 'AI Fund of Funds Manager Selection Agent', description: 'Automates fund manager diligence by extracting and comparing terms from PPMs and DDQs.', category: 'Finance' },
  { name: 'AI Fund of Funds Performance Attribution Agent', description: 'Automates fund-of-funds performance attribution by analyzing underlying manager reports.', category: 'Finance' },
  { name: 'AI Fund of Funds Performance Reporting Agent', description: 'Automates fund-of-funds LP reporting by consolidating data from underlying manager statements.', category: 'Finance' },
  { name: 'AI Fund of Funds Portfolio Optimization Agent', description: 'Automates fund-of-funds portfolio optimization by modeling allocations to meet specific targets.', category: 'Finance' },
  { name: 'AI Hedge Fund Activist Tracking Agent', description: 'Automates the tracking of activist investor campaigns by monitoring 13D filings and summarizing theses.', category: 'Finance' },
  { name: 'AI Hedge Fund Earnings Analysis Agent', description: 'Automates earnings analysis by summarizing press releases and call transcripts to extract KPIs and guidance.', category: 'Finance' },
  { name: 'AI Hedge Fund Event Monitoring Agent', description: 'Automates the monitoring of news and filings for specific investment catalysts, providing real-time alerts.', category: 'Finance' },
  { name: 'AI Hedge Fund Performance Analysis Agent', description: 'Automates hedge fund analysis by decomposing returns, assessing risk, and tracking style consistency.', category: 'Finance' },
  { name: 'AI Hedge Fund Portfolio Risk Agent', description: 'Automates hedge fund risk management by consolidating data to analyze exposures, VaR, and stress tests.', category: 'Finance' },
  { name: 'AI Hedge Fund Research Consolidation Agent', description: 'Turns your fund\'s historical research into a single, searchable knowledge base to leverage past work.', category: 'Finance' },
  { name: 'AI Hedge Fund Stock Screening Agent', description: 'Generates unique investment ideas by screening for complex qualitative criteria in filings and reports.', category: 'Finance' },
  { name: 'AI Hedge Fund Trading Ideas Agent', description: 'Generates actionable trading ideas by monitoring markets and documents for your custom catalysts.', category: 'Finance' },
  { name: 'AI Investment Banking Buyer Identification Agent', description: 'Automatically generates and prioritizes lists of potential strategic and financial buyers for M&A deals.', category: 'Finance' },
  { name: 'AI Investment Banking Client Development Agent', description: 'Automates M&A deal sourcing by monitoring markets for custom client development triggers.', category: 'Finance' },
  { name: 'AI Investment Banking Comparable Company Analysis Agent', description: 'Automates comparable company analysis by populating your pitch book templates with financials and multiples.', category: 'Finance' },
  { name: 'AI Investment Banking Data Room Management Agent', description: 'Automates the tedious setup of M&A data rooms by organizing and redacting client documents.', category: 'Finance' },
  { name: 'AI Investment Banking Marketing Materials Agent', description: 'Automates the drafting of CIMs and M&A teasers by populating your templates with data room information.', category: 'Finance' },
  { name: 'AI Investment Banking Pitch Deck Automation Agent', description: 'Automates the creation of investment banking pitch decks by populating PowerPoint templates with data.', category: 'Finance' },
  { name: 'AI Investment Banking Valuation Analysis Agent', description: 'Automates the entire M&A valuation workflow, from comps and DCF to the final football field chart.', category: 'Finance' },
  { name: 'AI Investment Memo Generation Agent', description: 'Automates the drafting of investment memos by populating your templates with data from the CIM and VDR.', category: 'Finance' },
  { name: 'AI LBO Model Creation Agent', description: 'Automates the creation of complex LBO models by populating your Excel templates with CIM data.', category: 'Finance' },
  { name: 'AI LP Diligence Agent', description: 'Automates due diligence and KYC on potential LPs by researching their background and screening for risks.', category: 'Finance' },
  { name: 'AI LPA Analysis Agent', description: 'Automates the review of Limited Partnership Agreements (LPAs) to extract and compare key terms.', category: 'Finance' },
  { name: 'AI Manager Report Agent', description: 'Automates the review of fund manager reports to extract performance data and summarize commentary.', category: 'Finance' },
  { name: 'AI Paywall Navigation Agent', description: 'Securely logs into paywalled websites and investor portals to automate data gathering.', category: 'Finance' },
  { name: 'AI Portfolio Reporting Agent', description: 'Automates portfolio performance reporting by consolidating data and generating custom reports.', category: 'Finance' },
  { name: 'AI Private Equity Deal Sourcing Agent', description: 'Automates PE deal sourcing by scanning the market for unique, off-market investment opportunities.', category: 'Finance' },
  { name: 'AI Private Equity Due Diligence Agent', description: 'Automates PE due diligence by analyzing data rooms to extract data, flag risks, and draft memos.', category: 'Finance' },
  { name: 'AI Private Equity Portfolio Reporting Agent', description: 'Automates PE portfolio reporting by consolidating performance data from all underlying companies.', category: 'Finance' },
  { name: 'AI Private Equity Risk Monitoring Agent', description: 'Automates PE portfolio risk monitoring by tracking KPIs and covenants for early warning alerts.', category: 'Finance' },
  { name: 'AI Red Flag Detection Agent', description: 'Automates risk discovery by scanning documents for custom-defined red flags and deal-breakers.', category: 'Finance' },
  { name: 'AI Secondary Fund Analysis Agent', description: 'Automates PE secondaries diligence by analyzing data rooms to model fund performance and NAVs.', category: 'Finance' },
  { name: 'AI Semi-Structured Document Agent', description: 'Intelligently extracts data from semi-structured documents with variable layouts, like invoices and reports.', category: 'Finance' },
  { name: 'AI Statement Normalization Agent', description: 'Automatically normalizes financial statements into a single, standardized format for comparison.', category: 'Finance' },
  { name: 'AI Statement Processing Agent', description: 'Automates data extraction from bank, custodial, and fund statements with inconsistent formats.', category: 'Finance' },
  { name: 'AI Statement Reconciliation Agent', description: 'Automates statement reconciliation by intelligently matching transactions and flagging exceptions.', category: 'Finance' },
  { name: 'AI Venture Capital Deal Screening Agent', description: 'Automates initial deal screening and due diligence for venture capital investments to accelerate deal flow.', category: 'Finance' },
  { name: 'AI Venture Capital Investment Memo Agent', description: 'Generates comprehensive investment memos for venture capital decision-making and analysis.', category: 'Finance' },
  { name: 'AI Venture Capital Market Alerts Agent', description: 'Monitors news and data sources to provide real-time alerts on funding rounds, M&A, and market shifts.', category: 'Finance' },
  { name: 'AI Venture Capital Market Research Agent', description: 'Automates market research for VCs by synthesizing reports and data to create market maps and analysis.', category: 'Finance' },
  { name: 'AI Venture Capital Portfolio Management Agent', description: 'Extracts KPIs from portfolio company investor updates to automate performance tracking and reporting.', category: 'Finance' },
  { name: 'AI Venture Capital Relationship Management Agent', description: 'Consolidates your firm\'s entire history of interactions with any contact into a single, actionable briefing.', category: 'Finance' },
  { name: 'AI Venture Capital Technical Assessment Agent', description: 'Analyzes technical whitepapers and patents to summarize innovations and assess technological risks.', category: 'Finance' },
  { name: 'AI Virtual Data Room Agent', description: 'Automates the indexing, analysis, and data extraction from entire virtual data rooms for due diligence.', category: 'Finance' },

  // Insurance AI Agents
  { name: 'Insurance Policy Review Agent', description: 'Instantly analyzes insurance policies to extract coverages, limits, exclusions, and endorsements.', category: 'Insurance' },
  { name: 'Insurance Claims Automation Agent', description: 'Automates claims intake by extracting data from FNOL submissions, forms, and supporting documents.', category: 'Insurance' },
  { name: 'Insurance Risk Assessment Agent', description: 'Analyzes risk engineering reports to identify hazards, extract COPE data, and summarize recommendations.', category: 'Insurance' },
  { name: 'Insurance Coverage Analysis Agent', description: 'Provides instant, cited answers to complex coverage questions by analyzing policies and claim facts.', category: 'Insurance' },
  { name: 'Property Insurance Analysis Agent', description: 'Automates the analysis of Statements of Value (SOVs) for faster, more accurate property underwriting.', category: 'Insurance' },
  { name: 'Policy Application Processing Agent', description: 'Automates data extraction from insurance applications to accelerate quoting and reduce manual entry.', category: 'Insurance' },
  { name: 'AI Claims Triage Agent', description: 'Automatically triages incoming claims by severity and fraud risk, then routes them to the right team.', category: 'Insurance' },

  // Real Estate AI Agents
  { name: 'Commercial Property Valuation Agent', description: 'Automates data extraction from rent rolls and operating statements to accelerate property valuation.', category: 'Real Estate' },
  { name: 'Real Estate Market Analysis Agent', description: 'Automates real estate research by pulling market comps, rent data, and demographic trends.', category: 'Real Estate' },
  { name: 'Real Estate Risk Evaluation Agent', description: 'Finds hidden risks in real estate deals by analyzing environmental reports, title commitments, and surveys.', category: 'Real Estate' },
  { name: 'Commercial Lease Analysis Agent', description: 'Automates commercial lease abstraction to extract key dates, financial terms, and critical clauses.', category: 'Real Estate' },
  { name: 'Property Investment Analysis Agent', description: 'Automates real estate deal screening by extracting data from Offering Memorandums to populate proformas.', category: 'Real Estate' },
  { name: 'AI Deed Analysis Agent', description: 'Extracts legal descriptions and chain of title data from scanned and handwritten property deeds.', category: 'Real Estate' },
  { name: 'AI Lease Abstraction Agent', description: 'Automates commercial lease abstraction to extract key dates, financial terms, and critical clauses.', category: 'Real Estate' },
  { name: 'AI Real Estate Cash Flow Modeling Agent', description: 'Automates the creation of real estate cash flow models by populating Argus or Excel from deal documents.', category: 'Real Estate' },
  { name: 'AI Real Estate Deal Sourcing Agent', description: 'Automates real estate deal sourcing by finding off-market properties that match your investment thesis.', category: 'Real Estate' },
  { name: 'AI Real Estate Investment Committee Memo Agent', description: 'Automates the drafting of real estate investment memos by populating templates with data room insights.', category: 'Real Estate' },
  { name: 'AI Real Estate Investment Risk Assessment Agent', description: 'Automates real estate due diligence by analyzing documents to identify and flag investment risks.', category: 'Real Estate' },
  { name: 'AI Real Estate Lease Abstraction & Analysis Agent', description: 'Automates commercial lease abstraction by extracting 100+ key data points, clauses, and dates.', category: 'Real Estate' },
  { name: 'AI Real Estate Loan Document Analysis Agent', description: 'Automates the analysis of CRE loan documents to extract key terms and track covenants.', category: 'Real Estate' },
  { name: 'AI Real Estate Offering Memorandum Analysis Agent', description: 'Automates the analysis of real estate OMs to extract key financials and property details for faster screening.', category: 'Real Estate' },
  { name: 'AI Real Estate Portfolio Performance Agent', description: 'Automates real estate portfolio reporting by consolidating property-level performance data.', category: 'Real Estate' },

  // Business AI Agents
  { name: 'Business Task Management Agent', description: 'Extracts action items, owners, and due dates from meeting notes, emails, and call transcripts.', category: 'Business' },
  { name: 'Business Meeting Analysis Agent', description: 'Analyzes call transcripts to extract competitor mentions, customer sentiment, and product feedback.', category: 'Business' },
  { name: 'Business Performance Analysis Agent', description: 'Analyzes performance data and reports to automatically generate KPI summaries and trend insights.', category: 'Business' },
  { name: 'AI Business Intelligence & Analytics', description: 'Get instant, data-backed answers to complex business questions by asking in plain language.', category: 'Business' },
  { name: 'Project Management & Monitoring Agent', description: 'Automates project status reporting by synthesizing updates from Slack, Jira, and emails to flag risks.', category: 'Business' },
  { name: 'Market Competition Analysis Agent', description: 'Automates competitive intelligence by tracking competitor websites, products, and financials.', category: 'Business' },
  { name: 'AI Customer Feedback Analysis Agent', description: 'Analyzes customer feedback from surveys and tickets to identify sentiment, themes, and feature requests.', category: 'Business' },
  { name: 'AI Market Intelligence & Research Agent', description: 'Automates market research by synthesizing trends from industry reports, news, and competitor data.', category: 'Business' },
  { name: 'AI RFP Response Generation Agent', description: 'Automatically drafts responses to RFPs and security questionnaires using your internal knowledge.', category: 'Business' },
  { name: 'AI Bulk Processing Agent', description: 'Automates the processing of millions of documents for large-scale data extraction and migration projects.', category: 'Business' },
  { name: 'AI Data Lake Integration Agent', description: 'Automates the extraction of data from unstructured documents for ingestion into data lakes.', category: 'Business' },
  { name: 'AI Document Citation Agent', description: 'Ensures all AI-generated data is trustworthy by providing visual citations back to the source document.', category: 'Business' },
  { name: 'AI Document Data Entry Automation Agent', description: 'Eliminates manual data entry by extracting information from any document to populate your systems.', category: 'Business' },
  { name: 'AI Document Indexing Agent', description: 'Automatically reads, categorizes, and indexes document repositories to create a searchable Knowledge Hub.', category: 'Business' },
  { name: 'AI Encrypted Document Handler Agent', description: 'Securely handles password-protected and encrypted documents to enable end-to-end automation.', category: 'Business' },
  { name: 'AI Excel Chart Creation Agent', description: 'Automates the creation of presentation-ready charts in Excel from raw spreadsheet data.', category: 'Business' },
  { name: 'AI Excel Data Validation Agent', description: 'Automatically validates and cleans spreadsheet data by finding duplicates, errors, and outliers.', category: 'Business' },
  { name: 'AI Excel Macro Automation Agent', description: 'Generates VBA code and macros for Excel from plain English descriptions of repetitive tasks.', category: 'Business' },
  { name: 'AI Excel Pivot Table Agent', description: 'Automates the creation of perfect pivot tables from raw data tables in Excel and Google Sheets.', category: 'Business' },
  { name: 'AI Excel Report Generation Agent', description: 'Automates the end-to-end creation of recurring business reports in Excel and Google Sheets.', category: 'Business' },
  { name: 'AI Google Sheets Collaboration Agent', description: 'Automates data population, formatting, and analysis within your collaborative Google Sheets.', category: 'Business' },
  { name: 'AI Multi-Document Correlation Agent', description: 'Finds hidden patterns and contradictions by correlating information across thousands of documents at once.', category: 'Business' },
  { name: 'AI Outlier Detection Agent', description: 'Automatically finds critical outliers, anomalies, and exceptions in large datasets and document sets.', category: 'Business' },
  { name: 'AI RFI Response Generation Agent', description: 'Automates responses to Requests for Information (RFIs) using your centralized knowledge base.', category: 'Business' },
  { name: 'AI Risk Report Analysis Agent', description: 'Automates the analysis and consolidation of internal risk, audit, and compliance reports.', category: 'Business' },
  { name: 'AI Scheduled Automation Agent', description: 'Enables any workflow to be run automatically on a recurring schedule.', category: 'Business' },
  { name: 'AI Spreadsheet Analysis Agent', description: 'Lets you ask questions of your spreadsheets in plain English to get instant summaries and insights.', category: 'Business' },
  { name: 'AI Spreadsheet Template Engine', description: 'Automates the population of custom Excel and PowerPoint templates with data from any source.', category: 'Business' },
  { name: 'AI Two-Factor Authentication Agent', description: 'Manages and automates two-factor authentication processes across enterprise systems for enhanced security.', category: 'Business' },
  { name: 'AI Vendor Matching & Selection Agent', description: 'Matches business requirements with optimal vendors and automates vendor selection processes.', category: 'Business' },
  { name: 'AI Visual Data Recognition Agent', description: 'Extracts structured data from charts, graphs, and other visual elements within documents.', category: 'Business' },
  { name: 'AI Visual Grounding Agent', description: 'Provides visual, clickable citations (AI Citations) for any AI-extracted data, linking it to the source document.', category: 'Business' },
  { name: 'AI Website Data Extraction Agent', description: 'Uses AI to intelligently extract structured data from any website, even with changing layouts.', category: 'Business' },

  // Logistics AI Agents
  { name: 'Logistics Shipment Monitoring Agent', description: 'Automatically tracks shipments across multiple carrier portals to consolidate status updates and flag delays.', category: 'Logistics' },
  { name: 'Logistics Cost Optimization Agent', description: 'Automates freight invoice audits to find overcharges and reduce logistics costs.', category: 'Logistics' },
  { name: 'Document Validation Agent', description: 'Checks document packets for completeness and data consistency to prevent costly errors and delays.', category: 'Logistics' },
  { name: 'Logistics Route Planning Agent', description: 'Automates delivery route planning to reduce fuel costs and improve on-time performance.', category: 'Logistics' },
  { name: 'AI Freight Invoice Matching Agent (3-Way Match)', description: 'Automates the 3-way match for freight invoices, BOLs, and PODs to eliminate overpayments.', category: 'Logistics' },
  { name: 'AI Supply Chain Risk & Resiliency Agent', description: 'Proactively monitors suppliers and global events to identify and flag potential supply chain disruptions.', category: 'Logistics' },

  // Tax AI Agents
  { name: 'AI Tax & Cost Center Management Agent', description: 'Automates tax cost center allocation and management across business units for accurate tax reporting.', category: 'Tax' },
  { name: 'AI Tax Package Preparation Agent', description: 'Automates the preparation and compilation of comprehensive tax packages for audits and filings.', category: 'Tax' },
]

const CATEGORIES = Array.from(new Set(AI_AGENTS.map(agent => agent.category))).sort()

interface AgentSelectorProps {
  selectedAgent: Agent | null
  onSelectAgent: (agent: Agent) => void
}

export function AgentSelector({ selectedAgent, onSelectAgent }: AgentSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = useMemo(() => {
    if (!searchQuery) return AI_AGENTS
    
    const query = searchQuery.toLowerCase()
    return AI_AGENTS.filter(agent => 
      agent.name.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query) ||
      agent.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const groupedAgents = useMemo(() => {
    const groups: Record<string, Agent[]> = {}
    CATEGORIES.forEach(category => {
      groups[category] = filteredAgents.filter(agent => agent.category === category)
    })
    return groups
  }, [filteredAgents])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedAgent ? (
            <div className="flex flex-col items-start text-left">
              <span className="font-medium">{selectedAgent.name}</span>
              <span className="text-xs text-muted-foreground">{selectedAgent.category}</span>
            </div>
          ) : (
            <span>Select an AI agent...</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search agents..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No agents found.</CommandEmpty>
            <ScrollArea className="h-[400px]">
              {CATEGORIES.map(category => {
                const agents = groupedAgents[category]
                if (agents.length === 0) return null
                
                return (
                  <CommandGroup key={category} heading={`${category} (${agents.length})`}>
                    {agents.map(agent => (
                      <CommandItem
                        key={agent.name}
                        value={agent.name}
                        onSelect={() => {
                          onSelectAgent(agent)
                          setOpen(false)
                        }}
                        className="flex flex-col items-start py-3"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Check
                            className={cn(
                              "h-4 w-4",
                              selectedAgent?.name === agent.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {agent.description}
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
