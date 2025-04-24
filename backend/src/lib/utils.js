import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token; 
}