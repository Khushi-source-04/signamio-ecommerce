# SIGNAMIO Database Schema

## 📊 Database Structure

### 1. **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (enum: ['customer', 'vendor', 'admin']),
  userType: String (enum: ['B2B', 'B2C']),
  companyName: String (B2B only),
  companyRegistration: String (B2B only),
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  isActive: Boolean,
  isVerified: Boolean,
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **Products Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  category: ObjectId (ref: Category),
  subCategory: ObjectId (ref: SubCategory),
  brand: String,
  sku: String (unique),
  price: {
    mrp: Number,
    sellingPrice: Number,
    costPrice: Number
  },
  discount: {
    percentage: Number,
    flatAmount: Number,
    type: String (enum: ['percentage', 'flat'])
  },
  images: [String], // URLs
  thumbnail: String,
  specifications: Object,
  stock: {
    quantity: Number,
    reserved: Number,
    available: Number
  },
  rating: {
    average: Number,
    count: Number
  },
  reviews: [ObjectId] (ref: Review),
  tags: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **Categories Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  icon: String (URL),
  image: String (URL),
  parentCategory: ObjectId (ref: Category, nullable),
  isActive: Boolean,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **Cart Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number,
      discount: Number,
      total: Number
    }
  ],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  couponCode: String,
  couponDiscount: Number,
  userType: String (enum: ['B2B', 'B2C']),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **Orders Collection**
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number,
      discount: Number,
      tax: Number,
      total: Number
    }
  ],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  billingAddress: Object (same as shippingAddress),
  subtotal: Number,
  tax: Number,
  shipping: Number,
  couponDiscount: Number,
  total: Number,
  paymentMethod: String (enum: ['razorpay', 'stripe', 'cod']),
  paymentStatus: String (enum: ['pending', 'completed', 'failed', 'refunded']),
  paymentId: String,
  orderStatus: String (enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  trackingNumber: String,
  notes: String,
  userType: String (enum: ['B2B', 'B2C']),
  invoiceNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. **Reviews Collection**
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: Product),
  user: ObjectId (ref: User),
  rating: Number (1-5),
  title: String,
  comment: String,
  images: [String],
  helpful: Number,
  unhelpful: Number,
  isVerified: Boolean,
  status: String (enum: ['pending', 'approved', 'rejected']),
  createdAt: Date,
  updatedAt: Date
}
```

### 7. **Coupons Collection**
```javascript
{
  _id: ObjectId,
  code: String (unique),
  description: String,
  discountType: String (enum: ['percentage', 'flat']),
  discountValue: Number,
  minOrderAmount: Number,
  maxDiscount: Number,
  usageLimit: Number,
  usagePerUser: Number,
  usedCount: Number,
  applicableCategories: [ObjectId] (ref: Category),
  applicableUserTypes: [String] (B2B, B2C),
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. **Inventory Logs Collection**
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: Product),
  type: String (enum: ['add', 'remove', 'reserve', 'return']),
  quantity: Number,
  reason: String,
  order: ObjectId (ref: Order, nullable),
  notes: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

### 9. **Wishlist Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  products: [ObjectId] (ref: Product),
  createdAt: Date,
  updatedAt: Date
}
```

### 10. **Transactions Collection**
```javascript
{
  _id: ObjectId,
  order: ObjectId (ref: Order),
  user: ObjectId (ref: User),
  amount: Number,
  currency: String,
  paymentMethod: String,
  transactionId: String,
  status: String (enum: ['pending', 'completed', 'failed']),
  gatewayResponse: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔑 Indexes

### Performance Indexes
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 })

// Products
db.products.createIndex({ slug: 1 }, { unique: true })
db.products.createIndex({ category: 1 })
db.products.createIndex({ name: "text" })
db.products.createIndex({ sku: 1 }, { unique: true })

// Orders
db.orders.createIndex({ user: 1 })
db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ createdAt: -1 })

// Categories
db.categories.createIndex({ slug: 1 }, { unique: true })

// Coupons
db.coupons.createIndex({ code: 1 }, { unique: true })
```

---

## 📈 Relationships

```
User
├── Cart (1:1)
├── Orders (1:N)
├── Reviews (1:N)
└── Wishlist (1:1)

Product
├── Category (N:1)
├── Reviews (1:N)
└── Cart Items (1:N)

Category
└── Products (1:N)

Order
├── User (N:1)
├── Products (N:M)
└── Transaction (1:1)
```

---

## 🔐 Security Considerations

1. **Password Hashing** - Use bcryptjs
2. **Data Encryption** - Encrypt sensitive fields
3. **Audit Trail** - Log all inventory changes
4. **Validation** - Validate all inputs
5. **Indexing** - Index frequently queried fields

---

**Last Updated:** June 2026
