import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
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

  coursesCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

export const Admin = mongoose.model('Admin', adminSchema);
