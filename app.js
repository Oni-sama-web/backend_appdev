const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const logger = require('./middleware/loggerMiddleware');

const app = express();

// This part is for Middleware Part
app.use(bodyParser.json());
app.use(logger);

// Routes Part
app.use('/api/user', userRoutes); //Use the routes defined in routes/user.js for handling user-related requests

// Start server on port 3000 or environment-defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
