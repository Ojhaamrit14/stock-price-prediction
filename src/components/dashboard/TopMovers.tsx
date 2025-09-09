import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  prediction: 'bull' | 'neutral' | 'short';
}

const TopMovers: React.FC = () => {
  // Mock data for top gainers and losers
  const topGainers: StockMover[] = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28, change: 32.76, changePercent: 3.89, prediction: 'bull' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 410.34, change: 12.87, changePercent: 3.24, prediction: 'bull' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 5.23, changePercent: 2.84, prediction: 'bull' },
    { symbol: 'GOOG', name: 'Alphabet Inc.', price: 152.18, change: 3.45, changePercent: 2.32, prediction: 'neutral' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', price: 472.96, change: 9.84, changePercent: 2.13, prediction: 'bull' },
  ];

  const topLosers: StockMover[] = [
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: 572.40, change: -19.83, changePercent: -3.35, prediction: 'short' },
    { symbol: 'PYPL', name: 'PayPal Holdings, Inc.', price: 63.82, change: -1.89, changePercent: -2.87, prediction: 'short' },
    { symbol: 'UBER', name: 'Uber Technologies, Inc.', price: 67.38, change: -1.73, changePercent: -2.51, prediction: 'neutral' },
    { symbol: 'DIS', name: 'The Walt Disney Company', price: 111.45, change: -2.36, changePercent: -2.07, prediction: 'short' },
    { symbol: 'ADBE', name: 'Adobe Inc.', price: 546.78, change: -10.23, changePercent: -1.84, prediction: 'neutral' },
  ];

  const renderStockItem = (stock: StockMover) => {
    const isPositive = stock.change > 0;
    const changeClass = isPositive ? 'text-success' : 'text-error';
    
    const predictionBadge = {
      bull: 'bg-success/10 text-success border-success/20',
      neutral: 'bg-warning/10 text-warning border-warning/20',
      short: 'bg-error/10 text-error border-error/20',
    };

    const predictionLabel = {
      bull: 'Bull',
      neutral: 'Neutral',
      short: 'Short',
    };

    return (
      <tr key={stock.symbol} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors duration-150">
        <td className="py-3 pl-4">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-md bg-primary/10">
              {stock.symbol.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-muted-foreground">{stock.name}</div>
            </div>
          </div>
        </td>
        <td className="py-3 text-right">${stock.price.toFixed(2)}</td>
        <td className={`py-3 text-right ${changeClass}`}>
          <div className="flex items-center justify-end">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {stock.changePercent.toFixed(2)}%
          </div>
        </td>
        <td className="py-3 pr-4 text-right">
          <span className={`text-xs px-2 py-1 rounded-full border ${predictionBadge[stock.prediction]}`}>
            {predictionLabel[stock.prediction]}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Top Movers</h2>
        <div className="flex space-x-2">
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center text-success">
            <TrendingUp className="h-4 w-4 mr-1" /> Top Gainers
          </h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/30">
                <tr>
                  <th scope="col" className="py-3 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Change</th>
                  <th scope="col" className="py-3 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Signal</th>
                </tr>
              </thead>
              <tbody>
                {topGainers.map(renderStockItem)}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 flex items-center text-error">
            <TrendingDown className="h-4 w-4 mr-1" /> Top Losers
          </h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/30">
                <tr>
                  <th scope="col" className="py-3 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Change</th>
                  <th scope="col" className="py-3 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Signal</th>
                </tr>
              </thead>
              <tbody>
                {topLosers.map(renderStockItem)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovers;