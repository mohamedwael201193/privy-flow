import { PaymentActivity, Vault, FAQ } from '@/types';

export const MOCK_ACTIVITIES: PaymentActivity[] = [
  {
    id: '1',
    type: 'sent',
    counterparty: '@maria_santos',
    amount: '250.00 USDC',
    status: 'completed',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'received',
    counterparty: '0x742d...89f3',
    amount: '1,200.00 USDC',
    status: 'completed',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'vault_deposit',
    counterparty: 'Global USDC Vault',
    amount: '5,000.00 USDC',
    status: 'completed',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'sent',
    counterparty: '@dev_team',
    amount: '450.50 USDC',
    status: 'pending',
    timestamp: '2 days ago',
  },
];

export const VAULTS: Vault[] = [
  {
    id: '1',
    name: 'Global USDC Vault',
    apy: 4.3,
    tvl: '$2,400,000',
    utilization: 68,
    description: 'Multi-corridor vault supporting payments worldwide',
    badge: 'Productive TVL',
  },
  {
    id: '2',
    name: 'LatAm Remittance Vault',
    apy: 5.1,
    tvl: '$820,000',
    utilization: 72,
    description: 'Optimized for Latin America payment corridors',
    badge: 'High Demand',
  },
  {
    id: '3',
    name: 'Asia Corridor Vault',
    apy: 4.8,
    tvl: '$1,100,000',
    utilization: 64,
    description: 'Supporting APAC remittance flows',
    badge: 'Katana-grade yield',
  },
  {
    id: '4',
    name: 'Africa Gateway Vault',
    apy: 5.5,
    tvl: '$450,000',
    utilization: 58,
    description: 'Emerging corridor with high growth potential',
    badge: 'New Corridor',
  },
];

export const FAQS: FAQ[] = [
  {
    question: 'Is PrivyFlow custodial?',
    answer: 'No. PrivyFlow is completely non-custodial. You maintain full control of your funds at all times. Your private keys never leave your wallet, and all transactions require your explicit approval.',
  },
  {
    question: 'Which networks are supported?',
    answer: 'PrivyFlow currently operates on Polygon, with future support for AggLayer and other Polygon ecosystem chains planned. All transactions use USDC as the primary stablecoin.',
  },
  {
    question: 'How does identity verification work?',
    answer: 'We use self-sovereign identity through zero-knowledge proofs (Privado ID / Billions-style infra). You prove facts like "I\'m over 18" or "I\'m human" without sharing raw documents. Your credentials stay in your own wallet.',
  },
  {
    question: 'What fees do I pay?',
    answer: 'You pay only the network gas fees and DEX/aggregator fees for routing. PrivyFlow\'s AI optimization helps minimize these costs. There are no hidden platform fees for basic payments. Vault deposits may have small performance fees.',
  },
  {
    question: 'How does AI routing save me money?',
    answer: 'Our AI engine analyzes live liquidity depth, gas prices, and DEX spreads across Polygon DeFi to find the most cost-efficient path for your transaction. This often saves 30-70% compared to manual routing.',
  },
  {
    question: 'What are Corridor Vaults?',
    answer: 'Corridor Vaults are liquidity pools that back specific payment routes (e.g., US→LatAm). By depositing stablecoins, you earn real fees from actual payment flows, not artificial emissions. This is "productive TVL" inspired by Katana.',
  },
];

// Contract Addresses (Polygon Mainnet)
export const CONTRACT_ADDRESSES = {
  // Existing contracts
  ROUTER: '0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d' as `0x${string}`,
  IDENTITY_GATE: '0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1' as `0x${string}`,
  USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as `0x${string}`,

  // Wave 4 contracts
  PAYMENT_AGENT: '0xBD2267Bd7d92A4100B4cB457ACDD5D3E9178c1E4' as `0x${string}`,
  TIERED_LIMITS: '0x3c42696908B7A805365478f780899Cbd70D7804D' as `0x${string}`,
};
