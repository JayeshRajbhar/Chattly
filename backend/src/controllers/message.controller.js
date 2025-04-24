import Message from "../models/messages.models.js";
import User from "../models/users.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password -__v');
    // console.log('Filtered Users: ', filteredUsers);
    res.status(200).json(filteredUsers);
} catch (error) {
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ message: 'Error fetching users', error });
  }
}

export const getMessages = async (req, res) => {
  try {
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
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;
    // console.log('Sender ID: ', senderId);
    // console.log('Receiver ID: ', receiverId);
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
    // console.log('Message saved: ', response);
    res.status(200).json(response);

    const receiverSocketId = getReceiverSocketId(receiverId);
    // console.log('Receiver Socket ID: ', receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      // console.log('Socket ID found, message sent to receiver');
    }

  } catch (error) {
    console.error('Error in sendMessage controller: ', error.message);
    res.status(500).json({ message: 'Error sending message', error });
  }
} 