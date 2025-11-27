import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import paymentRoutes from './routes/payments';
import vaultRoutes from './routes/vaults';
import analyticsRoutes from './routes/analytics';
import identityRoutes from './routes/identity';

const app = express();
const port = config.PORT;

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://privy-flow.vercel.app', 'https://privy-flow.vercel.app']
        : '*',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: "ok", network: config.POLYGON_CHAIN_ID });
});

app.use('/api/payments', paymentRoutes);
app.use('/api/vaults', vaultRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/identity', identityRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
