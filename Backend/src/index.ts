const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './properties.env' });
import sequelize from './database';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Start server
app.listen(port, () => {
    console.log("Server is running at http://localhost:${port}");
});

export default app;