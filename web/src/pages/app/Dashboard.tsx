import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_ACTIVITIES } from '@/lib/constants';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Vault,
  DollarSign,
  Percent,
  ArrowDownLeft,
  Wallet,
  ShieldCheck
} from 'lucide-react';
import { useAnalyticsSummary } from '@/hooks/useAnalyticsSummary';

import { useAccount } from 'wagmi';

export default function Dashboard() {
  const { address } = useAccount();
  const { data: stats, isLoading } = useAnalyticsSummary(address);

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Your PrivyFlow payment activity at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 space-y-2 bg-card/50 backdrop-blur border-primary/10">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-primary/20 rounded-lg">
              <span className="text-primary font-bold">$</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Sent</p>
            <h3 className="text-2xl font-bold">${stats?.totalSent?.toLocaleString() || "0.00"}</h3>
            <p className="text-xs text-green-500">+12.5% vs last month</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2 bg-card/50 backdrop-blur border-primary/10">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <span className="text-blue-500 font-bold">%</span>
            </div>
            <ArrowDownLeft className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Avg. Fee Saved vs Bank</p>
            <h3 className="text-2xl font-bold">{stats?.avgFeeSaved || 0}%</h3>
            <p className="text-xs text-muted-foreground">Across all corridors</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2 bg-card/50 backdrop-blur border-primary/10">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Wallet className="h-4 w-4 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Vault Deposits</p>
            <h3 className="text-2xl font-bold">${stats?.activeVaultDeposits?.toLocaleString() || "0"}</h3>
            <p className="text-xs text-muted-foreground">Earning 4.3% APY</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2 bg-card/50 backdrop-blur border-primary/10">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-400/20 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Verified Users Badge</p>
            <h3 className="text-xl font-bold">Human Verified</h3>
            <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
              Active
            </span>
          </div>
        </Card>
      </div>


      {/* Recent Activity */}
      <Card className="glass-card">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-xl font-display font-bold">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Counterparty</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentActivity?.length > 0 ? (
                stats.recentActivity.map((activity: any) => (
                  <tr key={activity.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {activity.type === 'send' || activity.type === 'deposit' ? (
                          <ArrowUpRight className="w-4 h-4 text-destructive" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-secondary" />
                        )}
                        <span className="text-sm capitalize">{activity.type}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{activity.counterparty}</td>
                    <td className="p-4 text-sm font-medium">{activity.amount}</td>
                    <td className="p-4">
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{activity.timestamp}</td>
                  </tr>
                ))) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No recent activity found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Routes Insight */}
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-display font-bold mb-4">Payment Routes Insight</h2>
        <p className="text-sm text-muted-foreground mb-6">
          AI-chosen vs manual routes saved gas over last 7 days
        </p>
        <div className="h-64 flex items-end justify-around gap-4">
          {[65, 82, 78, 88, 75, 92, 85].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: `${value}%` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-secondary opacity-80" />
              </div>
              <span className="text-xs text-muted-foreground">Day {index + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <span>AI Score</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
