import { createRouter } from './context';
import { z } from 'zod';

export const subjectRouter = createRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      number: z.number(),
      description: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subject.create({ data: input });
    },
  })

  .mutation('update', {
    input: z.object({
      id: z.number(),
      name: z.string(),
      number: z.number(),
      description: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subject.update({
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
      return await ctx.prisma.subject.delete({
        where: { id: input.id },
      });
    },
  })

  .mutation('setTags', {
    input: z.object({
      subjectId: z.number(),
      tags: z.object({ id: z.number() }).array(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subject.update({
        where: { id: input.subjectId },
        data: {
          tags: { set: input.tags },
        },
      });
    },
  })

  .mutation('deleteTag', {
    input: z.object({
      subjectId: z.number(),
      tagId: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.subject.update({
        where: { id: input.subjectId },
        data: {
          tags: { disconnect: { id: input.tagId } },
        },
      });
    },
  })

  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.subject.findMany({
        orderBy: { number: 'asc' },
        include: { tags: { orderBy: { name: 'asc' } } },
      });
    },
  });
