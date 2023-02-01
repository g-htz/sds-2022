// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { adminRouter } from './admin';
import { subjectRouter } from './subject';
import { subjectTagRouter } from './subjectTag';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('admin.', adminRouter)
  .merge('subject.', subjectRouter)
  .merge('tag.', subjectTagRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
