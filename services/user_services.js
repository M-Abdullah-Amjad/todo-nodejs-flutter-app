const UserModel = require("../model/user_model");
const jwt = require('jsonwebtoken');

class UserServices{
    static async registerUser(email, password){
        try{
            const createUser = new UserModel({email, password});
            return await createUser.save();
        }catch(error){
            console.error('Error registering user:', error);
            throw new Error('User registration failed');
        }
    }

    static async checkUser(email){
        try{
            return await UserModel.findOne({email});
        }catch(error){
            console.error('Error checking user:', error);
            throw new Error('User check failed');
        }
    }

    static async loginUser(email, password){
        try{
            const user = await UserModel.findOne({email});
            if (!user) {
                throw new Error('User not found');
            }
            
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            
            return user;
        }catch(error){
            console.error('Error in login user service:', error);
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

}

module.exports = UserServices;