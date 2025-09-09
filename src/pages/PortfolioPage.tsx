import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Plus, Trash2, RefreshCw, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { StockData, Portfolio, PortfolioStock } from '../types/stock';

// Reuse the mock stocks
const availableStocks = [
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
  },
  {
    id: '8',
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 152.75,
    change: 1.08,
    changePercent: 0.71,
    open: 151.67,
    high: 153.12,
    low: 151.30,
    volume: 7865000,
    marketCap: 367500000000,
    sector: 'Healthcare',
    prediction: 'bull',
    sentiment: { score: 0.4, news: [] }
  },
  {
    id: '9',
    symbol: 'PFE',
    name: 'Pfizer Inc.',
    price: 27.42,
    change: -0.34,
    changePercent: -1.23,
    open: 27.76,
    high: 27.89,
    low: 27.35,
    volume: 41250000,
    marketCap: 155300000000,
    sector: 'Healthcare',
    prediction: 'neutral',
    sentiment: { score: -0.1, news: [] }
  },
  {
    id: '10',
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    price: 113.52,
    change: 1.83,
    changePercent: 1.64,
    open: 111.69,
    high: 113.78,
    low: 111.45,
    volume: 18720000,
    marketCap: 467200000000,
    sector: 'Energy',
    prediction: 'bull',
    sentiment: { score: 0.3, news: [] }
  }
] as StockData[];

// Initial portfolio setup with some example stocks
const initialPortfolio: Portfolio = {
  stocks: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 20,
      avgPrice: 175.45,
      currentPrice: 189.30,
      value: 3786.00,
      profit: 277.00,
      profitPercent: 7.89
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 10,
      avgPrice: 390.20,
      currentPrice: 410.34,
      value: 4103.40,
      profit: 201.40,
      profitPercent: 5.16
    },
    {
      id: '6',
      symbol: 'META',
      name: 'Meta Platforms, Inc.',
      shares: 15,
      avgPrice: 450.30,
      currentPrice: 472.96,
      value: 7094.40,
      profit: 339.90,
      profitPercent: 5.03
    }
  ],
  totalValue: 14983.80,
  totalProfit: 818.30,
  totalProfitPercent: 5.77
};

interface AddStockFormData {
  stockId: string;
  shares: number;
  purchasePrice: number;
}

const PortfolioPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<AddStockFormData>({
    stockId: availableStocks[0].id,
    shares: 1,
    purchasePrice: availableStocks[0].price
  });
  
  // Calculate sectors for the chart
  const sectorAllocation = portfolio.stocks.reduce((acc, stock) => {
    const stockInfo = availableStocks.find(s => s.id === stock.id);
    if (stockInfo) {
      const sector = stockInfo.sector;
      if (!acc[sector]) {
        acc[sector] = 0;
      }
      acc[sector] += stock.value;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Prepare chart data
  const chartData = {
    labels: Object.keys(sectorAllocation),
    datasets: [
      {
        data: Object.values(sectorAllocation),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // primary - blue
          'rgba(16, 185, 129, 0.7)', // green
          'rgba(239, 68, 68, 0.7)',  // red
          'rgba(249, 115, 22, 0.7)', // orange
          'rgba(124, 58, 237, 0.7)', // purple
          'rgba(236, 72, 153, 0.7)', // pink
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(124, 58, 237, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'stockId') {
      const selectedStock = availableStocks.find(stock => stock.id === value);
      setFormData({
        ...formData,
        stockId: value,
        purchasePrice: selectedStock ? selectedStock.price : 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    }
  };
  
  // Handle form submission
  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedStock = availableStocks.find(stock => stock.id === formData.stockId);
    
    if (selectedStock && formData.shares > 0 && formData.purchasePrice > 0) {
      // Check if stock already exists in portfolio
      const existingStockIndex = portfolio.stocks.findIndex(stock => stock.id === selectedStock.id);
      
      if (existingStockIndex >= 0) {
        // Update existing stock
        const updatedStocks = [...portfolio.stocks];
        const existingStock = updatedStocks[existingStockIndex];
        
        const totalShares = existingStock.shares + formData.shares;
        const totalValue = existingStock.value + (formData.shares * formData.purchasePrice);
        const newAvgPrice = totalValue / totalShares;
        
        updatedStocks[existingStockIndex] = {
          ...existingStock,
          shares: totalShares,
          avgPrice: newAvgPrice,
          value: totalShares * selectedStock.price,
          profit: (selectedStock.price - newAvgPrice) * totalShares,
          profitPercent: ((selectedStock.price - newAvgPrice) / newAvgPrice) * 100
        };
        
        updatePortfolio(updatedStocks);
      } else {
        // Add new stock
        const value = formData.shares * selectedStock.price;
        const profit = (selectedStock.price - formData.purchasePrice) * formData.shares;
        const profitPercent = ((selectedStock.price - formData.purchasePrice) / formData.purchasePrice) * 100;
        
        const newStock: PortfolioStock = {
          id: selectedStock.id,
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          shares: formData.shares,
          avgPrice: formData.purchasePrice,
          currentPrice: selectedStock.price,
          value,
          profit,
          profitPercent
        };
        
        updatePortfolio([...portfolio.stocks, newStock]);
      }
      
      // Reset form
      setFormData({
        stockId: availableStocks[0].id,
        shares: 1,
        purchasePrice: availableStocks[0].price
      });
      setShowAddForm(false);
    }
  };
  
  // Remove stock from portfolio
  const handleRemoveStock = (stockId: string) => {
    const updatedStocks = portfolio.stocks.filter(stock => stock.id !== stockId);
    updatePortfolio(updatedStocks);
  };
  
  // Update portfolio totals
  const updatePortfolio = (stocks: PortfolioStock[]) => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
    const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.avgPrice * stock.shares), 0);
    const totalProfit = totalValue - totalInvestment;
    const totalProfitPercent = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
    
    setPortfolio({
      stocks,
      totalValue,
      totalProfit,
      totalProfitPercent
    });
  };
  
  // Simulate periodic price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stock prices with small random changes
      availableStocks.forEach(stock => {
        const change = (Math.random() - 0.5) * 0.01 * stock.price;
        stock.price = parseFloat((stock.price + change).toFixed(2));
        stock.change = parseFloat((stock.change + change).toFixed(2));
        stock.changePercent = parseFloat((stock.changePercent + (change / stock.price) * 100).toFixed(2));
      });
      
      // Update portfolio with new prices
      if (portfolio.stocks.length > 0) {
        const updatedStocks = portfolio.stocks.map(portfolioStock => {
          const stockInfo = availableStocks.find(s => s.id === portfolioStock.id);
          if (stockInfo) {
            const value = portfolioStock.shares * stockInfo.price;
            const profit = (stockInfo.price - portfolioStock.avgPrice) * portfolioStock.shares;
            const profitPercent = ((stockInfo.price - portfolioStock.avgPrice) / portfolioStock.avgPrice) * 100;
            
            return {
              ...portfolioStock,
              currentPrice: stockInfo.price,
              value,
              profit,
              profitPercent
            };
          }
          return portfolioStock;
        });
        
        updatePortfolio(updatedStocks);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [portfolio]);
  
  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Portfolio Simulator
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Track your investments, analyze performance, and visualize your portfolio allocation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-12"
        >
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-6">Portfolio Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-3xl font-bold">${portfolio.totalValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
                    <div className={`flex items-center ${portfolio.totalProfit >= 0 ? 'text-success' : 'text-error'}`}>
                      {portfolio.totalProfit >= 0 ? (
                        <TrendingUp className="h-5 w-5 mr-1" />
                      ) : (
                        <TrendingDown className="h-5 w-5 mr-1" />
                      )}
                      <p className="text-xl font-bold">
                        {portfolio.totalProfit >= 0 ? '+' : ''}{portfolio.totalProfit.toFixed(2)} ({portfolio.totalProfitPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-primary w-full flex items-center justify-center"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-6">Top Holdings</h2>
                <div className="space-y-3">
                  {portfolio.stocks
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3)
                    .map(stock => (
                      <div key={stock.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.shares} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${stock.value.toFixed(2)}</p>
                          <p className={`text-xs ${stock.profit >= 0 ? 'text-success' : 'text-error'}`}>
                            {stock.profit >= 0 ? '+' : ''}{stock.profit.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <h2 className="text-xl font-bold mb-6">Sector Allocation</h2>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-40 h-40 relative">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm font-medium">Allocation</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(sectorAllocation).map(([sector, value], index) => {
                        const percentage = (value / portfolio.totalValue) * 100;
                        return (
                          <div key={sector} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div 
                                className="h-3 w-3 rounded-full mr-2" 
                                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] as string }}
                              />
                              <span className="text-sm">{sector}</span>
                            </div>
                            <div className="text-sm font-medium">{percentage.toFixed(1)}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Portfolio Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-12"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Portfolio Holdings</h2>
              <button className="btn-outline flex items-center text-sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/30">
                  <tr>
                    <th scope="col" className="py-3 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                    <th scope="col" className="py-3 px-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Shares</th>
                    <th scope="col" className="py-3 px-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Price</th>
                    <th scope="col" className="py-3 px-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Price</th>
                    <th scope="col" className="py-3 px-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                    <th scope="col" className="py-3 px-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Profit/Loss</th>
                    <th scope="col" className="py-3 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {portfolio.stocks.map(stock => (
                    <tr key={stock.id} className="hover:bg-muted/10 transition-colors duration-150">
                      <td className="py-4 pl-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-md bg-primary/10 text-primary mr-3">
                            {stock.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-right">
                        <span className="font-mono">{stock.shares}</span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-right">
                        <span className="font-mono">${stock.avgPrice.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-right">
                        <span className="font-mono">${stock.currentPrice.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-right">
                        <span className="font-medium font-mono">${stock.value.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap text-right">
                        <div className={`flex items-center justify-end ${stock.profit >= 0 ? 'text-success' : 'text-error'}`}>
                          {stock.profit >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium font-mono">
                            {stock.profit >= 0 ? '+' : ''}{stock.profit.toFixed(2)} ({stock.profitPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 whitespace-nowrap text-right">
                        <button
                          className="p-1.5 rounded-md text-muted-foreground hover:text-error hover:bg-error/10 transition-colors duration-150"
                          onClick={() => handleRemoveStock(stock.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {portfolio.stocks.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <BarChart3 className="h-12 w-12 mb-2 text-muted" />
                          <p>No stocks in your portfolio yet</p>
                          <button
                            className="mt-4 btn-primary flex items-center justify-center"
                            onClick={() => setShowAddForm(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Stock
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Add Stock Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity"
              onClick={() => setShowAddForm(false)}
            ></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative transform overflow-hidden rounded-lg bg-card text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Add Stock to Portfolio</h3>
                
                <form onSubmit={handleAddStock}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="stockId" className="block text-sm font-medium text-foreground mb-1">
                        Select Stock
                      </label>
                      <select
                        id="stockId"
                        name="stockId"
                        className="input"
                        value={formData.stockId}
                        onChange={handleInputChange}
                        required
                      >
                        {availableStocks.map(stock => (
                          <option key={stock.id} value={stock.id}>
                            {stock.symbol} - {stock.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="shares" className="block text-sm font-medium text-foreground mb-1">
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        id="shares"
                        name="shares"
                        className="input"
                        value={formData.shares}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="purchasePrice" className="block text-sm font-medium text-foreground mb-1">
                        Purchase Price per Share ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                          type="number"
                          id="purchasePrice"
                          name="purchasePrice"
                          className="input pl-9"
                          value={formData.purchasePrice}
                          onChange={handleInputChange}
                          min="0.01"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="rounded-md bg-muted/20 p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Total Investment:</span>
                          <span className="text-sm font-medium">
                            ${(formData.shares * formData.purchasePrice).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current Market Value:</span>
                          <span className="text-sm font-medium">
                            ${(formData.shares * (availableStocks.find(s => s.id === formData.stockId)?.price || 0)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Add to Portfolio
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;