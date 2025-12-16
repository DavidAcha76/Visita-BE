/**
 * Script para poblar la base de datos con datos de ejemplo
 * Ejecutar: node scripts/seed-data.js
 */

const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://visitaCocha:aLnJIKZct4gHc28L@visita-cocha.rd6cvks.mongodb.net/visita_cocha?appName=Visita-Cocha';

// Datos de ejemplo
const atractivos = [
  {
    id: 1,
    nombre: 'Cristo de la Concordia',
    descripcion: 'Monumento icónico de Cochabamba, el Cristo más alto de Sudamérica',
    ubicacion: 'Cerro de San Pedro',
    imagen: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72',
    categoria: 'Monumentos',
    horario: 'Lunes a Domingo 9:00 - 18:00',
    precio: 'Bs. 5',
    telefono: '4-4123456',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Palacio Portales',
    descripcion: 'Palacio histórico con arquitectura europea del siglo XX',
    ubicacion: 'Av. Potosí',
    imagen: 'https://images.unsplash.com/photo-1564574662330-4f14d4e7e699',
    categoria: 'Museos',
    horario: 'Martes a Domingo 10:00 - 17:00',
    precio: 'Bs. 10',
    telefono: '4-4234567',
    activo: true,
  },
  {
    id: 3,
    nombre: 'Parque Nacional Tunari',
    descripcion: 'Área natural protegida con vistas espectaculares',
    ubicacion: 'Cordillera del Tunari',
    imagen: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5',
    categoria: 'Parques',
    horario: 'Lunes a Domingo 6:00 - 18:00',
    precio: 'Gratis',
    activo: true,
  },
];

const restaurantes = [
  {
    id: 1,
    nombre: 'Casa de la Pasta',
    descripcion: 'Restaurante italiano con recetas tradicionales',
    ubicacion: 'Centro de Cochabamba',
    imagen: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    categoria: 'Comida Italiana',
    horario: 'Lunes a Domingo 12:00 - 23:00',
    precioPromedio: 'Bs. 50 - Bs. 80',
    telefono: '4-4345678',
    especialidades: ['Pizza Napolitana', 'Pasta Carbonara', 'Lasagna'],
    activo: true,
  },
  {
    id: 2,
    nombre: 'Pique Macho Don Pepe',
    descripcion: 'Comida tradicional cochabambina',
    ubicacion: 'Av. América',
    imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    categoria: 'Comida Tradicional',
    horario: 'Lunes a Domingo 11:00 - 22:00',
    precioPromedio: 'Bs. 30 - Bs. 60',
    telefono: '4-4456789',
    especialidades: ['Pique Macho', 'Silpancho', 'Chicharrón'],
    activo: true,
  },
  {
    id: 3,
    nombre: 'Sushi Zen',
    descripcion: 'Restaurante japonés con sushi fresco',
    ubicacion: 'Zona Norte',
    imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
    categoria: 'Comida Japonesa',
    horario: 'Martes a Domingo 12:00 - 22:00',
    precioPromedio: 'Bs. 70 - Bs. 100',
    telefono: '4-4567890',
    especialidades: ['Rolls', 'Nigiri', 'Ramen'],
    activo: true,
  },
];

const eventos = [
  {
    id: 1,
    nombre: 'Festival del Chocolate',
    descripcion: 'Celebración anual del chocolate cochabambino',
    fecha: '2025-05-27',
    lugar: 'Plaza 14 de Septiembre',
    imagen: 'https://images.unsplash.com/photo-1511381939415-e44015466834',
    hora: '18:00',
    organizador: 'Municipalidad de Cochabamba',
    precio: 'Gratis',
    categoria: 'Cultural',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Feria de la Alasita',
    descripcion: 'Feria tradicional de miniaturas y artesanías',
    fecha: '2025-01-24',
    lugar: 'Explanada del Cristo',
    imagen: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
    hora: '10:00',
    organizador: 'Gobierno Municipal',
    precio: 'Gratis',
    categoria: 'Tradicional',
    activo: true,
  },
  {
    id: 3,
    nombre: 'Cochabamba Rocks',
    descripcion: 'Festival de música rock con bandas locales',
    fecha: '2025-12-15',
    lugar: 'Estadio Félix Capriles',
    imagen: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    hora: '19:00',
    organizador: 'Productora Musical CB',
    precio: 'Bs. 50 - Bs. 100',
    categoria: 'Musical',
    activo: true,
  },
];

async function seedDatabase() {
  console.log('\n🌱 Iniciando seed de base de datos...\n');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    console.log('\n🗑️  Limpiando datos existentes...');
    await mongoose.connection.db.collection('atractivos').deleteMany({});
    await mongoose.connection.db.collection('restaurantes').deleteMany({});
    await mongoose.connection.db.collection('eventos').deleteMany({});
    console.log('   ✅ Datos limpiados');

    // Insertar atractivos
    console.log('\n📍 Insertando atractivos...');
    await mongoose.connection.db.collection('atractivos').insertMany(atractivos);
    console.log(`   ✅ ${atractivos.length} atractivos insertados`);

    // Insertar restaurantes
    console.log('\n🍽️  Insertando restaurantes...');
    await mongoose.connection.db.collection('restaurantes').insertMany(restaurantes);
    console.log(`   ✅ ${restaurantes.length} restaurantes insertados`);

    // Insertar eventos
    console.log('\n🎉 Insertando eventos...');
    await mongoose.connection.db.collection('eventos').insertMany(eventos);
    console.log(`   ✅ ${eventos.length} eventos insertados`);

    // Verificar
    console.log('\n📊 Verificación final:');
    const countAtractivos = await mongoose.connection.db.collection('atractivos').countDocuments();
    const countRestaurantes = await mongoose.connection.db.collection('restaurantes').countDocuments();
    const countEventos = await mongoose.connection.db.collection('eventos').countDocuments();
    
    console.log(`   - Atractivos: ${countAtractivos}`);
    console.log(`   - Restaurantes: ${countRestaurantes}`);
    console.log(`   - Eventos: ${countEventos}`);

    await mongoose.disconnect();
    console.log('\n✅ Seed completado exitosamente!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error durante el seed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
