import React from "react";
import type { Product } from "@types";
import Image from "next/image";
import clsx from 'clsx';
import { Rating } from "@ui";
import Link from "next/link";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border flex flex-col">
      <div className="bg-gray-50 max-h-[50%] h-full">
        <Link href={`/product/${product.id}`} passHref>
          <Image
            className="object-contain m-auto max-h-full max-w-full h-auto w-auto hover:cursor-pointer"
            src={/* eslint-disable */ product.images[0]!}
            alt="img1"
            height={256}
            width={256}
            priority
          />
        </Link>
      </div>
      <div className="p-2 flex flex-col items-start gap-2">
        <Link href={`/product/${product.id}`} passHref>
          <p className="capitalize hover:text-orange-400 hover:cursor-pointer">{product.title}</p>
        </Link>
        <Link href={`/product/${product.id}`} passHref>
          <p className="text-base hover:text-orange-400 hover:cursor-pointer">{product.description}</p>
        </Link>
        <Rating rating={product.rating} />
        <div className="bg-red-700 flex justify-center">
          <p className="p-1 px-2 text-white text-xs">Save {product.discountPercentage}%</p>
        </div>
        <p
          className="before:content-['$'] font-semibold text-2xl before:text-xs before:relative before:bottom-2 before:font-normal after:content-['99'] after:text-xs after:relative after:-top-2 after:font-normal"
        >{product.price}</p>
        <p className={clsx(
          "block text-red-700 text-xs", {
          "hidden": product.stock > 20
        }
        )}>Only {product.stock} left in stock - order soon</p>
      </div>
    </div>
  );
};
