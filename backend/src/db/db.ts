import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;
const Schema = mongoose.Schema;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL environment variable is not set");
}

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

export const userSchema = new Schema({
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
    maxLength: 30,
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
      ref: "Course",
    },
  ],

  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
    },
  ],
});

export const adminSchema = new Schema({
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
    maxLength: 30,
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
      ref: "Course",
    },
  ],
});

export const courseSchema = new Schema({
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
  },

  imageUrl: {
    type: String,
    trim: true,
  },

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export const purchaseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Purchase = mongoose.model("Purchase", purchaseSchema);
