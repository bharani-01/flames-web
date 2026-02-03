const express = require('express');
const path = require('path');
const FlamesCalculator = require('./flames');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize FLAMES calculator
const calculator = new FlamesCalculator();

// API endpoint to calculate FLAMES
app.post('/api/calculate', (req, res) => {
  try {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
      return res.status(400).json({
        success: false,
        error: 'Both names are required'
      });
    }

    const result = calculator.calculate(name1, name2);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🔥 FLAMES Calculator Server Running! 🔥`);
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
  });
}

// Export for Vercel
module.exports = app;
