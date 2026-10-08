require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 DevPulse Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  });
});
