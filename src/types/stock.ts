export interface StockData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  marketCap: number;
  sector: string;
  prediction: MarketPrediction;
  sentiment: SentimentScore;
}

export interface HistoricalDataPoint {
  timestamp: number; // Unix timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CandleData {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
}

export type MarketPrediction = 'bull' | 'neutral' | 'short';

export interface SentimentScore {
  score: number; // -1 to 1
  news: NewsItem[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  sentiment: number; // -1 to 1
  timestamp: number; // Unix timestamp
}

export interface Portfolio {
  stocks: PortfolioStock[];
  totalValue: number;
  totalProfit: number;
  totalProfitPercent: number;
}

export interface PortfolioStock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  profit: number;
  profitPercent: number;
}

export interface InvestmentSimulation {
  stock: StockData;
  investmentAmount: number;
  predictedReturn: number;
  predictedReturnPercent: number;
  predictedValue: number;
  timeframe: number; // in days
  riskLevel: 'Low' | 'Medium' | 'High';
  confidenceScore: number; // 0 to 1
}