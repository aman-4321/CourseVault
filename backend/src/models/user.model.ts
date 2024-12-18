import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
    trim: true,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
  },

  coursesOwned: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Purchase',
    },
  ],
});

export const User = mongoose.model('User', userSchema);
