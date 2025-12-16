import * as admin from 'firebase-admin';
import { join } from 'path';

// Inicializar Firebase
admin.initializeApp({
  credential: admin.credential.cert(
    join(__dirname, 'dashboard-app-26023-firebase-adminsdk-fbsvc-46ded3bf2a.json')
  ),
});

const db = admin.firestore();

async function seed() {
  console.log('🔹 Iniciando carga de datos de prueba...');

  // Datos de atractivos
  const atractivos = [
    {
      id: 1,
      nombre: 'Cristo de la Concordia',
      descripcion: 'Una de las estatuas más grandes de Sudamérica, ubicada en el cerro San Pedro.',
      ubicacion: 'Cochabamba, Bolivia',
      imagen: 'https://example.com/cristo.jpg',
      categoria: 'Monumento',
    },
    {
      id: 2,
      nombre: 'Laguna Alalay',
      descripcion: 'Hermosa laguna natural dentro de la ciudad ideal para caminatas y avistamiento de aves.',
      ubicacion: 'Zona sur, Cochabamba',
      imagen: 'https://example.com/alalay.jpg',
      categoria: 'Naturaleza',
    },
    {
      id: 3,
      nombre: 'Palacio Portales',
      descripcion: 'Antigua residencia de Simón Patiño, hoy museo y centro cultural.',
      ubicacion: 'Queru Queru, Cochabamba',
      imagen: 'https://example.com/portales.jpg',
      categoria: 'Cultura',
    },
    {
      id: 4,
      nombre: 'Parque Tunari',
      descripcion: 'Área protegida que rodea la ciudad, ideal para caminatas y trekking.',
      ubicacion: 'Cordillera del Tunari',
      imagen: 'https://example.com/tunari.jpg',
      categoria: 'Naturaleza',
    },
    {
      id: 5,
      nombre: 'Catedral Metropolitana',
      descripcion: 'Iglesia principal en la Plaza 14 de Septiembre con arquitectura colonial.',
      ubicacion: 'Centro, Cochabamba',
      imagen: 'https://example.com/catedral.jpg',
      categoria: 'Histórico',
    },
  ];

  // Datos de restaurantes
  const restaurantes = [
    {
      id: 1,
      nombre: 'Casa de Campo',
      descripcion: 'Comida típica cochabambina en ambiente campestre.',
      ubicacion: 'Av. América y Pando',
      imagen: 'https://example.com/casadecampo.jpg',
      categoria: 'Comida Típica',
    },
    {
      id: 2,
      nombre: 'Paprika',
      descripcion: 'Restaurante moderno con música en vivo.',
      ubicacion: 'Calle España y Antezana',
      imagen: 'https://example.com/paprika.jpg',
      categoria: 'Internacional',
    },
    {
      id: 3,
      nombre: 'Doña Pola',
      descripcion: 'Especialidad en chicharrón y platos típicos cochabambinos.',
      ubicacion: 'Km 8 Blanco Galindo',
      imagen: 'https://example.com/donapola.jpg',
      categoria: 'Comida Típica',
    },
  ];

  // Datos de eventos
  const eventos = [
    {
      id: 1,
      nombre: 'Feria Internacional de Cochabamba',
      descripcion: 'Evento anual con expositores nacionales e internacionales.',
      fecha: '2025-09-10',
      lugar: 'Recinto Ferial Alalay',
      imagen: 'https://example.com/feria.jpg',
    },
    {
      id: 2,
      nombre: 'Festival de la Llajta',
      descripcion: 'Muestra cultural, música y gastronomía local.',
      fecha: '2025-08-20',
      lugar: 'Plaza Colón',
      imagen: 'https://example.com/llajta.jpg',
    },
    {
      id: 3,
      nombre: 'Maratón Cochabamba Corre',
      descripcion: 'Competencia anual para promover el deporte y el turismo.',
      fecha: '2025-10-01',
      lugar: 'Circuito urbano',
      imagen: 'https://example.com/maraton.jpg',
    },
  ];

  // Función para subir datos a Firestore
  const uploadCollection = async (collectionName: string, data: any[]) => {
    for (const item of data) {
      await db.collection(collectionName).doc(item.id.toString()).set(item);
      console.log(`✔️  ${collectionName} ID ${item.id} cargado`);
    }
  };

  await uploadCollection('atractivos', atractivos);
  await uploadCollection('restaurantes', restaurantes);
  await uploadCollection('eventos', eventos);

  console.log('🎉 Carga de datos completada');
}

seed().catch(console.error);
