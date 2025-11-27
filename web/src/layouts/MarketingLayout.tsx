import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PrivyFlow" className="w-8 h-8 rounded-lg" />
            <span className="font-display text-xl font-bold">PrivyFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="https://github.com/mohamedwael201193/privyFlow" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app">Launch App</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="PrivyFlow" className="w-8 h-8 rounded-lg" />
                <span className="font-display text-xl font-bold">PrivyFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Private, AI-routed stablecoin rails on Polygon.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/app" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/app/send" className="hover:text-foreground transition-colors">Send Payments</Link></li>
                <li><Link to="/app/vaults" className="hover:text-foreground transition-colors">Vaults</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 PrivyFlow. Built for the Polygon × AggLayer era.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
