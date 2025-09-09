import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionItem {
  symbol: string;
  name: string;
  prediction: 'bull' | 'neutral' | 'short';
  confidence: number;
  recommendation: string;
}

const PredictionSummary: React.FC = () => {
  const predictions: PredictionItem[] = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      prediction: 'bull', 
      confidence: 0.87, 
      recommendation: 'Strong Buy' 
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp', 
      prediction: 'bull', 
      confidence: 0.82, 
      recommendation: 'Buy' 
    },
    { 
      symbol: 'NFLX', 
      name: 'Netflix Inc', 
      prediction: 'short', 
      confidence: 0.79, 
      recommendation: 'Strong Sell' 
    },
    { 
      symbol: 'GOOG', 
      name: 'Alphabet Inc', 
      prediction: 'neutral', 
      confidence: 0.65, 
      recommendation: 'Hold' 
    },
  ];

  const renderPredictionIcon = (prediction: 'bull' | 'neutral' | 'short') => {
    if (prediction === 'bull') {
      return <TrendingUp className="h-5 w-5 text-success" />;
    } else if (prediction === 'short') {
      return <TrendingDown className="h-5 w-5 text-error" />;
    } else {
      return <Minus className="h-5 w-5 text-warning" />;
    }
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-success';
    if (confidence >= 0.6) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">AI Predictions</h2>
        <button className="text-sm text-primary font-medium">View All</button>
      </div>
      
      <div className="space-y-4">
        {predictions.map(item => (
          <div key={item.symbol} className="p-3 border border-border rounded-lg hover:bg-muted/10 transition-colors duration-150">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-primary/10 text-primary mr-3">
                  {item.symbol.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{item.symbol}</div>
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                </div>
              </div>
              {renderPredictionIcon(item.prediction)}
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Confidence</span>
                <span className="font-medium">{Math.round(item.confidence * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getConfidenceBarColor(item.confidence)} rounded-full`} 
                  style={{ width: `${item.confidence * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-muted-foreground">Recommendation</span>
              <span className={`text-xs font-medium ${
                item.recommendation.includes('Buy') ? 'text-success' : 
                item.recommendation.includes('Sell') ? 'text-error' : 'text-warning'
              }`}>
                {item.recommendation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionSummary;