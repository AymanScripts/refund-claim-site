import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { setAuthRoutes } from './routes/authRoutes';
import { setRefundRoutes } from './routes/refundRoutes';
import { initializeDatabase } from './database/index';
import { authMiddleware } from './middleware/authMiddleware';

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

// Routes
setAuthRoutes(app);
setRefundRoutes(app);

// Protected routes
app.use(authMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});