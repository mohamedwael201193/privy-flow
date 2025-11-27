export const frontendConfig = {
    appName: import.meta.env.VITE_APP_NAME || 'PrivyFlow',
    polygonChainId: Number(import.meta.env.VITE_PUBLIC_POLYGON_CHAIN_ID) || 137,
    polygonRpcUrl: import.meta.env.VITE_PUBLIC_POLYGON_RPC_URL || 'https://polygon-rpc.com',
    usdcContractAddress: import.meta.env.VITE_PUBLIC_USDC_CONTRACT_ADDRESS || '',
    backendUrl: import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:4000',
    katanaChainId: Number(import.meta.env.VITE_PUBLIC_KATANA_CHAIN_ID) || 747474,
    katanaRpcUrl: import.meta.env.VITE_PUBLIC_KATANA_RPC_URL || 'https://rpc.katana.network/',
    privadoWebWalletUrl: import.meta.env.VITE_PUBLIC_PRIVADO_WEB_WALLET_URL || '',
};
