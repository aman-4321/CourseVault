import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const DbConnection =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/course-selling';

export async function ConnectToDb() {
  try {
    await mongoose.connect(DbConnection);
    console.log('Connected to DB');
  } catch (err) {
    console.error('database connection error', err);
  }
}
