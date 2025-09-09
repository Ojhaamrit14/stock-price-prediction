import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { createChart, IChartApi, ColorType, Time } from 'lightweight-charts';
import { StockData } from '../types/stock';

// Mock data for stocks
const mockStocks: StockData[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.30,
    change: 5.23,
    changePercent: 2.84,
    open: 184.07,
    high: 189.50,
    low: 183.95,
    volume: 68590000,
    marketCap: 2950000000000,
    sector: 'Technology',
    prediction: 'bull',
    sentiment: { score: 0.7, news: [] }
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 410.34,
    change: 12.87,
    changePercent: 3.24,
    open: 397.47,
    high: 411.12,
    low: 397.05,
    volume: 23680000,
    marketCap: 3050000000000,
    sector: 'Technology',
    prediction: 'bull',
    sentiment: { score: 0.8, news: [] }
  },
  {
    id: '3',
    symbol: 'GOOG',
    name: 'Alphabet Inc.',
    price: 152.18,
    change: 3.45,
    changePercent: 2.32,
    open: 148.73,
    high: 152.40,
    low: 148.50,
    volume: 24160000,
    marketCap: 1910000000000,
    sector: 'Technology',
    prediction: 'neutral',
    sentiment: { score: 0.3, news: [] }
  },
  {
    id: '4',
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 178.75,
    change: 1.23,
    changePercent: 0.69,
    open: 177.52,
    high: 179.35,
    low: 177.00,
    volume: 34560000,
    marketCap: 1850000000000,
    sector: 'Consumer Discretionary',
    prediction: 'bull',
    sentiment: { score: 0.5, news: [] }
  },
  {
    id: '5',
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 572.40,
    change: -19.83,
    changePercent: -3.35,
    open: 592.23,
    high: 592.50,
    low: 570.75,
    volume: 6250000,
    marketCap: 249800000000,
    sector: 'Communication Services',
    prediction: 'short',
    sentiment: { score: -0.4, news: [] }
  },
  {
    id: '6',
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 472.96,
    change: 9.84,
    changePercent: 2.13,
    open: 463.12,
    high: 473.85,
    low: 462.90,
    volume: 15680000,
    marketCap: 1210000000000,
    sector: 'Technology',
    prediction: 'bull',
    sentiment: { score: 0.6, news: [] }
  },
  {
    id: '7',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 175.20,
    change: -2.34,
    changePercent: -1.32,
    open: 177.54,
    high: 178.20,
    low: 174.85,
    volume: 86250000,
    marketCap: 558000000000,
    sector: 'Consumer Discretionary',
    prediction: 'neutral',
    sentiment: { score: 0.1, news: [] }
  }
];

// Generate historical data for a stock
const generateHistoricalData = (days: number, startPrice: number, volatility: number = 0.02) => {
  const data = [];
  let price = startPrice;
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(now.getDate() - (days - i));
    
    const change = (Math.random() - 0.5) * volatility * price;
    price += change;
    
    const open = price - (Math.random() * change * 0.5);
    const high = Math.max(price, open) + (Math.random() * change * 0.5);
    const low = Math.min(price, open) - (Math.random() * change * 0.5);
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as Time,
      open: open,
      high: high,
      low: low,
      close: price,
    });
  }
  
  return data;
};

const LiveTrackerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // Initialize with the first stock
  useEffect(() => {
    if (!selectedStock && mockStocks.length > 0) {
      setSelectedStock(mockStocks[0]);
    }
  }, []);

  // Filter stocks based on search term
  const filteredStocks = mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create and update chart
  useEffect(() => {
    if (chartContainerRef.current && selectedStock) {
      // Clear previous chart if it exists
      if (chartRef.current) {
        try {
          chartRef.current.remove();
          chartRef.current = null;
        } catch (e) {
          // Chart was already disposed
          chartRef.current = null;
        }
      }

      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Create new chart
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: isDarkMode ? '#e2e8f0' : '#334155',
        },
        grid: {
          vertLines: { color: isDarkMode ? 'rgba(70, 70, 70, 0.2)' : 'rgba(220, 220, 220, 0.8)' },
          horzLines: { color: isDarkMode ? 'rgba(70, 70, 70, 0.2)' : 'rgba(220, 220, 220, 0.8)' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 500,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });
      
      chartRef.current = chart;

      // Determine days based on timeframe
      let days = 30; // Default for 1M
      switch (timeframe) {
        case '1D': days = 1; break;
        case '1W': days = 7; break;
        case '1M': days = 30; break;
        case '3M': days = 90; break;
        case '1Y': days = 365; break;
      }

      // Generate historical data
      const historicalData = generateHistoricalData(days, selectedStock.price * 0.8);

      // Add the appropriate series type
      if (chartType === 'candle') {
        const candleSeries = chart.addCandlestickSeries({
          upColor: '#10b981',
          downColor: '#ef4444',
          borderUpColor: '#10b981',
          borderDownColor: '#ef4444',
          wickUpColor: '#10b981',
          wickDownColor: '#ef4444',
        });
        
        candleSeries.setData(historicalData);
      } else {
        const lineSeries = chart.addLineSeries({
          color: '#3b82f6',
          lineWidth: 2,
        });
        
        lineSeries.setData(historicalData.map(item => ({
          time: item.time,
          value: item.close,
        })));
      }

      // Fit content
      chart.timeScale().fitContent();

      // Make chart responsive
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({ 
            width: chartContainerRef.current.clientWidth 
          });
        }
      };

      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          try {
            chartRef.current.remove();
            chartRef.current = null;
          } catch (e) {
            // Chart was already disposed
            chartRef.current = null;
          }
        }
      };
    }
  }, [selectedStock, chartType, timeframe]);

  // Function to simulate price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      mockStocks.forEach(stock => {
        const change = (Math.random() - 0.5) * 0.01 * stock.price;
        stock.price = parseFloat((stock.price + change).toFixed(2));
        stock.change = parseFloat((stock.change + change).toFixed(2));
        stock.changePercent = parseFloat((stock.changePercent + (change / stock.price) * 100).toFixed(2));
      });

      // If we have a selected stock, update it
      if (selectedStock) {
        setSelectedStock({...selectedStock});
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Live Market Tracker
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Track real-time stock prices, view detailed charts, and get AI-powered predictions for market movements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Stock List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="card">
            <div className="relative mb-4">
              <input
                type="text"
                className="input pl-10"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Stocks</h3>
              <button className="flex items-center text-xs text-muted-foreground hover:text-foreground">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredStocks.map(stock => (
                <div
                  key={stock.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    selectedStock?.id === stock.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/10'
                  }`}
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-md ${selectedStock?.id === stock.id ? 'bg-primary/20' : 'bg-muted/50'} mr-2`}>
                        <span className="text-xs font-semibold">{stock.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">{stock.name.length > 15 ? stock.name.slice(0, 15) + '...' : stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">${stock.price.toFixed(2)}</div>
                      <div className={`text-xs flex items-center justify-end ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-0.5" />
                        )}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chart and Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-4 space-y-4"
        >
          {selectedStock && (
            <>
              {/* Stock Header */}
              <div className="card">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold mr-2">{selectedStock.name} ({selectedStock.symbol})</h2>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        selectedStock.prediction === 'bull' ? 'bg-success/10 text-success' :
                        selectedStock.prediction === 'short' ? 'bg-error/10 text-error' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {selectedStock.prediction === 'bull' ? 'Bullish' :
                        selectedStock.prediction === 'short' ? 'Bearish' : 'Neutral'}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{selectedStock.sector}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="text-3xl font-mono font-bold">${selectedStock.price.toFixed(2)}</div>
                    <div className={`flex items-center ${selectedStock.change >= 0 ? 'text-success' : 'text-error'}`}>
                      {selectedStock.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-medium">{selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Controls */}
              <div className="card">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        chartType === 'candle' ? 'bg-primary text-white' : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                      }`}
                      onClick={() => setChartType('candle')}
                    >
                      Candlestick
                    </button>
                    <button 
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        chartType === 'line' ? 'bg-primary text-white' : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                      }`}
                      onClick={() => setChartType('line')}
                    >
                      Line
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {(['1D', '1W', '1M', '3M', '1Y'] as const).map(time => (
                      <button 
                        key={time}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          timeframe === time ? 'bg-primary text-white' : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                        }`}
                        onClick={() => setTimeframe(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Chart */}
                <div ref={chartContainerRef} className="w-full h-[500px]" />
              </div>

              {/* Stock Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Trading Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open</span>
                      <span className="font-medium">${selectedStock.open.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">High</span>
                      <span className="font-medium">${selectedStock.high.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Low</span>
                      <span className="font-medium">${selectedStock.low.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{(selectedStock.volume / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">${(selectedStock.marketCap / 1000000000).toFixed(2)}B</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">AI Prediction</h3>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${
                      selectedStock.prediction === 'bull' ? 'bg-success/20 text-success' :
                      selectedStock.prediction === 'short' ? 'bg-error/20 text-error' :
                      'bg-warning/20 text-warning'
                    } mr-4`}>
                      {selectedStock.prediction === 'bull' ? (
                        <TrendingUp className="h-6 w-6" />
                      ) : selectedStock.prediction === 'short' ? (
                        <TrendingDown className="h-6 w-6" />
                      ) : (
                        <Minus className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {selectedStock.prediction === 'bull' ? 'Bullish' :
                        selectedStock.prediction === 'short' ? 'Bearish' : 'Neutral'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedStock.prediction === 'bull' ? 'Likely to rise' :
                        selectedStock.prediction === 'short' ? 'Likely to fall' : 'Sideways movement'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span>{Math.abs(selectedStock.sentiment.score * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          selectedStock.prediction === 'bull' ? 'bg-success' :
                          selectedStock.prediction === 'short' ? 'bg-error' :
                          'bg-warning'
                        }`}
                        style={{ width: `${Math.abs(selectedStock.sentiment.score * 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <button className="btn-outline w-full mt-2">View Detailed Analysis</button>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span>Overall Sentiment</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      selectedStock.sentiment.score > 0.3 ? 'bg-success/10 text-success' :
                      selectedStock.sentiment.score < -0.3 ? 'bg-error/10 text-error' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {selectedStock.sentiment.score > 0.3 ? 'Positive' :
                      selectedStock.sentiment.score < -0.3 ? 'Negative' : 'Neutral'}
                    </span>
                  </div>
                  
                  {/* Simulated news sentiment */}
                  <div className="space-y-3">
                    <div className="p-2 border border-border rounded-lg">
                      <p className="text-sm font-medium mb-1">Q2 Earnings Beat Expectations</p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Strong quarterly performance driven by new product launches.
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span>Bloomberg</span>
                        <span className="text-success">+0.8</span>
                      </div>
                    </div>
                    
                    <div className="p-2 border border-border rounded-lg">
                      <p className="text-sm font-medium mb-1">Supply Chain Concerns</p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Analysts warn of potential component shortages affecting production.
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span>Financial Times</span>
                        <span className="text-error">-0.6</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-outline w-full mt-4">View All News</button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveTrackerPage;