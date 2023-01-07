import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@server/db/client";
import { TRPCError } from "@trpc/server";

export const shopRouter = router({
  get: publicProcedure.query(async () => {
    const products = await prisma.product.findMany();
    return { products };
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({ where: { ...input } });
      if(!product) throw new TRPCError({ code: 'NOT_FOUND' });
      return product;
    }),
  search: publicProcedure
    .input(z.object({ search: z.string().min(1) }))
    .query(async ({ input }) => {
      const searchQuery = await prisma.product.findMany({
        where: {
          OR: [
            { description: { ...input, mode: 'insensitive'}}, { description: { contains: input.search, mode: 'insensitive', }}, { description: { startsWith: input.search, mode: 'insensitive' }}, { description: { endsWith: input.search, mode: 'insensitive' }},
            { title: { ...input, mode: 'insensitive'}}, { title: { contains: input.search, mode: 'insensitive', }}, { title: { startsWith: input.search, mode: 'insensitive' }}, { title: { endsWith: input.search, mode: 'insensitive' }},
            { brand: { ...input, mode: 'insensitive'}}, { brand: { contains: input.search, mode: 'insensitive', }}, { brand: { startsWith: input.search, mode: 'insensitive' }}, { brand: { endsWith: input.search, mode: 'insensitive' }},
            { category: { ...input, mode: 'insensitive'}}, { category: { contains: input.search, mode: 'insensitive', }}, { category: { startsWith: input.search, mode: 'insensitive' }}, { category: { endsWith: input.search, mode: 'insensitive' }},
          ],
        },
      });

      return searchQuery;
    })
})