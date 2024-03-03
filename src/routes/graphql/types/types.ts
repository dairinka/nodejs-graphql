import { PrismaClient } from '@prisma/client';

export interface CreateUser {
  name: string;
  balance: number;
}
export interface Context {
  db: PrismaClient;
  dataUsers?: Record<string, unknown>[];
}
export type MemberTypeIdType = 'basic' | 'business';
