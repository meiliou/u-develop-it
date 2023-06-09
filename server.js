const db = require('./db/database');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Default response for any other request(Not Found) Catch all other
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});