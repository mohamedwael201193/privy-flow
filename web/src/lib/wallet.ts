import { createConfig, http } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { frontendConfig } from './env';

// Define Katana chain
const katana = {
    id: frontendConfig.katanaChainId,
    name: 'Katana',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: [frontendConfig.katanaRpcUrl] },
    },
} as const;

export const config = createConfig({
    chains: [polygon, polygonAmoy, katana],
    transports: {
        [polygon.id]: http(frontendConfig.polygonRpcUrl),
        [polygonAmoy.id]: http(),
        [katana.id]: http(frontendConfig.katanaRpcUrl),
    },
    connectors: [
        injected(),
    ],
});
