import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface CreateUser {
  name: string;
  balance: number;
}

export interface IAuthor {
  subscriberId: string;
  authorId: string;
}

export interface IUser extends CreateUser {
  id: string;
  userSubscribedTo?: IAuthor[];
  subscribedToUser?: IAuthor[];
}

export interface Context extends DataLoaders {
  db: PrismaClient;
}

export interface DataLoaders {
  userLoader: DataLoader<string, IUser>;
  memberTypeLoader: DataLoader<MemberTypeIdType, IMemberType>;
  postsByAuthorLoader: DataLoader<string, IPost[]>;
  profileByUserLoader: DataLoader<string, IProfile>;
  profilesByMemberTypeLoader: DataLoader<string, IProfile[]>;
}

export type MemberTypeIdType = 'basic' | 'business';
export interface IMemberType {
  id: string;
  discount: number;
  postLimitPerMonth: number;
}
export interface IPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
}
export interface IProfile {
  id: string;
  userId: string;
  isMale: boolean;
  memberTypeId: MemberTypeIdType;
  yearOfBirth: number;
}
