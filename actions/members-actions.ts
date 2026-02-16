'use server';

import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

export async function getMembers() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  try {
    return await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return await prisma.member.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export  async function getMemberPhotosByUserId(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: {
        userId,
      },
      include: {
        photos: true,
      },
    });
    if (!member) {
      return null;
    }
    return member.photos;
  } catch (error) {
    console.log(error);
  }
}