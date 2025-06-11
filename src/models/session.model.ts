import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
  },
  userAgent: {
    type: String
  },
  ipAddress: {
    type: String
  }
});

export const Session = mongoose.model('Session', sessionSchema);
