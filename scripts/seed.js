const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aura-portfolio';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, AI recommendations, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Web App", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "AI Dashboard",
    description: "Real-time analytics dashboard with machine learning insights, interactive charts, and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Web App", "Next.js", "Python", "TensorFlow"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging, stories, and content discovery algorithms.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    tags: ["Mobile", "React Native", "Firebase", "Redux"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    title: "Design System",
    description: "Comprehensive component library with accessibility features, theming, and documentation.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Design", "Figma", "Storybook", "CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    title: "API Gateway",
    description: "Microservices architecture with load balancing, rate limiting, and comprehensive monitoring.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    tags: ["Backend", "Go", "Docker", "Kubernetes"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Portfolio Generator",
    description: "AI-powered portfolio builder that creates stunning websites from simple prompts.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    tags: ["Web App", "OpenAI", "Next.js", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.collection('projects').deleteMany({});
    console.log('Cleared existing projects');

    // Insert new data
    await mongoose.connection.collection('projects').insertMany(projects);
    console.log('Seeded projects successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
