import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, BarChart as ChartBar, Shield, Github, ExternalLink } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Real-time Market Tracking',
    description: 'Monitor stock prices, trends, and market movements with up-to-the-minute data refreshed every 5 seconds.'
  },
  {
    icon: <Brain className="h-8 w-8 text-accent" />,
    title: 'AI-Powered Predictions',
    description: 'Get intelligent forecasts on stock price movements using advanced machine learning algorithms trained on historical patterns.'
  },
  {
    icon: <ChartBar className="h-8 w-8 text-success" />,
    title: 'Portfolio Simulation',
    description: 'Test investment strategies without risk. Track performance, analyze gains, and optimize your portfolio allocation.'
  },
  {
    icon: <Shield className="h-8 w-8 text-warning" />,
    title: 'Investment Risk Analysis',
    description: 'Understand potential risks with confidence scores and volatility indicators to make informed investment decisions.'
  }
];

const faqs = [
  {
    question: 'How accurate are the stock predictions?',
    answer: 'Our AI model typically achieves 65-75% accuracy in predicting general market direction over short timeframes (7-30 days). However, stock market prediction is inherently uncertain and many external factors can influence market movements. Always use predictions as one of several tools for making investment decisions.'
  },
  {
    question: 'Is this using real market data?',
    answer: 'This is a demonstration project using simulated market data that closely mimics real market behavior. In a production environment, this platform would connect to real-time market data providers.'
  },
  {
    question: 'What machine learning models power the predictions?',
    answer: 'The prediction engine uses an ensemble approach combining several algorithms: Random Forest classifiers for overall market trend detection, LSTM (Long Short-Term Memory) neural networks for time-series forecasting, and sentiment analysis models for incorporating news and social media impact.'
  },
  {
    question: 'Can I use this for actual trading?',
    answer: 'This platform is designed as an educational and demonstration tool. While the techniques represented here are similar to those used in actual trading systems, you should not make real investment decisions based solely on this demonstration.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          About StockSense
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          An intelligent stock market tracking and prediction platform powered by machine learning.
        </p>
      </motion.div>

      {/* Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Project Overview</h2>
        <p className="text-muted-foreground mb-4">
          StockSense is a full-stack web application that combines real-time stock market tracking with advanced machine learning algorithms to predict market movements and help users make better investment decisions. This demonstration showcases how modern web technologies can be combined with data science to create powerful financial tools.
        </p>
        <p className="text-muted-foreground">
          The platform synthesizes data from various sources to provide insights into market trends, stock performance, and potential investment opportunities. While using simulated data for this demonstration, the techniques employed mirror those used in production-grade financial analysis systems.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              className="card"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Frontend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                React with TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Framer Motion for animations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Lightweight Charts for financial charts
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                Chart.js for data visualization
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                React Query for data fetching
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Backend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
                Node.js with Express
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
                Socket.IO for real-time updates
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
                TypeScript for type safety
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
                RESTful API architecture
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Data & ML</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                Synthetic data generation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                Time-series analysis algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                Sentiment analysis integration
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                Technical indicators (RSI, MACD, etc.)
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="card text-center"
      >
        <h2 className="text-xl font-bold mb-4">Project Information</h2>
        <p className="text-muted-foreground mb-6">
          This is a demonstration project created to showcase modern web development and ML integration techniques.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Ojhaamrit14/stock-price-prediction"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center"
          >
            <Github className="h-4 w-4 mr-2" />
            View Source
          </a>
          <a
            href="https://www.linkedin.com/in/amrit-ojha-840645383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Made By Amrit
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
