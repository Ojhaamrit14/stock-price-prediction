import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioSummary: React.FC = () => {
  // Mock portfolio data
  const portfolioData = {
    totalValue: 24750.82,
    profit: 3245.67,
    profitPercent: 15.1,
    allocation: [
      { sector: 'Technology', value: 12500.45, percentage: 50.5 },
      { sector: 'Healthcare', value: 5250.12, percentage: 21.2 },
      { sector: 'Consumer', value: 3800.25, percentage: 15.4 },
      { sector: 'Energy', value: 1700.00, percentage: 6.9 },
      { sector: 'Other', value: 1500.00, percentage: 6.0 },
    ]
  };

  // Chart configuration
  const chartData = {
    labels: portfolioData.allocation.map(item => item.sector),
    datasets: [
      {
        data: portfolioData.allocation.map(item => item.percentage),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // primary
          'rgba(16, 185, 129, 0.7)', // success
          'rgba(239, 68, 68, 0.7)',  // error
          'rgba(249, 115, 22, 0.7)', // orange
          'rgba(124, 58, 237, 0.7)', // purple
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(124, 58, 237, 1)',
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
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Portfolio</h2>
        <button className="text-sm text-primary font-medium">View All</button>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-muted-foreground text-xs">Total Value</p>
          <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs">Profit/Loss</p>
          <p className="text-lg font-semibold text-success">
            +${portfolioData.profit.toLocaleString()} ({portfolioData.profitPercent}%)
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 my-4">
        <div className="w-32 h-32 relative">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm font-medium">Allocation</p>
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 gap-2">
            {portfolioData.allocation.map((item, index) => (
              <div key={item.sector} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] as string }}
                  />
                  <span className="text-sm">{item.sector}</span>
                </div>
                <div className="text-sm font-medium">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button className="btn-outline w-full mt-2">View Portfolio</button>
    </div>
  );
};

export default PortfolioSummary;