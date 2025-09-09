import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';

const MarketOverview: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create a new chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#334155',
      },
      grid: {
        vertLines: { color: document.documentElement.classList.contains('dark') ? 'rgba(70, 70, 70, 0.2)' : 'rgba(220, 220, 220, 0.8)' },
        horzLines: { color: document.documentElement.classList.contains('dark') ? 'rgba(70, 70, 70, 0.2)' : 'rgba(220, 220, 220, 0.8)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Add area series
    const areaSeries = chart.addAreaSeries({
      topColor: document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.4)',
      bottomColor: document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
      lineColor: document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)',
      lineWidth: 2,
    });

    // Generate 90 days of mock S&P 500 data
    const mockData = generateMockMarketData(90);
    areaSeries.setData(mockData);

    // Set up resize observer for responsive chart
    const resizeObserver = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      if (chartRef.current) {
        chartRef.current.applyOptions({ width });
      }
    });

    resizeObserver.observe(chartContainerRef.current);
    resizeObserverRef.current = resizeObserver;

    // Cleanup function
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      
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
  }, []);

  // Function to generate mock market data
  const generateMockMarketData = (days: number) => {
    const data = [];
    let value = 4500; // Starting value
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(now.getDate() - (days - i));
      
      // Add some random movement to simulate real market data
      const change = (Math.random() - 0.48) * 50; // Slightly biased toward growth
      value += change;
      value = Math.max(value, 4000); // Set a floor
      
      data.push({
        time: Math.floor(date.getTime() / 1000) as Time,
        value: value,
      });
    }
    
    return data;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Market Overview</h2>
        <div className="text-sm text-success font-semibold">+5.3% (30d)</div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[300px]" />
    </div>
  );
};

export default MarketOverview;