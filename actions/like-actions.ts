'use server';

import { prisma } from '@/prisma/prisma';
import { getAuthUserId } from './auth-actions';
import { revalidatePath } from 'next/cache';

export async function toggleLike(targetUserId: string) {
  const userId = await getAuthUserId();
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        sourceUserId_targetUserId: {
          sourceUserId: userId,
          targetUserId,
        },
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/members');
}

export async function fetchLikedMembers(type = 'source') {
  try {
    const userId = await getAuthUserId();
    switch (type) {
      case 'source':
        return fetchSourceLikes(userId);
      case 'target':
        return fetchTargetLikes(userId);
      case 'mutual':
        return fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'An error occurred while fetching liked members',
    );
  }
}


export async function fetchSourceLikes(userId: string) {
  const sourceLikes = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember:true,
    },
  });

  return sourceLikes.map((like) => like.targetMember);
}


export async function fetchTargetLikes(userId: string) {
  const sourceLikes = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return sourceLikes.map((like) => like.sourceMember);
}


export async function fetchMutualLikes(userId: string) {
  const sourceLikes = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetUserId: true,
    },
  });
  const sourceLikedIds = sourceLikes.map((like) => like.targetUserId);
  const mutualLikes = await prisma.like.findMany({
    where: {
      AND: [
        {
          targetUserId: userId,
          sourceUserId: {
            in: sourceLikedIds,
          },
        },
      ],
    },
    select: {
      sourceMember: true,
    },
  });
  return mutualLikes.map((like) => like.sourceMember);
}
