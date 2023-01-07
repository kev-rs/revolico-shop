import { prisma } from "@/server/db/client"
import type { Product } from "@types";
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

async function seed() {
  const res =  await (await fetch('https://dummyjson.com/products?limit=100')).json() as { products: Product[] };
  
  await prisma.auth.deleteMany()
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: res.products });
  await prisma.auth.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: bcrypt.hashSync('admin123', 10),
    }
  })
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
