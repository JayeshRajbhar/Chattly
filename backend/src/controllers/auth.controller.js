import { generateToken } from '../lib/utils.js';
import User from '../models/users.models.js';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        if(!email || !fullName || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            const tokenValue = generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                token: tokenValue
            });
        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in signup controller: ", error.message);
    }
}   

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const userCheck = await User.findOne({email});
        if(!userCheck) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const passwordCheck = await bcrypt.compare(password, userCheck.password);
        if(!passwordCheck) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const tokenValue = generateToken(userCheck._id, res);
        if(userCheck && passwordCheck) {
            res.status(200).json({
                _id: userCheck._id,
                fullName: userCheck.fullName,
                email: userCheck.email,
                profilepic: userCheck.profilepic,
                token: tokenValue
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in login controller: ", error.message);   
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({message: 'User logged out successfully'});
    console.log("User logged out successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in logout controller: ", error.message);
    }
    
}

export const updateProfilePic = async (req, res) => {
    const {profilepic} = req.body;
    const userId = req.user._id;
    try {
        
        if(!profilepic) {
            return res.status(400).json({message: 'Profile picture is required'});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic) 
        const userUpdate = await User.findByIdAndUpdate(userId,{profilepic: uploadResponse.secure_url}, {new: true});
        await User.save();
        res.status(200).json(userUpdate);
        console.log("Profile picture updated successfully");
    }
    catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in updateProfilePic controller: ", error.message);
    }   
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
        console.log("User authenticated successfully", req.user);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in checkAuth controller: ", error.message);
    }
}