#!/usr/bin/env node
/**
 * Development utility scripts for RIZE backend
 * Run: npm run dev:script <command>
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

async function createUser(email, username, password) {
  await connectDB();
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    displayName: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
  }));

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    console.log('❌ User already exists');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    displayName: username,
    xp: 0,
    level: 1,
    streak: 0,
  });

  console.log('✅ User created successfully:');
  console.log(`   Email: ${user.email}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   ID: ${user._id}`);
  
  await mongoose.connection.close();
}

async function deleteUser(identifier) {
  await connectDB();
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    username: String,
  }));

  const result = await User.deleteOne({
    $or: [{ email: identifier }, { username: identifier }, { _id: identifier }],
  });

  if (result.deletedCount > 0) {
    console.log(`✅ User deleted: ${identifier}`);
  } else {
    console.log(`❌ User not found: ${identifier}`);
  }
  
  await mongoose.connection.close();
}

async function resetDatabase() {
  await connectDB();
  
  const collections = await mongoose.connection.db.collections();
  
  console.log('⚠️  WARNING: This will delete ALL data!');
  console.log(`   Collections to drop: ${collections.length}`);
  
  for (const collection of collections) {
    await collection.drop();
    console.log(`   Dropped: ${collection.collectionName}`);
  }
  
  console.log('✅ Database reset complete');
  await mongoose.connection.close();
}

async function listUsers() {
  await connectDB();
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    username: String,
    level: Number,
    xp: Number,
    createdAt: Date,
  }));

  const users = await User.find().select('email username level xp createdAt').sort({ createdAt: -1 });
  
  console.log(`\n📋 Found ${users.length} users:\n`);
  users.forEach((user, i) => {
    console.log(`${i + 1}. ${user.username} (${user.email})`);
    console.log(`   Level: ${user.level} | XP: ${user.xp}`);
    console.log(`   Created: ${user.createdAt?.toISOString()}`);
    console.log('');
  });
  
  await mongoose.connection.close();
}

async function dbStats() {
  await connectDB();
  
  const stats = await mongoose.connection.db.stats();
  const collections = await mongoose.connection.db.collections();
  
  console.log('\n📊 Database Statistics:\n');
  console.log(`   Database: ${stats.db}`);
  console.log(`   Collections: ${stats.collections}`);
  console.log(`   Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Storage Size: ${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Indexes: ${stats.indexes}`);
  console.log('');
  
  console.log('📁 Collections:');
  for (const collection of collections) {
    const count = await collection.countDocuments();
    console.log(`   - ${collection.collectionName}: ${count} documents`);
  }
  
  await mongoose.connection.close();
}

// CLI Handler
const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  switch (command) {
    case 'create-user':
      if (args.length < 3) {
        console.log('Usage: npm run dev:script create-user <email> <username> <password>');
        console.log('Example: npm run dev:script create-user test@rize.app testuser Pass1234');
        process.exit(1);
      }
      await createUser(args[0], args[1], args[2]);
      break;

    case 'delete-user':
      if (args.length < 1) {
        console.log('Usage: npm run dev:script delete-user <email|username|id>');
        console.log('Example: npm run dev:script delete-user test@rize.app');
        process.exit(1);
      }
      await deleteUser(args[0]);
      break;

    case 'list-users':
      await listUsers();
      break;

    case 'reset-db':
      if (process.env.NODE_ENV === 'production') {
        console.error('❌ Cannot reset database in production!');
        process.exit(1);
      }
      console.log('⚠️  Are you sure? Press Ctrl+C to cancel...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      await resetDatabase();
      break;

    case 'db-stats':
      await dbStats();
      break;

    default:
      console.log('RIZE Development Utilities\n');
      console.log('Available commands:');
      console.log('  create-user <email> <username> <password>  - Create a new user');
      console.log('  delete-user <email|username|id>           - Delete a user');
      console.log('  list-users                                - List all users');
      console.log('  reset-db                                  - Reset entire database');
      console.log('  db-stats                                  - Show database statistics');
      console.log('');
      console.log('Examples:');
      console.log('  npm run dev:script create-user test@rize.app testuser Pass1234');
      console.log('  npm run dev:script list-users');
      console.log('  npm run dev:script db-stats');
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
