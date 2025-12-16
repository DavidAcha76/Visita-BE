/**
 * Script para poblar la colección de rutas de transporte a partir
 * de los archivos GeoJSON en `src/GeoJSON/individual-rutes`.
 *
 * Uso: node scripts/seed-transport-routes.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI =
  'mongodb+srv://visitaCocha:aLnJIKZct4gHc28L@visita-cocha.rd6cvks.mongodb.net/visita_cocha?appName=Visita-Cocha';

async function seed() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado');

    const srcDir = path.join(__dirname, '..', 'src', 'GeoJSON', 'individual-rutes');
    const destDir = path.join(__dirname, '..', 'uploads', 'transport-routes');

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith('.geojson'));

    if (!files.length) {
      console.log('No se encontraron archivos .geojson en', srcDir);
      process.exit(0);
    }

    const docs = [];

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destFilename = `${Date.now()}-${file}`;
      const destPath = path.join(destDir, destFilename);

      // Copiar archivo
      fs.copyFileSync(srcPath, destPath);

      // Nombre amigable (sin extensión)
      const nombre = path.basename(file, path.extname(file));

      // Try to parse the geojson file and include it in the document
      let geoobj = null;
      try {
        const raw = fs.readFileSync(destPath, 'utf8');
        geoobj = JSON.parse(raw);
      } catch (err) {
        console.warn('No se pudo parsear', destPath, err.message);
      }

      const doc = {
        nombre,
        tipoArchivo: 'geojson',
        archivoUrl: `/uploads/transport-routes/${destFilename}`,
        geojson: geoobj,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      docs.push(doc);
    }

    // Insertar en la colección 'transportroutes' (nombre por defecto del modelo TransportRoute)
    const result = await mongoose.connection.db.collection('transportroutes').insertMany(docs);

    console.log(`Insertados ${result.insertedCount} documentos en 'transportroutes'`);
    await mongoose.disconnect();
    console.log('Seed finalizado');
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
}

seed();
