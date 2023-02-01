import { createRouter } from './context';
import { z } from 'zod';

export const subjectTagRouter = createRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subjectTag.create({ data: input });
    },
  })

  .mutation('update', {
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subjectTag.update({
        where: { id: input.id },
        data: input,
      });
    },
  })

  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subjectTag.delete({
        where: { id: input.id },
      });
    },
  })

  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.subjectTag.findMany({
        orderBy: { name: 'asc' },
      });
    },
  });
