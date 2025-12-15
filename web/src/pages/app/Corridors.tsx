import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
    Globe, TrendingUp, ArrowRight, DollarSign, Clock,
    Percent, RefreshCw, Loader2, MapPin, Zap
} from 'lucide-react';
import { api } from '../../lib/api';

interface Corridor {
    id: string;
    name: string;
    country: string;
    currency: string;
    flag: string;
    description: string;
    avgFee: string;
    avgTime: string;
    monthlyVolume: string;
    currentRate: number;
    rateDisplay: string;
    note?: string;
}

interface Quote {
    corridorId: string;
    amountUSD: number;
    localAmount: string;
    localCurrency: string;
    fees: {
        total: string;
        percentage: string;
    };
    rate: string;
    display: {
        youSend: string;
        theyReceive: string;
    };
    comparison: {
        westernUnion: { fee: string; savings: string; savingsPercent: string };
        wise: { fee: string; savings: string };
    };
}

export default function Corridors() {
    const { address } = useAccount();
    const [corridors, setCorridors] = useState<Corridor[]>([]);
    const [selectedCorridor, setSelectedCorridor] = useState<string>('latam-mexico');
    const [amount, setAmount] = useState('100');
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchCorridors();
        fetchStats();
    }, []);

    useEffect(() => {
        if (amount && selectedCorridor) {
            const timer = setTimeout(() => {
                fetchQuote();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [amount, selectedCorridor]);

    const fetchCorridors = async () => {
        try {
            const response = await api.get('/corridors');
            setCorridors(response.data.corridors || []);
        } catch (error) {
            console.error('Failed to fetch corridors:', error);
            // Fallback data
            setCorridors([
                { id: 'latam-mexico', name: 'Mexico', country: 'Mexico', currency: 'MXN', flag: '🇲🇽', description: 'Send to Mexico', avgFee: '0.3%', avgTime: '< 5s', monthlyVolume: '$3.1M', currentRate: 17.25, rateDisplay: '1 USD = 17.25 MXN' },
                { id: 'latam-brazil', name: 'Brazil', country: 'Brazil', currency: 'BRL', flag: '🇧🇷', description: 'Send to Brazil', avgFee: '0.3%', avgTime: '< 5s', monthlyVolume: '$2.4M', currentRate: 5.05, rateDisplay: '1 USD = 5.05 BRL' },
                { id: 'latam-argentina', name: 'Argentina', country: 'Argentina', currency: 'ARS', flag: '🇦🇷', description: 'Send to Argentina (blue rate)', avgFee: '0.5%', avgTime: '< 10s', monthlyVolume: '$890K', currentRate: 1420, rateDisplay: '1 USD = 1420 ARS' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await api.get('/corridors/stats/overview');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchQuote = async () => {
        if (!amount || parseFloat(amount) <= 0) return;

        setQuoteLoading(true);
        try {
            const response = await api.post('/corridors/quote', {
                corridorId: selectedCorridor,
                amountUSD: parseFloat(amount)
            });
            setQuote(response.data.quote);
        } catch (error) {
            console.error('Failed to fetch quote:', error);
        } finally {
            setQuoteLoading(false);
        }
    };

    const selectedCorridorData = corridors.find(c => c.id === selectedCorridor);

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Globe className="w-8 h-8 text-purple-500" />
                        LATAM Remittance Corridors
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Send USDC to Latin America with real-time FX rates • 72% cheaper than Western Union
                    </p>
                </motion.div>

                {/* Stats Bar */}
                {stats && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
                    >
                        {[
                            { label: '24h Volume', value: stats.totalVolume24h, icon: DollarSign },
                            { label: 'Transactions', value: stats.totalTransactions24h, icon: TrendingUp },
                            { label: 'Avg Size', value: stats.avgTransactionSize, icon: Zap },
                            { label: 'Top Corridor', value: stats.topCorridor, icon: MapPin },
                            { label: 'Avg Savings', value: stats.avgSavingsVsBanks, icon: Percent }
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                    <stat.icon className="w-4 h-4" />
                                    {stat.label}
                                </div>
                                <p className="text-xl font-bold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Corridor Selection */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-4">Select Corridor</h2>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                            </div>
                        ) : (
                            corridors.map((corridor, i) => (
                                <motion.button
                                    key={corridor.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedCorridor(corridor.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition ${selectedCorridor === corridor.id
                                            ? 'bg-purple-600/20 border-purple-500'
                                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{corridor.flag}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-white">{corridor.name}</p>
                                            <p className="text-sm text-gray-400">{corridor.rateDisplay}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-medium">{corridor.avgFee}</p>
                                            <p className="text-gray-500 text-xs">{corridor.avgTime}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))
                        )}
                    </div>

                    {/* Quote Calculator */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                        >
                            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-purple-500" />
                                Calculate Transfer
                            </h2>

                            {/* Amount Input */}
                            <div className="mb-6">
                                <label className="block text-gray-400 text-sm mb-2">You Send (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-4 text-2xl font-bold text-white focus:border-purple-500 outline-none"
                                        placeholder="100"
                                    />
                                    <button
                                        onClick={fetchQuote}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <RefreshCw className={`w-5 h-5 ${quoteLoading ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Quote Result */}
                            {quote && selectedCorridorData && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    {/* They Receive */}
                                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                                        <p className="text-gray-400 text-sm mb-2">They Receive</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-4xl">{selectedCorridorData.flag}</span>
                                            <div>
                                                <p className="text-3xl font-bold text-white">
                                                    {parseFloat(quote.localAmount).toLocaleString()} {quote.localCurrency}
                                                </p>
                                                <p className="text-gray-400 text-sm">@ {quote.rate} rate</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fee Breakdown */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gray-900/50 rounded-xl p-4">
                                            <p className="text-gray-400 text-sm">Total Fee</p>
                                            <p className="text-xl font-bold text-green-400">${quote.fees.total}</p>
                                            <p className="text-gray-500 text-xs">{quote.fees.percentage}</p>
                                        </div>
                                        <div className="bg-gray-900/50 rounded-xl p-4">
                                            <p className="text-gray-400 text-sm">Exchange Rate</p>
                                            <p className="text-xl font-bold text-white">{parseFloat(quote.rate).toFixed(2)}</p>
                                            <p className="text-gray-500 text-xs">{quote.localCurrency}/USD</p>
                                        </div>
                                        <div className="bg-gray-900/50 rounded-xl p-4">
                                            <p className="text-gray-400 text-sm">Delivery</p>
                                            <p className="text-xl font-bold text-purple-400">~5 sec</p>
                                            <p className="text-gray-500 text-xs">Instant</p>
                                        </div>
                                    </div>

                                    {/* Comparison */}
                                    <div className="bg-gray-900/50 rounded-xl p-4">
                                        <p className="text-gray-400 text-sm mb-3">vs Traditional Remittance</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">Western Union</span>
                                                <span className="text-green-400 font-semibold">
                                                    Save ${quote.comparison.westernUnion.savings}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">Wise</span>
                                                <span className="text-green-400 font-semibold">
                                                    Save ${quote.comparison.wise.savings}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Send Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2"
                                        onClick={() => window.location.href = `/app/send?corridor=${selectedCorridor}&amount=${amount}`}
                                    >
                                        Send to {selectedCorridorData.country}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>
                            )}

                            {quoteLoading && (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                </div>
                            )}
                        </motion.div>

                        {/* Corridor Info */}
                        {selectedCorridorData && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-gray-700"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{selectedCorridorData.flag}</span>
                                    <div>
                                        <h3 className="font-semibold text-white">{selectedCorridorData.name} Corridor</h3>
                                        <p className="text-gray-400 text-sm mt-1">{selectedCorridorData.description}</p>
                                        {selectedCorridorData.note && (
                                            <p className="text-purple-400 text-sm mt-2 flex items-center gap-1">
                                                <Zap className="w-4 h-4" />
                                                {selectedCorridorData.note}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-xs mt-2">
                                            Monthly Volume: {selectedCorridorData.monthlyVolume}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
