import Message from "../models/messages.models.js";
import User from "../models/users.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password -__v');
    res.status(200).json(filteredUsers);
} catch (error) {
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ message: 'Error fetching users', error });
  }
}

export const getMessages = async (req, res) => {
  try {
    if (!req.params.id) {
      console.error('ID parameter is missing in getMessages controller');
      return res.status(400).json({ message: 'ID parameter is required' });
    }
    const { id:userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatId },
        { sender: userToChatId, receiver: senderId }
      ]
    })
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error in getMessages controller: ', error.message);
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

export const sendMessage = async (req, res) => {
  try {
    if (!req.params.id) {
      console.error('ID parameter is missing in sendMessage controller');
      return res.status(400).json({ message: 'ID parameter is required' });
    }
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl,
    });

    const response = await newMessage.save();
    res.status(200).json(response);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

  } catch (error) {
    console.error('Error in sendMessage controller: ', error.message);
    res.status(500).json({ message: 'Error sending message', error });
  }
} 