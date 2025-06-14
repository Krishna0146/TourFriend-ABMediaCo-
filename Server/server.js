// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Your frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection (replace with your connection string) ,the mongoDB connection string should be kept secure and not hardcoded in production
mongoose.connect('mongodb+srv://krishna:1710800@cluster0.xjo2wzd.mongodb.net/TourFriend?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Destination Schema
const destinationSchema = new mongoose.Schema({
  name: String,
  country: String,
  image: String,
  rating: Number,
  reviewCount: Number,
  description: String,
  price: Number,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now }
});

// Tour Package Schema
const packageSchema = new mongoose.Schema({
  title: String,
  destination: String,
  duration: String,
  price: Number,
  originalPrice: Number,
  image: String,
  rating: Number,
  reviewCount: Number,
  highlights: [String],
  category: String,
  featured: Boolean,
  salesCount: Number,
  createdAt: { type: Date, default: Date.now }
});

const Destination = mongoose.model('Destination', destinationSchema);
const Package = mongoose.model('Package', packageSchema);

// Mock data for destinations
const mockDestinations = [
  {
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    rating: 4.8,
    reviewCount: 2847,
    description: "Beautiful beaches and vibrant nightlife",
    price: 15000,
    featured: true
  },
  {
    name: "Kerala",
    country: "India", 
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    rating: 4.9,
    reviewCount: 1923,
    description: "God's own country with backwaters",
    price: 18000,
    featured: true
  },
  {
    name: "Rajasthan",
    country: "India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    rating: 4.7,
    reviewCount: 3156,
    description: "Royal palaces and desert adventures",
    price: 22000,
    featured: true
  },
  {
    name: "Himachal Pradesh",
    country: "India",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    rating: 4.8,
    reviewCount: 2134,
    description: "Mountain paradise with snow peaks",
    price: 20000,
    featured: true
  },
  {
    name: "Uttarakhand",
    country: "India",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    rating: 4.6,
    reviewCount: 1567,
    description: "Spiritual retreats and mountain treks",
    price: 17000,
    featured: true
  },
  {
    name: "Tamil Nadu",
    country: "India",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    rating: 4.5,
    reviewCount: 1890,
    description: "Ancient temples and cultural heritage",
    price: 16000,
    featured: true
  }
];

// Mock data for packages
const mockPackages = [
  {
    title: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "6 Days 5 Nights",
    price: 25000,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    rating: 4.9,
    reviewCount: 456,
    highlights: ["Taj Mahal Visit", "Red Fort", "Hawa Mahal", "City Palace"],
    category: "Cultural",
    featured: true,
    salesCount: 1247
  },
  {
    title: "Kashmir Valley Explorer",
    destination: "Srinagar-Gulmarg-Pahalgam",
    duration: "7 Days 6 Nights",
    price: 35000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    rating: 4.8,
    reviewCount: 328,
    highlights: ["Dal Lake", "Gulmarg Gondola", "Betaab Valley", "Shalimar Garden"],
    category: "Adventure",
    featured: true,
    salesCount: 892
  },
  {
    title: "Goa Beach Paradise",
    destination: "North & South Goa",
    duration: "5 Days 4 Nights",
    price: 18000,
    originalPrice: 24000,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    rating: 4.7,
    reviewCount: 623,
    highlights: ["Baga Beach", "Dudhsagar Falls", "Spice Plantation", "Cruise Party"],
    category: "Beach",
    featured: true,
    salesCount: 1563
  },
  {
    title: "Kerala Backwaters",
    destination: "Kochi-Munnar-Alleppey",
    duration: "6 Days 5 Nights",
    price: 28000,
    originalPrice: 35000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    rating: 4.9,
    reviewCount: 445,
    highlights: ["Houseboat Stay", "Tea Gardens", "Spice Markets", "Kathakali Show"],
    category: "Nature",
    featured: true,
    salesCount: 1098
  },
  {
    title: "Rajasthan Royal Experience",
    destination: "Jaipur-Udaipur-Jodhpur",
    duration: "8 Days 7 Nights",
    price: 45000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    rating: 4.8,
    reviewCount: 287,
    highlights: ["City Palace", "Lake Pichola", "Mehrangarh Fort", "Desert Safari"],
    category: "Heritage",
    featured: true,
    salesCount: 734
  },
  {
    title: "Ladakh Adventure",
    destination: "Leh-Nubra-Pangong",
    duration: "9 Days 8 Nights",
    price: 38000,
    originalPrice: 48000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    rating: 4.6,
    reviewCount: 198,
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La", "Monasteries"],
    category: "Adventure",
    featured: true,
    salesCount: 567
  }
];

// Initialize database with mock data
const initializeDatabase = async () => {
  try {
    const destinationCount = await Destination.countDocuments();
    const packageCount = await Package.countDocuments();
    
    if (destinationCount === 0) {
      await Destination.insertMany(mockDestinations);
      console.log('Mock destinations inserted');
    }
    
    if (packageCount === 0) {
      await Package.insertMany(mockPackages);
      console.log('Mock packages inserted');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// API Routes

// Get popular destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find({ featured: true })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: destinations,
      message: 'Destinations fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destinations',
      error: error.message
    });
  }
});

// Get top-selling tour packages
app.get('/api/packages/top-selling', async (req, res) => {
  try {
    const packages = await Package.find({ featured: true })
      .sort({ salesCount: -1, rating: -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: packages,
      message: 'Top-selling packages fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB and start server
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  initializeDatabase();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;