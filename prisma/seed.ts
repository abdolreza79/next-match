import bcrypt from 'bcryptjs';
import { PrismaClient } from '../app/generated/prisma/client';
import { membersData } from './memberData';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seedMembers() {
  return membersData.map(async (member) => {
    const memberData = await prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.username,
        passwordHash: await bcrypt.hash('111111', 10),
        image: member.image,
        member: {
          create: {
            name: member.name,
            gender: member.gender,
            dataOfBirth: new Date(member.dateOfBirth),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            createdAt: new Date(member.created),
            updatedAt: new Date(member.lastActive),
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    });
    return memberData;
  });
}

seedMembers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
