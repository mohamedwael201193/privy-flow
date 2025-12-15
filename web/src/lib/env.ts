export const frontendConfig = {
    backendUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    alchemyApiKey: import.meta.env.VITE_PUBLIC_ALCHEMY_API_KEY || '',
    walletConnectProjectId: import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    routerAddress: (import.meta.env.VITE_PUBLIC_ROUTER_ADDRESS as `0x${string}`) || '0x0',
    identityGateAddress: (import.meta.env.VITE_PUBLIC_IDENTITY_GATE_ADDRESS as `0x${string}`) || '0x0',
    usdcAddress: (import.meta.env.VITE_PUBLIC_USDC_CONTRACT_ADDRESS as `0x${string}`) || '0x0',
    katanaChainId: Number(import.meta.env.VITE_PUBLIC_KATANA_CHAIN_ID) || 747474,
    katanaRpcUrl: import.meta.env.VITE_PUBLIC_KATANA_RPC_URL || 'https://rpc.katana.network/',
    privadoWebWalletUrl: import.meta.env.VITE_PUBLIC_PRIVADO_WEB_WALLET_URL || '',
    // Wave 4 contracts
    paymentAgentAddress: (import.meta.env.VITE_PUBLIC_PAYMENT_AGENT_ADDRESS as `0x${string}`) || '0xBD2267Bd7d92A4100B4cB457ACDD5D3E9178c1E4',
    tieredLimitsAddress: (import.meta.env.VITE_PUBLIC_TIERED_LIMITS_ADDRESS as `0x${string}`) || '0x3c42696908B7A805365478f780899Cbd70D7804D',
};
