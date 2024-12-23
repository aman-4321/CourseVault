export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  coursesOwned: string[];
  purchases: string[];
  __v: number;
}

export interface Admin {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  coursesCreated: string[];
  __v: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  creatorId: string;
  __v: number;
}
