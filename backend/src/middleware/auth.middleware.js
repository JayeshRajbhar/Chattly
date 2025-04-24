import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';

const protectRoute = async (req, res, next) => {
    
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized, invalid token' });
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized, token failed' });
        console.error("Error in protectRoute middleware: ", error.message);
    }
}

export default protectRoute;