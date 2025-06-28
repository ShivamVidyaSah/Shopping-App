import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  subject: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // null for guest viewers
  },

  role: {
    type: String,
    enum: ['Customer', 'Admin', 'Guest'],
    default: 'Guest',
  },

  isReplied: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  repliedAt: {
    type: Date,
  },
})

const message = mongoose.model('Messages', messageSchema);

export default message;