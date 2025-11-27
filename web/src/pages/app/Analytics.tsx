import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, Globe, DollarSign, Users, MapPin, Clock, Briefcase } from 'lucide-react';

import { useAccount } from 'wagmi';
import { useAnalyticsSummary } from '@/hooks/useAnalyticsSummary';

export default function Analytics() {
  const { address } = useAccount();
  const { data: stats, isLoading } = useAnalyticsSummary(address);

  if (isLoading) return <div className="p-8">Loading analytics...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Your Impact on Real Users</h1>
        <p className="text-muted-foreground">See how your usage contributes to the PrivyFlow ecosystem</p>
      </div>

      {/* Payment Impact */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Payment Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Remittance Volume</p>
            <p className="text-3xl font-bold">${stats?.analytics?.totalVolume?.toLocaleString() || "0"}</p>
            <p className="text-xs text-muted-foreground mt-2">Lifetime sent via PrivyFlow</p>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Average Savings vs Bank</p>
            <p className="text-3xl font-bold text-secondary">{stats?.analytics?.savings || 0}%</p>
            <p className="text-xs text-muted-foreground mt-2">Across all your payments</p>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Countries Reached</p>
            <p className="text-3xl font-bold">{stats?.analytics?.uniqueRecipients || 0}</p>
            <p className="text-xs text-muted-foreground mt-2">Unique recipient addresses</p>
          </Card>
        </div>
      </div>

      {/* Network Metrics */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Network Level Metrics</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-card">
            <h3 className="font-display font-bold mb-4">Daily Active Senders</h3>
            <div className="h-64 flex items-end justify-around gap-2">
              {[45, 52, 48, 62, 58, 71, 68, 75, 82, 78, 88, 92].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: `${value}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-secondary opacity-80" />
                  </div>
                  {index % 3 === 0 && (
                    <span className="text-xs text-muted-foreground">W{Math.floor(index / 3) + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Last 12 weeks of active sender growth
            </p>
          </Card>

          <Card className="p-6 glass-card">
            <h3 className="font-display font-bold mb-4">Vault Utilization Over Time</h3>
            <div className="h-64 flex items-end justify-around gap-2">
              {[55, 58, 62, 59, 64, 68, 65, 70, 72, 68, 71, 75].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: `${value}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-primary opacity-80" />
                  </div>
                  {index % 3 === 0 && (
                    <span className="text-xs text-muted-foreground">W{Math.floor(index / 3) + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Average vault utilization across all corridors
            </p>
          </Card>
        </div>
      </div>

      {/* Story Snippets */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Real Impact Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              story: 'Ali sends $200/month home with 70% lower fees',
              description: 'Supporting family across borders without losing money to intermediaries',
            },
            {
              icon: Briefcase,
              story: 'A small dev shop pays 5 contractors across 3 countries in one batch',
              description: 'Streamlined payroll with instant settlement and minimal overhead',
            },
            {
              icon: Globe,
              story: 'Maria receives remittances in minutes instead of days',
              description: 'No more waiting for bank transfers to clear across borders',
            },
            {
              icon: TrendingUp,
              story: 'Jorge earns 4.3% APY on idle stablecoins',
              description: 'Productive capital deployed into real payment flows',
            },
            {
              icon: Clock,
              story: 'Lisa saves 2 hours per week on payment processing',
              description: 'Automated routing and instant confirmations eliminate manual work',
            },
            {
              icon: MapPin,
              story: 'Builders in 50+ countries access better payment rails',
              description: 'Financial infrastructure that doesn\'t discriminate by geography',
            },
          ].map((item, index) => (
            <Card key={index} className="p-6 glass-card hover:glow-primary transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold mb-2">{item.story}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Ecosystem Contribution */}
      <Card className="p-8 glass-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-display font-bold">Your Ecosystem Contribution</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-primary">$12.3K</p>
              <p className="text-sm text-muted-foreground">Volume Enabled</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">24</p>
              <p className="text-sm text-muted-foreground">Payments Sent</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$54K</p>
              <p className="text-sm text-muted-foreground">Vault TVL</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">12</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            You're part of a movement building better financial rails for everyone. Thank you for being an early adopter.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
