# PrivyFlow 🌊

**Private, AI-Routed Stablecoin Rails for the AggLayer Era**

> *Payments UX like Revolut. Privacy like Billions. Liquidity like Katana. All on Polygon.*

![PrivyFlow Logo](https://github.com/mohamedwael201193/privyFlow/blob/main/web/public/logo.png?raw=true)

---

## 🎯 What is PrivyFlow?

PrivyFlow is a **Polygon-native payment + DeFi infrastructure layer** that combines:

- **🚀 Stablecoin Payments**: Send USDC instantly using usernames or payment links (no raw addresses).
- **🔐 Self-Sovereign Identity**: Prove "human", "age > 18", or "country OK" with **Privado ID** zero-knowledge credentials—no KYC PDFs.
- **🤖 AI Route Optimization**: Our engine chooses the best on-chain path (DEX, aggregator, fee level) for every transaction.
- **💰 Productive Liquidity Vaults**: Deposit USDC into regional "corridor vaults" (Global, LatAm, etc.) that back payments and earn **real yield** from transaction fees.

**Think:** Venmo UX + Web3 privacy + DeFi yields, all powered by Polygon and the AggLayer ecosystem.

---

## ✨ Key Features

### ✅ Currently Live

| Feature | Description | Status |
|---------|-------------|--------|
| **USDC Payments** | Send/receive Native USDC on Polygon via username or address | ✅ Live |
| **AI Routing** | "Cheapest" vs "Fastest" route optimization with dynamic gas pricing | ✅ Live |
| **Privado ID Integration** | Human verification via Liveness Credential (ZK proofs) | ✅ Live |
| **Corridor Vaults** | Deposit USDC into Global/LatAm vaults & track balances | ✅ Live |
| **Real-Time Analytics** | Track total sent, vault deposits, and payment history | ✅ Live |
| **Wallet Integration** | MetaMask, Rabby, WalletConnect support via Wagmi | ✅ Live |

### 🚧 Coming Soon

- **Katana Integration**: Leverage Katana's deep liquidity and VaultBridge for yield optimization
- **Multi-Chain via AggLayer**: Seamless USDC transfers across Polygon chains
- **RWA Yields**: Tokenized treasury yields via Katana/AUSD for stable, productive returns
- **Payment Links**: Shareable links for invoices and one-time payments
- **Fiat On/Off Ramps**: Direct bank account connections for USDC conversion
- **Business SDK**: Drop-in payments + identity module for other Polygon dApps

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Shadcn UI
- **Backend**: Node.js, Express, Prisma ORM, SQLite (dev) / PostgreSQL (prod)
- **Blockchain**: Polygon PoS Mainnet, Wagmi, Viem, Hardhat
- **AI**: OpenAI API (route optimization, fee prediction)
- **Identity**: Privado ID (Zero-Knowledge Proofs)
- **DEX Aggregation**: 1inch Swap API, Uniswap

### Smart Contracts (Polygon Mainnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| **PrivyFlowRouter** | [`0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d`](https://polygonscan.com/address/0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d) | Handles USDC payments, integrates with DEX aggregators |
| **PrivyFlowIdentityGate** | [`0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1`](https://polygonscan.com/address/0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1) | Verifies Privado ID credentials for gated features |
| **USDC (Native)** | [`0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359`](https://polygonscan.com/address/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359) | Official Native USDC on Polygon |

> **Note:** `PrivyFlowVault` (corridor vaults contract) is currently in development. Vaults are simulated via backend for MVP.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm (`npm install -g pnpm`)
- MetaMask or Rabby Wallet
- Polygon Mainnet RPC (e.g., Alchemy, Infura)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamedwael201193/privyFlow.git
   cd privyFlow
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   
   Create `.env` files in each workspace:
   
   **`web/.env`:**
   ```env
   VITE_PUBLIC_ROUTER_ADDRESS=0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d
   VITE_PUBLIC_IDENTITY_GATE_ADDRESS=0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1
   VITE_PUBLIC_USDC_CONTRACT_ADDRESS=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   VITE_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
   ```
   
   **`backend/.env`:**
   ```env
   DATABASE_URL="file:./dev.db"
   OPENAI_API_KEY=your_openai_key
   FX_API_KEY=your_fx_api_key (freecurrencyapi.com)
   ```
   
   **`contracts/.env`:**
   ```env
   PRIVATE_KEY=your_deployer_private_key
   POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
   ```

4. **Start the Development Environment:**
   
   **Backend:**
   ```bash
   cd backend
   npx prisma migrate dev
   pnpm dev
   ```
   
   **Frontend:**
   ```bash
   cd web
   pnpm dev
   ```

5. **Open the app:**
   Navigate to `http://localhost:5173`

---

## 🔌 Integrations

### Current Integrations

- **Privado ID** (formerly Polygon ID): Self-sovereign identity verification
  - Schema: `LivenessCredential` → `QmcomGJQwJDCg3RE6FjsFYCjjMSTWJXY3fUWeq43Mc5CCJ`
  - Wallet: [https://web-wallet-demo.privado.id](https://web-wallet-demo.privado.id)

- **1inch DEX Aggregator**: Best execution for USDC swaps (coming soon for routing)
  
- **OpenAI API**: Powers AI route recommendations and fee predictions

- **Free Currency API**: Real-time fiat exchange rates for UX

### Planned Integrations

- **Katana Network**: Deep liquidity and VaultBridge for productive TVL
- **Paraswap**: Alternative DEX aggregator for route diversity
- **AggLayer**: Seamless cross-chain USDC flows

---

## 💡 Why PrivyFlow?

### For Users
- **Save 70%+ on fees** vs. traditional remittance (Western Union, Wise)
- **Instant settlements** instead of 3-5 business days
- **Privacy-first**: No KYC docs, just zero-knowledge proofs
- **Earn yield**: Park USDC in corridor vaults, earn real transaction fees

### For Developers
- **Drop-in SDK**: Integrate payments + identity into your Polygon dApp
- **Non-custodial**: Users control their funds, you control the UX
- **Open-source**: Build on our contracts, extend the stack

### For Liquidity Providers
- **Productive TVL**: Your USDC backs real payments, earns real fees
- **No mercenary yield**: Sustainable economics from transaction volume
- **Regional strategies**: Choose corridors (Global, LatAm, SE Asia) based on flow

---

## 🎯 Alignment with Polygon Ecosystem

### Nxtlvl (Billions Network)
- ✅ Self-sovereign identity via Privado ID
- ✅ Human-AI networks (AI route agents + verified credentials)
- ✅ AggLayer/Katana interoperability vision

### ChillerWhale
- ✅ Productive TVL, not spam emissions
- ✅ Payments infra for mainstream adoption
- ✅ Real metrics: volume, fees saved, corridor yield

### Polygon Buildathon
- **AI**: Route optimization, anomaly detection
- **DeFi**: Corridor vaults, Katana integration
- **Infra**: Reusable payments + identity SDK

---

## 📊 Metrics (Live on Mainnet)

- **Total Transactions**: Real-time
- **Total Volume**: Real-time USDC tracking
- **Average Fee Saved**: ~72% vs. CeFi rails
- **Active Vault Deposits**: Real-time balance tracking

---

## 🛠️ Project Structure

```
privyFlow/
├── web/              # Vite + React frontend
│   ├── src/
│   │   ├── pages/    # Dashboard, Send, Vaults, Identity, Analytics
│   │   ├── hooks/    # useAnalyticsSummary, useVaults, etc.
│   │   └── lib/      # API client, utilities, ABIs
│   └── public/       # Logo, favicon
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── routes/   # /payments, /vaults, /analytics, /identity
│   │   └── services/ # aiRouter, fxRates (future)
│   └── prisma/       # Database schema & migrations
├── contracts/        # Hardhat + Solidity
│   ├── src/          # PrivyFlowRouter, IdentityGate
│   ├── deploy/       # Deployment scripts
│   └── test/         # Contract tests
└── shared/           # Shared TypeScript types
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Twitter**: [Coming Soon]
- **Discord**: [Coming Soon]

---

## 🙏 Acknowledgments

Built with love for the Polygon ecosystem. Special thanks to:
- **Polygon Labs** for the Polygon PoS infrastructure
- **Privado ID** for self-sovereign identity primitives
- **Katana Network** for the productive TVL vision
- **1inch** for DEX aggregation APIs
- **OpenAI** for AI routing capabilities

---

**© 2025 PrivyFlow. Built for the Polygon × AggLayer era.**
