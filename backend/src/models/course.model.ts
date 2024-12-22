import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },

  description: {
    type: String,
    trim: true,
    required: true,
  },

  price: {
    type: Number,
    default: 0,
    required: true,
  },

  imageUrl: {
    type: String,
    trim: true,
    required: true,
  },

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
});

export const Course = mongoose.model('Course', courseSchema);
