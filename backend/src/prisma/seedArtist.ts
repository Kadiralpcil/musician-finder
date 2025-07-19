import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient();


async function main() {
  // Genre'leri çekiyoruz
  const genres = await prisma.genre.findMany();
  console.log("genres", genres);

  for (let i = 0; i < 10; i++) {
    await prisma.artist.create({
      data: {
        name: faker.person.fullName(),
        imageUrl: faker.image.avatar(), 
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Seed tamamlandı!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
