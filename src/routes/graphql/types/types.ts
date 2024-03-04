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
  profile?: IProfile;
  post?: IPost[];
  userSubscribedTo?: IAuthor[];
  subscribedToUser?: IAuthor[];
}

export interface Context extends IDataLoaders {
  db: PrismaClient;
}

export interface IDataLoaders {
  userLoader: DataLoader<string, IUser | undefined, string>;
  memberTypeLoader: DataLoader<MemberTypeIdType, IMemberType | undefined, string>;
  postsByAuthorLoader: DataLoader<string, IPost[] | undefined, string>;
  profileByUserLoader: DataLoader<string, IProfile | undefined, string>;
  profilesByMemberTypeLoader: DataLoader<string, IProfile[] | undefined, string>;
}

export type MemberTypeIdType = 'basic' | 'business';
export interface IMemberType {
  id: MemberTypeIdType;
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
