import mongoose, { Schema } from 'mongoose';

const purchaseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Purchase = mongoose.model('Purchase', purchaseSchema);
