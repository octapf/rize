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

    // Limpiar usuarios de prueba existentes
    await User.deleteMany({ email: { $in: ['test@test.com', 'octa@gmail.com', 'demo@test.com'] } });
    console.log('✅ Cleaned up old test users');

    // Crear usuario de prueba con credenciales simples
    const plainPassword = 'Admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const testUser = await User.create({
      email: 'test@test.com',
      username: 'testuser',
      password: hashedPassword,
    });

    console.log('\n✅ USUARIO CREADO - PRUEBA CON ESTOS DATOS:\n');
    console.log('📧 Email: test@test.com');
    console.log('👤 Usuario: testuser');
    console.log('🔐 Contraseña: Admin123');
    console.log(`\n✅ ID: ${testUser._id}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestUser();
