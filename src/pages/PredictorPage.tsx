import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Info, DollarSign, BarChart, AlertCircle } from 'lucide-react';
import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import { StockData, InvestmentSimulation } from '../types/stock';

// Reuse mock stocks from LiveTrackerPage
const mockStocks = [
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
  }
] as StockData[];

const PredictorPage: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [timeframe, setTimeframe] = useState<number>(30);
  const [simulation, setSimulation] = useState<InvestmentSimulation | null>(null);
  
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Set initial stock
  useEffect(() => {
    if (!selectedStock && mockStocks.length > 0) {
      setSelectedStock(mockStocks[0]);
    }
  }, []);

  // Update simulation when stock, amount, or timeframe changes
  useEffect(() => {
    if (selectedStock) {
      runSimulation(selectedStock, investmentAmount, timeframe);
    }
  }, [selectedStock, investmentAmount, timeframe]);

  const runSimulation = (stock: StockData, amount: number, days: number) => {
    // Mock simulation calculation
    const sentimentFactor = stock.sentiment.score * 2; // Convert -1 to 1 scale to -2 to 2
    const predictionFactor = 
      stock.prediction === 'bull' ? 0.15 : 
      stock.prediction === 'short' ? -0.12 : 
      0.03;
    
    // Calculate simulated return based on prediction and sentiment
    const baseReturn = (predictionFactor + sentimentFactor/10) * (days / 30);
    
    // Add some randomness
    const randomness = (Math.random() * 0.05) - 0.025;
    const predictedReturnPercent = baseReturn + randomness;
    
    // Calculate predicted values
    const predictedReturn = amount * predictedReturnPercent;
    const predictedValue = amount + predictedReturn;
    
    // Determine risk level
    const volatility = Math.abs(stock.change / stock.price);
    let riskLevel: 'Low' | 'Medium' | 'High';
    
    if (volatility < 0.01 && Math.abs(predictedReturnPercent) < 0.1) {
      riskLevel = 'Low';
    } else if (volatility > 0.03 || Math.abs(predictedReturnPercent) > 0.25) {
      riskLevel = 'High';
    } else {
      riskLevel = 'Medium';
    }
    
    // Calculate confidence based on sentiment score and prediction strength
    const confidenceScore = Math.min(0.95, Math.max(0.3, 0.6 + Math.abs(stock.sentiment.score) * 0.3));
    
    // Create simulation result
    const newSimulation: InvestmentSimulation = {
      stock,
      investmentAmount: amount,
      predictedReturn,
      predictedReturnPercent,
      predictedValue,
      timeframe: days,
      riskLevel,
      confidenceScore
    };
    
    setSimulation(newSimulation);
    
    // Update chart
    updatePredictionChart(stock.price, predictedReturnPercent, days);
  };

  const updatePredictionChart = (currentPrice: number, returnPercent: number, days: number) => {
    if (!chartContainerRef.current) return;
    
    // Clear existing chart
    chartContainerRef.current.innerHTML = '';
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // Create chart
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
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });
    
    // Add line series for historical data
    const lineSeries = chart.addLineSeries({
      color: '#3b82f6',
      lineWidth: 2,
    });
    
    // Create some historical data
    const historicalData = [];
    let price = currentPrice * 0.9; // Start 10% lower than current price
    const now = new Date();
    
    // Past 60 days
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(now.getDate() - (60 - i));
      
      // Add some random movement
      const change = (Math.random() - 0.45) * 0.01 * price; // Slight upward bias
      price += change;
      
      historicalData.push({
        time: Math.floor(date.getTime() / 1000),
        value: price,
      });
    }
    
    // Add current price point
    historicalData.push({
      time: Math.floor(now.getTime() / 1000),
      value: currentPrice,
    });
    
    lineSeries.setData(historicalData);
    
    // Add prediction series
    const predictionSeries = chart.addLineSeries({
      color: returnPercent >= 0 ? '#10b981' : '#ef4444',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });
    
    // Create prediction data
    const predictionData = [];
    price = currentPrice;
    
    // Future days
    for (let i = 0; i <= days; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      
      if (i === 0) {
        // Start with current price
        predictionData.push({
          time: Math.floor(date.getTime() / 1000),
          value: price,
        });
      } else {
        // Calculate daily change for the predicted return
        const dailyReturnPercent = returnPercent / days;
        price = price * (1 + dailyReturnPercent);
        
        // Add some randomness to the prediction line
        const randomFactor = 1 + ((Math.random() - 0.5) * 0.005);
        const adjustedPrice = price * randomFactor;
        
        predictionData.push({
          time: Math.floor(date.getTime() / 1000),
          value: adjustedPrice,
        });
      }
    }
    
    predictionSeries.setData(predictionData);
    
    // Add confidence interval
    if (simulation) {
      const upperSeries = chart.addLineSeries({
        color: returnPercent >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
      });
      
      const lowerSeries = chart.addLineSeries({
        color: returnPercent >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
      });
      
      const confidenceInterval = (1 - simulation.confidenceScore) * Math.abs(returnPercent);
      
      const upperData = predictionData.map(point => ({
        time: point.time,
        value: point.value * (1 + confidenceInterval),
      }));
      
      const lowerData = predictionData.map(point => ({
        time: point.time,
        value: point.value * (1 - confidenceInterval),
      }));
      
      upperSeries.setData(upperData);
      lowerSeries.setData(lowerData);
      
      // Fill area between upper and lower bounds
      const areaChart = chart.addAreaSeries({
        topColor: returnPercent >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        bottomColor: 'rgba(0, 0, 0, 0)',
        lineColor: 'rgba(0, 0, 0, 0)',
      });
      
      areaChart.setData(upperData);
    }
    
    // Fit content
    chart.timeScale().fitContent();
    
    // Make chart responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Save cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  };

  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Stock Predictor
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Simulate investments and get AI-powered predictions for potential returns over different timeframes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Parameters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Stock Selection */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Select Stock</h2>
            <div className="space-y-3">
              {mockStocks.map(stock => (
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
                      <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                        selectedStock?.id === stock.id ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-foreground'
                      } mr-3`}>
                        <span className="text-lg font-bold">{stock.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </div>
                    <div>
                      {stock.prediction === 'bull' ? (
                        <TrendingUp className="h-5 w-5 text-success" />
                      ) : stock.prediction === 'short' ? (
                        <TrendingDown className="h-5 w-5 text-error" />
                      ) : (
                        <Minus className="h-5 w-5 text-warning" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Parameters */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Investment Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="investment-amount" className="block text-sm font-medium text-foreground mb-1">
                  Investment Amount ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="number"
                    id="investment-amount"
                    className="input pl-9"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Math.max(100, Number(e.target.value)))}
                    min="100"
                    step="100"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="timeframe" className="block text-sm font-medium text-foreground mb-1">
                  Prediction Timeframe (days)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <select
                    id="timeframe"
                    className="input pl-9 appearance-none"
                    value={timeframe}
                    onChange={(e) => setTimeframe(Number(e.target.value))}
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Stock Info */}
          {selectedStock && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Current Stock Info</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="font-medium">${selectedStock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today's Change</span>
                  <span className={selectedStock.change >= 0 ? 'text-success' : 'text-error'}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sector</span>
                  <span className="font-medium">{selectedStock.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${(selectedStock.marketCap / 1000000000).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ML Prediction</span>
                  <span className={`font-medium ${
                    selectedStock.prediction === 'bull' ? 'text-success' :
                    selectedStock.prediction === 'short' ? 'text-error' :
                    'text-warning'
                  }`}>
                    {selectedStock.prediction === 'bull' ? 'Bullish' :
                    selectedStock.prediction === 'short' ? 'Bearish' : 'Neutral'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Prediction Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-8 space-y-6"
        >
          {simulation && (
            <>
              {/* Prediction Summary */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Prediction Summary</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Confidence</span>
                    <span className="text-sm font-medium">{Math.round(simulation.confidenceScore * 100)}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-4 rounded-lg border ${simulation.predictedReturn >= 0 ? 'border-success/30 bg-success/5' : 'border-error/30 bg-error/5'}`}>
                    <div className="text-sm text-muted-foreground mb-1">Predicted Return</div>
                    <div className={`text-2xl font-bold ${simulation.predictedReturn >= 0 ? 'text-success' : 'text-error'}`}>
                      {simulation.predictedReturn >= 0 ? '+' : ''}${Math.abs(simulation.predictedReturn).toFixed(2)}
                    </div>
                    <div className={`text-sm font-medium ${simulation.predictedReturn >= 0 ? 'text-success' : 'text-error'}`}>
                      {simulation.predictedReturnPercent >= 0 ? '+' : ''}{(simulation.predictedReturnPercent * 100).toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                    <div className="text-sm text-muted-foreground mb-1">Predicted Value</div>
                    <div className="text-2xl font-bold text-primary">${simulation.predictedValue.toFixed(2)}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      After {simulation.timeframe} days
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${
                    simulation.riskLevel === 'Low' ? 'border-success/30 bg-success/5' :
                    simulation.riskLevel === 'Medium' ? 'border-warning/30 bg-warning/5' :
                    'border-error/30 bg-error/5'
                  }`}>
                    <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                    <div className={`text-2xl font-bold ${
                      simulation.riskLevel === 'Low' ? 'text-success' :
                      simulation.riskLevel === 'Medium' ? 'text-warning' :
                      'text-error'
                    }`}>
                      {simulation.riskLevel}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {simulation.riskLevel === 'Low' ? 'Conservative' :
                       simulation.riskLevel === 'Medium' ? 'Balanced' :
                       'Aggressive'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Prediction Chart */}
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Price Prediction</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" />
                    <span>Shaded area represents confidence interval</span>
                  </div>
                </div>
                
                <div ref={chartContainerRef} className="w-full h-[300px]" />
                
                <div className="mt-4 flex items-start space-x-2 p-3 bg-muted/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Prediction Disclaimer</p>
                    <p className="text-muted-foreground">
                      This prediction is based on historical data, market sentiment, and machine learning. 
                      All investments involve risk, and past performance is not indicative of future results.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Recommendation */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">AI Recommendation</h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/10 border border-border">
                    <h3 className="font-semibold text-lg mb-2">Investment Strategy</h3>
                    <p className="text-muted-foreground">
                      {simulation.predictedReturnPercent > 0.15 ? 
                        `Strong buying opportunity with potential for significant gains over the ${simulation.timeframe}-day period. Consider allocating a portion of your portfolio to this stock.` :
                      simulation.predictedReturnPercent > 0.05 ?
                        `Moderate buy recommendation. The stock shows positive momentum with reasonable upside potential.` :
                      simulation.predictedReturnPercent > -0.05 ?
                        `Hold recommendation. The stock is expected to trade sideways with minimal price movement.` :
                      simulation.predictedReturnPercent > -0.15 ?
                        `Consider reducing position. The stock shows negative momentum and may underperform the market.` :
                        `Strong sell signal. The analysis indicates potential for significant losses in the short term.`}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/10 border border-border">
                      <h3 className="font-semibold text-lg mb-2">Technical Factors</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• {simulation.stock.prediction === 'bull' ? 'Bullish price action with positive momentum' : 
                             simulation.stock.prediction === 'short' ? 'Bearish price action with downward pressure' :
                             'Neutral price action with sideways momentum'}</li>
                        <li>• Volume {Math.random() > 0.5 ? 'above' : 'below'} average indicating {Math.random() > 0.5 ? 'strong' : 'weak'} interest</li>
                        <li>• RSI indicates {Math.random() > 0.7 ? 'overbought' : Math.random() > 0.3 ? 'neutral' : 'oversold'} conditions</li>
                        <li>• MACD showing {Math.random() > 0.5 ? 'bullish' : 'bearish'} crossover pattern</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/10 border border-border">
                      <h3 className="font-semibold text-lg mb-2">Fundamental Factors</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• P/E ratio {Math.random() > 0.5 ? 'above' : 'below'} sector average</li>
                        <li>• Revenue growth {Math.random() > 0.7 ? 'exceeding' : Math.random() > 0.3 ? 'meeting' : 'below'} analyst expectations</li>
                        <li>• Market sentiment is generally {simulation.stock.sentiment.score > 0.3 ? 'positive' : 
                                                        simulation.stock.sentiment.score < -0.3 ? 'negative' : 'neutral'}</li>
                        <li>• {Math.random() > 0.5 ? 'Strong' : 'Average'} institutional ownership patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PredictorPage;