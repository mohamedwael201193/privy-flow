import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MarketingLayout from '@/layouts/MarketingLayout';
import {
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Brain,
  Vault,
  Zap,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Private, AI-routed{' '}
                  <span className="gradient-text">stablecoin rails</span> on Polygon.
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Send global payments with USDC, protect your identity with zero-knowledge proofs, and tap into Katana-grade liquidity – all from one non-custodial dashboard.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link to="/app">
                    Launch App
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">View Docs</a>
                </Button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative">
              <div className="glass-card p-8 rounded-2xl border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Payment Flow</p>
                        <p className="text-sm text-muted-foreground">AI-optimized routing</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span className="text-sm">Privacy: ZK Verification</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <Brain className="w-5 h-5 text-secondary" />
                      <span className="text-sm">AI Route Engine</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <Vault className="w-5 h-5 text-primary" />
                      <span className="text-sm">Deep Liquidity Pool</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                    <p className="text-sm font-medium mb-1">Transaction Complete</p>
                    <p className="text-2xl font-bold">100 USDC → 99.8 USDC</p>
                    <p className="text-xs text-muted-foreground mt-1">Saved 72% vs bank wire</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="features" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Who it's for
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for everyone who needs better payment rails
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'People & Families',
                  description: 'Send money across borders in minutes using stablecoins on Polygon. No banks, no surprise fees.',
                },
                {
                  icon: Briefcase,
                  title: 'Builders & Wallets',
                  description: 'Drop-in rails for Polygon payments and identity. Let users pay with usernames, not hex strings.',
                },
                {
                  icon: TrendingUp,
                  title: 'Liquidity Providers',
                  description: 'Fund corridor vaults and earn real fees from productive capital, not mercenary emissions.',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full glass-card hover:glow-primary transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                How PrivyFlow works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Connect & Verify (Privately)',
                  description: 'Connect your wallet, optionally verify "I\'m human", "I\'m over 18", or "not from a restricted region" using self-sovereign ZK credentials. No raw data shared.',
                },
                {
                  step: '02',
                  title: 'Send or Fund a Vault',
                  description: 'Send USDC with a username, payment link, or wallet address – or deposit into corridor vaults that back real payments.',
                },
                {
                  step: '03',
                  title: 'AI Routes, You Save',
                  description: 'Our AI route engine picks the best path across Polygon DeFi and Katana-grade liquidity to minimize fees and slippage.',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <div className="text-6xl font-display font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Pillars */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Product pillars
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Self-Sovereign Identity',
                  description: 'ZK credentials via Privado ID / Billions-style infra – compliance without surveillance.',
                },
                {
                  icon: Brain,
                  title: 'AI-Routed Execution',
                  description: 'Route selection based on live liquidity, gas, and FX data.',
                },
                {
                  icon: Vault,
                  title: 'Productive TVL Vaults',
                  description: 'Corridor vaults that deploy capital into real DeFi yield, inspired by Katana\'s productive TVL.',
                },
                {
                  icon: Globe,
                  title: 'Polygon-Native Infra',
                  description: 'Built for Polygon, with hooks into AggLayer and Katana as the ecosystem\'s liquidity engine.',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full glass-card hover:border-primary/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Strip */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <p className="text-lg text-muted-foreground">
              Built for the <span className="text-foreground font-semibold">Polygon × AggLayer</span> era
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="font-display text-2xl font-bold">Polygon</div>
              <div className="font-display text-2xl font-bold">Katana</div>
              <div className="font-display text-2xl font-bold">Privado ID</div>
              <div className="font-display text-2xl font-bold">AggLayer</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="glass-card p-12 rounded-2xl text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                From demo to real rails.
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the next wave of builders shipping real payments, not just dashboards.
              </p>
              <Button size="lg" asChild className="group">
                <Link to="/app">
                  Launch App
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  );
}
