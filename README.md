# PrivyFlow 🌊

**Private, AI-Routed Stablecoin Rails for the AggLayer Era.**

PrivyFlow is a next-generation payment and DeFi infrastructure built on **Polygon**. It enables instant, low-cost global stablecoin payments with AI-optimized routing, self-sovereign identity verification, and yield-generating corridor vaults.

![PrivyFlow Dashboard](https://github.com/mohamedwael201193/privyFlow/assets/placeholder/dashboard.png)

## 🚀 Key Features

*   **AI-Optimized Routing:** Our "Cheapest" vs. "Fastest" routing engine (powered by 1inch/Uniswap) ensures you always get the best deal on your stablecoin transfers.
*   **Corridor Vaults:** Deposit USDC into regional payment corridors (e.g., LatAm, SE Asia) to earn real yield from transaction fees.
*   **Self-Sovereign Identity:** Integrated with **Privado ID** (formerly Polygon ID) for zero-knowledge KYC/AML compliance without compromising user privacy.
*   **Gasless Experience:** Native meta-transactions and account abstraction features (coming soon) for a seamless user experience.
*   **Real-Time Analytics:** Track your payment volume, savings, and impact with our comprehensive dashboard.

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Shadcn UI
*   **Backend:** Node.js, Express, Prisma, SQLite (Dev) / PostgreSQL (Prod)
*   **Blockchain:** Polygon PoS (Mainnet), Wagmi, Viem, Hardhat
*   **Identity:** Privado ID (Zero-Knowledge Proofs)
*   **AI:** OpenAI API (for route optimization logic)

## 📦 Project Structure

This is a monorepo managed with `pnpm workspaces`:

*   `web`: The React frontend application.
*   `backend`: The Express API server.
*   `contracts`: Solidity smart contracts and deployment scripts.
*   `shared`: Shared TypeScript types and utilities.

## 🏁 Getting Started

### Prerequisites

*   Node.js v18+
*   pnpm (`npm install -g pnpm`)
*   Metamask or Rabby Wallet

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohamedwael201193/privyFlow.git
    cd privyFlow
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    *   Copy `.env.example` to `.env` in `web`, `backend`, and `contracts` directories.
    *   Fill in your API keys (Alchemy, OpenAI, etc.).

4.  **Start the Development Environment:**
    *   **Backend:**
        ```bash
        cd backend
        npx prisma migrate dev
        pnpm dev
        ```
    *   **Frontend:**
        ```bash
        cd web
        pnpm dev
        ```

## 📜 Smart Contracts (Polygon Mainnet)

*   **PrivyFlowRouter:** `0x2e9aF66F9B8f21a6E8510fbb5BF33F106414D00d`
*   **PrivyFlowIdentityGate:** `0xde2cf7cec93c033a2fc184080b55c8CCC5406Fa1`
*   **USDC (Native):** `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
