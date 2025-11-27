import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/env';
import paymentRoutes from './routes/payments';
import vaultRoutes from './routes/vaults';
import analyticsRoutes from './routes/analytics';
import identityRoutes from './routes/identity';

const app: Application = express();
const port = config.PORT;

// CORS configuration - allow Vercel frontend
const corsOptions = {
    origin: ['https://privy-flow.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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

// Export for Vercel serverless
export default app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
