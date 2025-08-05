import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const genres = [
  'Rock', 'Pop', 'Jazz', 'Blues', 'Hip Hop', 'Electronic', 'Metal', 'Folk',
  'Reggae', 'Classical', 'Funk', 'R&B', 'Soul', 'Country', 'Indie',
  'Anadolu Rock', 'Türk Sanat Müziği', 'Arabesk', 'Trap', 'Lo-fi'
];

async function seedGenres() {
  console.log('🎵 Genre seeding başlatılıyor...');
  
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  
  console.log('✅ Genre seed tamamlandı.');
}

async function seedArtists() {
  console.log('🎤 Artist seeding başlatılıyor...');
  
  // Genre'leri çekiyoruz
  const genreList = await prisma.genre.findMany();
  console.log(`📋 ${genreList.length} genre bulundu:`, genreList.map(g => g.name));

  for (let i = 0; i < 10; i++) {
    const artistName = faker.person.fullName();
    await prisma.artist.create({
      data: {
        name: artistName,
        imageUrl: faker.image.avatar(), 
        genres: {
          connect: genreList.map((genre) => ({ id: genre.id })),
        },
      },
    });
    console.log(`✨ Artist oluşturuldu: ${artistName}`);
  }
  
  console.log('✅ Artist seed tamamlandı.');
}

async function main() {
  try {
    await seedGenres();
    await seedArtists();
    
    console.log('🎉 Tüm seed işlemleri başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Seed hatası:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });