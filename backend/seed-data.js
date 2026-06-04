// seed-data.js - Seed sample products and categories

const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create categories
    const categories = await Category.create([
      {
        name: 'Home Decor',
        description: 'Beautiful home decoration items',
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Automotive',
        description: 'Car and vehicle accessories',
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Gifts',
        description: 'Perfect gifts for every occasion',
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'Electronics',
        description: 'Electronic gadgets and accessories',
        displayOrder: 4,
        isActive: true
      }
    ]);

    // Create products
    const products = await Product.create([
      {
        name: 'Backflow Incense Burner - Lotus Design',
        description: 'Premium lotus-shaped incense holder with ceramic design. Includes 40 colorful incense cones and bamboo sticks. Perfect for meditation and home ambiance.',
        category: categories[0]._id,
        brand: 'SIGNAMIO',
        sku: 'INCENSE-LOTUS-001',
        price: {
          mrp: 2999,
          sellingPrice: 1999,
          costPrice: 800
        },
        discount: {
          percentage: 33,
          type: 'percentage'
        },
        images: [
          'https://via.placeholder.com/500x500?text=Incense+Burner+1',
          'https://via.placeholder.com/500x500?text=Incense+Burner+2'
        ],
        thumbnail: 'https://via.placeholder.com/500x500?text=Incense+Burner',
        specifications: {
          material: 'Ceramic with black gloss finish',
          color: 'Black',
          included: '40 incense cones, bamboo sticks',
          weight: '500g'
        },
        stock: {
          quantity: 50,
          reserved: 5,
          available: 45
        },
        tags: ['home-decor', 'incense', 'meditation', 'gift'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Digital Battery Charger - 12V 5Amp',
        description: 'Professional digital battery charger for 12V DC batteries. Features multiple charging modes, LED indicators, and reverse battery protection. Perfect for car batteries and small batteries.',
        category: categories[1]._id,
        brand: 'SIGNAMIO',
        sku: 'CHARGER-12V-001',
        price: {
          mrp: 8999,
          sellingPrice: 5999,
          costPrice: 2500
        },
        discount: {
          percentage: 33,
          type: 'percentage'
        },
        images: [
          'https://via.placeholder.com/500x500?text=Battery+Charger+1',
          'https://via.placeholder.com/500x500?text=Battery+Charger+2'
        ],
        thumbnail: 'https://via.placeholder.com/500x500?text=Battery+Charger',
        specifications: {
          voltage: '12V DC',
          amperage: '5 Amp',
          features: 'Reverse battery protection, Multiple LED indicators',
          warranty: '1 Year'
        },
        stock: {
          quantity: 25,
          reserved: 3,
          available: 22
        },
        tags: ['automotive', 'charger', 'battery', 'car-accessories'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Colorful Incense Cone Set',
        description: 'Set of 40 colorful incense cones in multiple fragrances. Long-lasting aroma, perfect for home, office, or meditation spaces.',
        category: categories[0]._id,
        brand: 'SIGNAMIO',
        sku: 'INCENSE-CONE-SET-001',
        price: {
          mrp: 499,
          sellingPrice: 299,
          costPrice: 100
        },
        discount: {
          percentage: 40,
          type: 'percentage'
        },
        images: ['https://via.placeholder.com/500x500?text=Incense+Cones'],
        thumbnail: 'https://via.placeholder.com/500x500?text=Incense+Cones',
        specifications: {
          quantity: '40 cones',
          duration: '30 minutes per cone',
          fragrances: 'Mixed (Lavender, Rose, Sandalwood, etc.)'
        },
        stock: {
          quantity: 100,
          reserved: 10,
          available: 90
        },
        tags: ['home-decor', 'incense', 'fragrances', 'gift-set'],
        isActive: true,
        isFeatured: false
      },
      {
        name: 'Bamboo Incense Sticks Holder',
        description: 'Elegant bamboo stand for holding incense sticks. Space-saving design with natural bamboo finish.',
        category: categories[0]._id,
        brand: 'SIGNAMIO',
        sku: 'INCENSE-HOLDER-001',
        price: {
          mrp: 799,
          sellingPrice: 499,
          costPrice: 200
        },
        discount: {
          percentage: 37,
          type: 'percentage'
        },
        images: ['https://via.placeholder.com/500x500?text=Bamboo+Holder'],
        thumbnail: 'https://via.placeholder.com/500x500?text=Bamboo+Holder',
        specifications: {
          material: 'Natural Bamboo',
          capacity: '20-30 sticks',
          dimensions: '10x10x8 cm'
        },
        stock: {
          quantity: 75,
          reserved: 8,
          available: 67
        },
        tags: ['home-decor', 'bamboo', 'incense'],
        isActive: true,
        isFeatured: false
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`📦 ${categories.length} categories created`);
    console.log(`📝 ${products.length} products created`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedData();
};

run();
