import Image from "next/image"

export function Footer() {
  const footerLinks = {
    Product: ["Features", "AI Agents", "Pricing", "Integrations", "API"],
    Resources: ["Documentation", "Blog", "Case Studies", "Help Center", "Community"],
    Company: ["About", "Careers", "Contact", "Partners", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Compliance", "Data Protection"],
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 relative">
                <Image src="/images/wh-logo.png" alt="Welcome Home Agency" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">Welcome Home Agency</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered real estate intelligence platform helping agents automate operations and close more deals.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm text-foreground mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Welcome Home Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/survey" className="text-sm text-primary hover:underline font-medium transition-colors">
              Realtor Survey
            </a>
            <a href="/demo" className="text-sm text-primary hover:underline font-medium transition-colors">
              View Demo
            </a>
            <a href="/api-docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Docs
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
