import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

// Initialize Express
const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Mock stock data
let mockStocks = [
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
  // Add more mock stocks here
];

// API Routes
app.get('/api/stocks', (req, res) => {
  res.json(mockStocks);
});

app.get('/api/stocks/:id', (req, res) => {
  const stock = mockStocks.find(s => s.id === req.params.id);
  if (stock) {
    res.json(stock);
  } else {
    res.status(404).json({ error: 'Stock not found' });
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send initial stock data to the client
  socket.emit('stocksUpdate', mockStocks);
  
  // Simulate real-time updates
  const updateInterval = setInterval(() => {
    // Update stock prices with small random changes
    mockStocks = mockStocks.map(stock => {
      const change = (Math.random() - 0.5) * 0.01 * stock.price;
      const newPrice = parseFloat((stock.price + change).toFixed(2));
      const newChange = parseFloat((stock.change + change).toFixed(2));
      const newChangePercent = parseFloat((stock.changePercent + (change / stock.price) * 100).toFixed(2));
      
      return {
        ...stock,
        price: newPrice,
        change: newChange,
        changePercent: newChangePercent,
        high: Math.max(stock.high, newPrice),
        low: Math.min(stock.low, newPrice)
      };
    });
    
    // Send updated stocks to all connected clients
    io.emit('stocksUpdate', mockStocks);
  }, 5000);
  
  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(updateInterval);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});