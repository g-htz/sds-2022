import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createAdminRouter } from './protected-router';

// Example router with queries that can only be hit if the user requesting is signed in
export const adminRouter = createAdminRouter()
  .mutation('deleteUser', {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      const admin = await ctx.prisma.user.findFirst({
        where: { id: { not: ctx.session.user.id }, role: 'ADMIN' },
      });
      if (!admin)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Please nominate another admin first',
        });
      const user = await ctx.prisma.user.delete({ where: { id: input.id } });
      return user;
    },
  })

  .mutation('updateUser', {
    input: z.object({
      id: z.string().cuid(),
      role: z.enum(['ADMIN', 'USER']).optional(),
      name: z.string().optional(),
      email: z.string().email().optional(),
    }),
    async resolve({ ctx, input }) {
      if (input.id === ctx.session.user.id && input.role === 'USER') {
        const admin = await ctx.prisma.user.findFirst({
          where: { id: { not: ctx.session.user.id }, role: 'ADMIN' },
        });
        if (!admin)
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Please nominate another admin first',
          });
      }
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
      return user;
    },
  })

  .query('getUsers', {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany({ orderBy: { name: 'asc' } });
    },
  });

