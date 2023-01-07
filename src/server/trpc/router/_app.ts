import { router } from "../trpc";
import { authRouter } from "./auth";
import { shopRouter } from './shop';

export const appRouter = router({
  auth: authRouter,
  products: shopRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
