/**
 * Script para inspeccionar la estructura de las colecciones existentes
 * Ejecutar: node scripts/inspect-collections.js
 */

const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://visitaCocha:aLnJIKZct4gHc28L@visita-cocha.rd6cvks.mongodb.net/visita_cocha?appName=Visita-Cocha';

async function inspectCollections() {
  console.log('\n🔍 Inspeccionando colecciones...\n');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Inspeccionar attractions
    console.log('📍 Colección: ATTRACTIONS');
    console.log('=' .repeat(60));
    const attraction = await mongoose.connection.db
      .collection('attractions')
      .findOne();
    console.log('Ejemplo de documento:');
    console.log(JSON.stringify(attraction, null, 2));
    console.log('\nCampos disponibles:', Object.keys(attraction || {}));

    console.log('\n\n🍽️  Colección: RESTAURANTS');
    console.log('='.repeat(60));
    const restaurant = await mongoose.connection.db
      .collection('restaurants')
      .findOne();
    console.log('Ejemplo de documento:');
    console.log(JSON.stringify(restaurant, null, 2));
    console.log('\nCampos disponibles:', Object.keys(restaurant || {}));

    console.log('\n\n🎉 Colección: EVENTS');
    console.log('='.repeat(60));
    const event = await mongoose.connection.db
      .collection('events')
      .findOne();
    console.log('Ejemplo de documento:');
    console.log(JSON.stringify(event, null, 2));
    console.log('\nCampos disponibles:', Object.keys(event || {}));

    await mongoose.disconnect();
    console.log('\n\n✅ Inspección completada\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

inspectCollections();
