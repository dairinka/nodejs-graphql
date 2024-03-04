import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IDataLoaders, IMemberType, IProfile, MemberTypeIdType } from './types/types.js';

const userLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: {
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });
    return ids.map((id) => users.find((user) => user.id === id));
  });
};
const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly MemberTypeIdType[]) => {
    const memberTypes = (await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    })) as unknown as IMemberType[];
    return ids.map((id) => memberTypes.find((memberType) => memberType.id === id));
  });
};
const postsByAuthorLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...ids] } },
    });
    return ids.map((id) => posts.filter((post) => post.authorId === id));
  });
};
const profileByUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const profiles = (await prisma.profile.findMany({
      where: { userId: { in: [...ids] } },
    })) as IProfile[];
    return ids.map((id) => profiles.find((profile) => profile.userId === id));
  });
};
const profilesByMemberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly MemberTypeIdType[]) => {
    const profiles = (await prisma.profile.findMany({
      where: { memberTypeId: { in: [...ids] } },
    })) as IProfile[];
    return ids.map((id) => profiles.filter((profile) => profile.memberTypeId === id));
  });
};

export const createDataLoaders = (prisma: PrismaClient): IDataLoaders => ({
  userLoader: userLoader(prisma),
  memberTypeLoader: memberTypeLoader(prisma),
  postsByAuthorLoader: postsByAuthorLoader(prisma),
  profileByUserLoader: profileByUserLoader(prisma),
  profilesByMemberTypeLoader: profilesByMemberTypeLoader(prisma),
});
