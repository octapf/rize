#!/usr/bin/env node

/**
 * Script para crear un usuario de prueba en MongoDB directamente
 * Uso: node create-test-user.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const mongoUri = 'mongodb+srv://octapff:w9gA52V6xRoQaB3o@cluster0.7usqj.mongodb.net/rize?retryWrites=true&w=majority&appName=Cluster0';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Crear usuario de prueba
    const testUser = await User.create({
      email: 'octa@gmail.com',
      username: 'octa',
      password: 'password123', // Será hasheada por el pre-save hook
    });

    console.log('✅ Usuario creado:');
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Username: ${testUser.username}`);
    console.log(`   Password (plain): password123`);
    console.log(`   ID: ${testUser._id}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestUser();
