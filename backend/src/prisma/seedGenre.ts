import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const genres = [
  'Rock',
  'Pop',
  'Jazz',
  'Blues',
  'Hip Hop',
  'Electronic',
  'Metal',
  'Folk',
  'Reggae',
  'Classical',
  'Funk',
  'R&B',
  'Soul',
  'Country',
  'Indie',
  'Anadolu Rock',
  'Türk Sanat Müziği',
  'Arabesk',
  'Trap',
  'Lo-fi'
];

async function main() {
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Genre seed tamamlandı.');
}

main()
  .catch((e) => {
    console.error('Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
