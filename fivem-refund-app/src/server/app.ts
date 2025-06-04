import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { setAuthRoutes } from './routes/authRoutes';
import { setRefundRoutes } from './routes/refundRoutes';
import { setUserRoutes } from './routes/userRoutes';
import { initializeDatabase } from './database/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize database
initializeDatabase();

// Set up routes
setAuthRoutes(app);
setRefundRoutes(app);
setUserRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});