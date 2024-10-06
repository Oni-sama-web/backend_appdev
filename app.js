const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const logger = require('./middleware/loggerMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
