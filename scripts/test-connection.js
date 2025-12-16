/**
 * Script para verificar la conexión a MongoDB
 * Ejecutar: node scripts/test-connection.js
 */

const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://visitaCocha:aLnJIKZct4gHc28L@visita-cocha.rd6cvks.mongodb.net/visita_cocha?appName=Visita-Cocha';

async function testConnection() {
  console.log('\n🔍 Probando conexión a MongoDB...\n');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conexión exitosa a MongoDB Atlas!');
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Listar colecciones
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📁 Colecciones encontradas: ${collections.length}`);
    collections.forEach((col) => {
      console.log(`   - ${col.name}`);
    });

    // Contar documentos
    console.log('\n📊 Documentos por colección:');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`   ${col.name}: ${count} documentos`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Desconectado correctamente\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error de conexión:', error.message);
    console.error('\n💡 Verifica:');
    console.error('   - Tu conexión a internet');
    console.error('   - Las credenciales de MongoDB');
    console.error('   - Que tu IP esté whitelisted en MongoDB Atlas\n');
    process.exit(1);
  }
}

testConnection();
