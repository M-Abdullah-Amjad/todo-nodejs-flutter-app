const UserServices = require("../services/user_services");

exports.register = async(req,res,next) => {
    try{
        const { email, password } = req.body;

        const user = await UserServices.registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user ,status: true});
        
    }catch(error){
        console.error('Error in user registration controller:', error);
        res.status(500).json({ message: 'Internal server error',error: error.message, status: false });
    }
}


exports.login = async(req,res,next) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required', 
                status: false 
            });
        }

        const user = await UserServices.loginUser(email, password);
        
        // Generate JWT token
        const tokenData = {
            userId: user._id,
            email: user.email
        };
        
        const secretKey = process.env.JWT_SECRET || 'your-secret-key';
        const jwtExpire = process.env.JWT_EXPIRE || '24h';
        
        const token = await UserServices.generateToken(tokenData, secretKey, jwtExpire);
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                email: user.email
            },
            token,
            status: true
        });
        
    }catch(error){
        console.error('Error in login controller:', error);
        
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).json({ 
                message: 'Invalid email or password', 
                status: false 
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message, 
            status: false 
        });
    }
}