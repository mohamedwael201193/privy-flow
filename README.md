<div align="center">

# PrivyFlow

### Private, AI-Routed Stablecoin Rails on Polygon

[![Polygon](https://img.shields.io/badge/Network-Polygon-7B3FE4?style=flat-square&logo=polygon)](https://polygon.technology)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.x-363636?style=flat-square&logo=solidity)](https://soliditylang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Send USDC globally with AI-optimized routing, zero-knowledge identity, and productive liquidity vaults — all non-custodial on Polygon.

[Launch App](#getting-started) · [Smart Contracts](#smart-contracts) · [Architecture](#architecture) · [Contributing](#contributing)

</div>

---

## Overview

PrivyFlow is a **Polygon-native payment infrastructure** that combines:

- **Stablecoin Payments** — Send USDC using usernames or wallet addresses with instant settlement
- **Zero-Knowledge Identity** — Verify humanness and age via Privado ID without sharing documents
- **AI Route Engine** — Automatically selects the cheapest or fastest on-chain path for every transaction
- **Corridor Vaults** — Deposit USDC into regional liquidity pools that earn real yield from payment flow fees

---

## Features

| Feature | Description | Status |
|:--------|:------------|:------:|
| USDC Payments | Send/receive Native USDC on Polygon via username or address | Live |
| AI Routing | Cheapest vs Fastest route optimization with dynamic gas pricing | Live |
| ZK Identity | Human verification via Privado ID Liveness Credentials | Live |
| Corridor Vaults | Deposit into Global/LatAm vaults, track balances and yield | Live |
| LATAM Corridors | Real-time FX quotes for Mexico, Brazil, Argentina | Live |
| Analytics Dashboard | Track volume, savings, vault deposits, and payment history | Live |
| AI Payment Agents | x402 protocol-powered autonomous payment agents | Live |
| Wallet Support | MetaMask, Rabby, WalletConnect via Wagmi/Viem | Live |

### Roadmap

- Katana integration for deep liquidity and VaultBridge yield
- Multi-chain transfers via AggLayer
- Fiat on/off ramps
- Developer SDK for third-party Polygon dApps

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)               │
│  Dashboard · Send · Corridors · Vaults · Identity · Agents   │
├──────────────────────────────────────────────────────────────┤
│                     Backend API (Express + Prisma)            │
│  /payments · /vaults · /analytics · /corridors · /identity   │
├──────────────────────────────────────────────────────────────┤
│                    Smart Contracts (Polygon PoS)              │
│  Router · IdentityGate · PaymentAgent · TieredLimits · Vault │
├──────────────────────────────────────────────────────────────┤
│                      External Services                       │
│     OpenAI (routing) · Privado ID (ZK) · 1inch (DEX)        │
└──────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI |
| Backend | Node.js, Express, Prisma ORM, SQLite (dev) / PostgreSQL (prod) |
| Blockchain | Polygon PoS, Wagmi v2, Viem, Hardhat |
| AI | OpenAI API for route optimization and fee prediction |
| Identity | Privado ID — zero-knowledge proof verification |
| DEX | 1inch Swap API, Uniswap |

---

## Smart Contracts

Deployed on **Polygon Mainnet**:

| Contract | Address | Purpose |
|:---------|:--------|:--------|
| PrivyFlowRouter | [`0x2e9aF66...D00d`](https://polygonscan.com/address/0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d) | USDC payment routing with DEX aggregator integration |
| PrivyFlowIdentityGate | [`0xde2cf7c...6Fa1`](https://polygonscan.com/address/0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1) | Privado ID credential verification gate |
| PrivyFlowPaymentAgent | [`0xBD2267B...c1E4`](https://polygonscan.com/address/0xBD2267Bd7d92A4100B4cB457ACDD5D3E9178c1E4) | x402 autonomous payment agent |
| PrivyFlowTieredLimits | [`0x3c4269...804D`](https://polygonscan.com/address/0x3c42696908B7A805365478f780899Cbd70D7804D) | Identity-tiered transaction limits |
| USDC (Native) | [`0x3c499c...3359`](https://polygonscan.com/address/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359) | Official Native USDC on Polygon |

---

## Project Structure

```
privy-flow/
├── web/                    # Frontend application
│   ├── src/
│   │   ├── pages/          # Dashboard, Send, Corridors, Vaults, Identity, Analytics, Agents
│   │   ├── components/     # Reusable UI components (Shadcn)
│   │   ├── hooks/          # React Query hooks (useVaults, useAnalyticsSummary, etc.)
│   │   ├── layouts/        # DashboardLayout, MarketingLayout
│   │   ├── lib/            # API client, wallet config, contract ABIs, utilities
│   │   └── types/          # TypeScript interfaces
│   └── public/             # Static assets
│
├── backend/                # API server
│   ├── src/
│   │   ├── routes/         # payments, vaults, analytics, corridors, identity, agents
│   │   ├── services/       # AI router, integrations
│   │   └── config/         # Environment configuration
│   └── prisma/             # Database schema and migrations
│
├── contracts/              # Solidity smart contracts
│   ├── src/                # Router, IdentityGate, Vault, PaymentAgent, TieredLimits
│   ├── deploy/             # Hardhat deployment scripts
│   └── test/               # Contract test suite
│
├── shared/                 # Shared TypeScript types across packages
└── scripts/                # Utility scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **pnpm** — `npm install -g pnpm`
- **Wallet** — MetaMask or Rabby
- **RPC** — Polygon Mainnet endpoint (Alchemy or Infura)

### 1. Clone & Install

```bash
git clone https://github.com/mohamedwael201193/privy-flow.git
cd privy-flow
pnpm install
```

### 2. Configure Environment

**`web/.env`**
```env
VITE_PUBLIC_BACKEND_URL=http://localhost:3001
VITE_PUBLIC_ROUTER_ADDRESS=0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d
VITE_PUBLIC_IDENTITY_GATE_ADDRESS=0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1
VITE_PUBLIC_USDC_CONTRACT_ADDRESS=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
VITE_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
VITE_PUBLIC_POLYGON_CHAIN_ID=137
```

**`backend/.env`**
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_openai_key
FX_API_KEY=your_fx_api_key
```

**`contracts/.env`**
```env
PRIVATE_KEY=your_deployer_private_key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### 3. Run

```bash
# Terminal 1 — Backend
cd backend
npx prisma migrate dev
pnpm dev

# Terminal 2 — Frontend
cd web
pnpm dev
```

Open **http://localhost:5173** in your browser.

---

## Integrations

| Service | Role | Status |
|:--------|:-----|:------:|
| [Privado ID](https://privado.id) | ZK identity — Liveness & age credentials | Active |
| [OpenAI](https://openai.com) | AI route optimization & fee prediction | Active |
| [1inch](https://1inch.io) | DEX aggregation for best swap execution | Active |
| [Free Currency API](https://freecurrencyapi.com) | Real-time fiat exchange rates | Active |
| [Katana](https://katana.network) | Deep liquidity & VaultBridge | Planned |
| [AggLayer](https://polygon.technology/agglayer) | Cross-chain USDC flows | Planned |

---

## Why PrivyFlow?

**For Users** — Lower fees, instant settlement, privacy-preserving identity, and yield on idle stablecoins.

**For Developers** — Non-custodial, open-source payment and identity infrastructure. Drop into any Polygon dApp.

**For LPs** — Productive TVL. Your capital backs real payment flows and earns sustainable fees, not inflationary emissions.

---

## Polygon Ecosystem Alignment

| Initiative | Alignment |
|:-----------|:----------|
| **Billions / Nxtlvl** | Self-sovereign identity via Privado ID; human-AI payment agent networks |
| **Katana / ChillerWhale** | Productive TVL vaults; real metrics (volume, savings, yield) over vanity TVL |
| **AggLayer** | Cross-chain USDC vision; Polygon-native infrastructure |
| **Buildathon Tracks** | AI routing (AI track), corridor vaults (DeFi track), SDK infra (Infra track) |

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "Add your feature"`
4. Push — `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for the Polygon × AggLayer era.**

[Polygon](https://polygon.technology) · [Privado ID](https://privado.id) · [Katana](https://katana.network) · [1inch](https://1inch.io)

</div>
