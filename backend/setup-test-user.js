const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function main() {
  const mongoUri = 'mongodb+srv://octapff:w9gA52V6xRoQaB3o@cluster0.7usqj.mongodb.net/rize?retryWrites=true&w=majority&appName=Cluster0';
  
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
  
  const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
  });

  const User = mongoose.model('User', userSchema);
  
  // Limpiar
  await User.deleteMany({ email: { $in: ['test@test.com', 'octa@gmail.com'] } });
  
  // Crear
  const hashedPassword = await bcrypt.hash('Admin123', 10);
  await User.create({
    email: 'test@test.com',
    username: 'testuser',
    password: hashedPassword
  });
  
  console.log('\n✅ USUARIO CREADO:\n');
  console.log('📧 Email:      test@test.com');
  console.log('👤 Usuario:    testuser');
  console.log('🔐 Contraseña: Admin123\n');
  
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
