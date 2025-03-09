import mongoose from 'mongoose';
import { Course } from '../models/course.model';
import { Admin } from '../models/admin.model';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/courseVault')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Admin credentials
const adminEmail = 'admin@gmail.com';

// Function to seed courses
const seedCourses = async () => {
  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email: adminEmail });

    if (!admin) {
      console.error(
        `Admin with email ${adminEmail} not found. Please create the admin first.`
      );
      mongoose.connection.close();
      return;
    }

    console.log(`Found admin: ${admin.firstName} (${admin._id})`);

    // Use the real admin ID
    const adminId = admin._id;

    // Update courses array to use the real admin ID
    const courses = [
      {
        title: 'JavaScript Fundamentals',
        description:
          'Learn the core concepts of JavaScript including variables, data types, functions, objects, and more. This course is perfect for beginners starting their programming journey.',
        price: 49.99,
        imageUrl:
          'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'React.js for Beginners',
        description:
          'Start building modern web applications with React.js. Learn components, props, state, hooks, and create interactive UIs with ease.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Python Crash Course',
        description:
          'Master Python programming from scratch. Covers variables, data structures, functions, OOP, file handling, and practical projects.',
        price: 39.99,
        imageUrl:
          'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Machine Learning Essentials',
        description:
          'Introduction to machine learning algorithms and techniques. Learn about classification, regression, clustering, neural networks, and practical implementations with scikit-learn.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Full Stack Web Development',
        description:
          'Comprehensive course covering both frontend and backend development. Learn HTML, CSS, JavaScript, Node.js, Express, MongoDB, and deploy full applications.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'UI/UX Design Principles',
        description:
          'Learn the fundamentals of user interface and user experience design. Covers design thinking, wireframing, prototyping, user testing, and design systems.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Data Structures and Algorithms',
        description:
          'Master the core concepts of data structures and algorithms. Learn arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching algorithms.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Node.js Backend Development',
        description:
          'Learn to build scalable server-side applications with Node.js. Covers Express framework, REST APIs, authentication, database integration, and deployment.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'iOS App Development with Swift',
        description:
          'Create native iOS applications using Swift and Xcode. Learn about UIKit, SwiftUI, app lifecycle, data persistence, networking, and publishing to the App Store.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1563203369-26f2e4a5ccb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Android Development with Kotlin',
        description:
          'Build Android applications using Kotlin. Learn about Android Studio, layouts, activities, fragments, intents, data storage, and Google Play publishing.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'DevOps and CI/CD Pipelines',
        description:
          'Learn DevOps practices and continuous integration/continuous deployment workflows. Covers Docker, Kubernetes, Jenkins, GitHub Actions, and cloud deployment.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Blockchain Development',
        description:
          'Introduction to blockchain technologies and smart contract development. Learn Ethereum, Solidity, web3.js, and dApp development concepts.',
        price: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Cloud Computing with AWS',
        description:
          'Master Amazon Web Services (AWS) cloud platform. Learn EC2, S3, Lambda, RDS, DynamoDB, CloudFormation, and best practices for cloud architecture.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Cybersecurity Fundamentals',
        description:
          'Learn the basics of cybersecurity, including threat detection, vulnerability assessment, encryption, network security, and ethical hacking techniques.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Game Development with Unity',
        description:
          'Create 2D and 3D games using Unity engine. Learn C# programming, game physics, animations, UI systems, and multiplatform publishing.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Data Visualization with D3.js',
        description:
          'Learn to create interactive data visualizations for the web using D3.js. Covers SVG, scales, axes, transitions, and creating custom charts and graphs.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Angular Framework Complete Guide',
        description:
          'Comprehensive course on Angular framework. Learn components, services, dependency injection, routing, forms, HTTP client, and state management.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Docker and Container Orchestration',
        description:
          'Master containerization with Docker and orchestration with Kubernetes. Learn to build, deploy, and manage containerized applications at scale.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'SQL and Database Design',
        description:
          'Learn SQL and relational database design principles. Covers database normalization, queries, joins, indexes, stored procedures, and performance optimization.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'TypeScript for Modern Development',
        description:
          'Master TypeScript for enhanced JavaScript development. Learn types, interfaces, generics, decorators, and integration with popular frameworks.',
        price: 49.99,
        imageUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'GraphQL API Development',
        description:
          'Learn to build and consume GraphQL APIs. Covers schema design, resolvers, mutations, subscriptions, and integration with various frontend frameworks.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Vue.js 3 Complete Course',
        description:
          'Comprehensive guide to Vue.js 3 framework. Learn the composition API, reactive data, components, routing, Vuex state management, and more.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'MongoDB and NoSQL Databases',
        description:
          'Master MongoDB and NoSQL database concepts. Learn document modeling, CRUD operations, aggregation, indexing, and integration with Node.js applications.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Microservices Architecture',
        description:
          'Learn to design, implement, and deploy microservices-based applications. Covers service communication, API gateways, fault tolerance, and containerization.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Flutter Mobile App Development',
        description:
          'Build cross-platform mobile applications with Flutter and Dart. Learn widgets, state management, animations, API integration, and app publishing.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Responsive Web Design',
        description:
          'Master responsive web design techniques. Learn CSS Grid, Flexbox, media queries, mobile-first design, and building sites that work on all devices.',
        price: 49.99,
        imageUrl:
          'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Deep Learning with TensorFlow',
        description:
          'Introduction to deep learning using TensorFlow. Learn neural networks, convolutional networks, recurrent networks, and apply them to real-world problems.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Ruby on Rails Development',
        description:
          'Learn to build web applications with Ruby on Rails framework. Covers MVC architecture, ActiveRecord, routing, testing, and deployment.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583086762675-5a92b7cf0545?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'C++ Programming Masterclass',
        description:
          'Comprehensive guide to C++ programming language. Learn syntax, object-oriented programming, STL, memory management, and advanced topics.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1571171802942-d9d889b067dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Natural Language Processing',
        description:
          'Learn NLP techniques for text analysis and language understanding. Covers text preprocessing, sentiment analysis, named entity recognition, and more.',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Laravel PHP Framework',
        description:
          'Master Laravel framework for PHP development. Learn routing, controllers, Eloquent ORM, Blade templating, authentication, and API development.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Git & GitHub Complete Guide',
        description:
          'Learn version control with Git and collaboration with GitHub. Covers repositories, branches, merging, rebasing, pull requests, and CI/CD integration.',
        price: 39.99,
        imageUrl:
          'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Testing and TDD Fundamentals',
        description:
          'Learn software testing and test-driven development practices. Covers unit testing, integration testing, mocking, and automated testing frameworks.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
      {
        title: 'Next.js for Production React Apps',
        description:
          'Build production-ready React applications with Next.js. Learn server-side rendering, static site generation, API routes, and deployment strategies.',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        creatorId: adminId,
      },
    ].map((course) => ({
      ...course,
      creatorId: adminId,
    }));

    // Delete existing courses by this admin (optional - uncomment if needed)
    // await Course.deleteMany({ creatorId: adminId });
    // console.log('Deleted existing courses by this admin');

    // Insert new courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`${createdCourses.length} courses created successfully`);

    // Update admin with references to created courses
    const courseIds = createdCourses.map((course) => course._id);
    await Admin.findByIdAndUpdate(
      adminId,
      { $push: { coursesCreated: { $each: courseIds } } },
      { new: true }
    );
    console.log(
      `Updated admin's coursesCreated array with ${courseIds.length} new course references`
    );

    // Close the connection
    console.log('Seed completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding courses:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedCourses();
