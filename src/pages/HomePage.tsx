import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, AlertCircle, BarChart4, LineChart, Briefcase } from 'lucide-react';
import MarketOverview from '../components/dashboard/MarketOverview';
import TopMovers from '../components/dashboard/TopMovers';
import PredictionSummary from '../components/dashboard/PredictionSummary';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const HomePage: React.FC = () => {
  return (
    <div className="py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold tracking-tight text-foreground mb-2"
        >
          Welcome to StockSense
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-muted-foreground max-w-3xl"
        >
          Real-time market insights with AI-powered predictions to help you make informed investment decisions.
        </motion.p>
      </motion.div>

      {/* Market Status Indicators */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants} className="card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-success/20 text-success mr-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-success">MARKET STATUS</p>
              <h3 className="text-2xl font-bold text-card-foreground">Bullish</h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Overall market sentiment is positive</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary/20 text-primary mr-4">
              <BarChart4 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">S&P 500</p>
              <h3 className="text-2xl font-bold text-card-foreground">4,854.63</h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-success">+24.18 (+0.49%)</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-accent/20 text-accent mr-4">
              <BarChart4 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-accent">NASDAQ</p>
              <h3 className="text-2xl font-bold text-card-foreground">15,630.78</h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-success">+172.68 (+1.12%)</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-warning/20 text-warning mr-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-warning">VOLATILITY INDEX</p>
              <h3 className="text-2xl font-bold text-card-foreground">18.27</h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-error">+1.45 (+8.62%)</p>
        </motion.div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <MarketOverview />
          <TopMovers />
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-8">
          <PredictionSummary />
          <PortfolioSummary />
          
          {/* Quick Links */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/live" className="btn-primary w-full flex items-center justify-center">
                <LineChart className="h-4 w-4 mr-2" />
                <span>Live Market Tracker</span>
              </Link>
              <Link to="/predict" className="btn-secondary w-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Stock Predictor</span>
              </Link>
              <Link to="/portfolio" className="btn-outline w-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Portfolio Simulator</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;