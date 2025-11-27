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
};
