const jwt = require('jsonwebtoken');
const UserModel = require('../model/user_model');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                message: 'Access token is required', 
                status: false 
            });
        }

        const secretKey = process.env.JWT_SECRET || 'your-secret-key';
        
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ 
                    message: 'Invalid or expired token', 
                    status: false 
                });
            }

            try {
                // Verify user still exists in database
                const user = await UserModel.findById(decoded.userId);
                if (!user) {
                    return res.status(401).json({ 
                        message: 'User not found', 
                        status: false 
                    });
                }

                req.user = decoded;
                next();
            } catch (error) {
                console.error('Error verifying user:', error);
                return res.status(500).json({ 
                    message: 'Internal server error', 
                    status: false 
                });
            }
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ 
            message: 'Internal server error', 
            status: false 
        });
    }
};

module.exports = { authenticateToken }; 