import { useState } from 'react';
import Image from 'next/image';
import { RootLayout } from '@components/layouts';
import { ProductCard, Rating } from '@components/ui';
import { trpc } from '@utils/trpc'
import clsx from 'clsx';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useForm } from 'react-hook-form';

type FormValues = { qty: number };

const ProductPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  const [selectedImg, selectImg] = useState(0);
  const res = trpc.products.getById.useQuery({ id: Number(id) });
  const products_shared = trpc.products.get.useQuery();

  const { register } = useForm<FormValues>({
    mode: 'all'
  });

  const isNotReady =
    !res.data ||
    res.isLoading ||
    // res.isFetching ||
    // res.isRefetching ||
    !res.isSuccess

  if (isNotReady) return <div>Loading...</div>

  return (
    <RootLayout loading={isNotReady}>
      <div className='border p-4'>
        <div className='flex h-screen'>
          {/* Product imgs */}
          <div className='flex justify-start h-full gap-10 min-w-[55%]'>
            <div className='flex flex-col gap-2 h-20 w-10'>
              {res.data.images.map((img, i) => {
                const selected = i;
                return (
                  <Image
                    key={i}
                    id={`${selected}`}
                    src={img}
                    alt={`${i}`}
                    height={256}
                    width={256}
                    priority
                    onClick={() => selectImg(selected)}
                    className={clsx(
                      "border border-neutral-900 hover:cursor-pointer",
                      { "border-orange-500 shadow shadow-orange-400": selectedImg === selected }
                    )}
                  />
                )
              }
              )}
            </div>
            <div className='max-h-[50%] max-w-[70%] w-full h-full'>
              <Image
                src={res.data.images[selectedImg] ?? ''}
                alt='test'
                width={256}
                height={256}
                className="object-contain max-h-[100%] h-full max-w-[100%] w-full m-auto"
                priority
              />
            </div>
          </div>

          {/* Product info */}
          <div className='border p-4 rounded-lg max-h-[80%]'>
            <div className='text-2xl my-4 capitalize'>{res.data.description}</div>
            <Rating rating={res.data.rating} />
            <hr />
            <div className='flex flex-col mt-2'>
              <div className='flex items-center gap-3'>
                <span className='text-red-700'>-22%</span>
                <div>
                  <span className='text-slate-500 text-sm relative -top-1'>Price:</span>
                  <span className='ml-1 text-xl'>${res.data.price}</span>
                </div>
              </div>
              <span className='text-gray-500 text-sm'>Was:
                <span className='line-through'> ${((res.data.price * 100) / (100 - res.data.discountPercentage)).toFixed(2)}</span>
              </span>
              <span
                className={clsx(
                  "text-red-700", {
                  "hidden": res.data.stock > 20
                }
                )}
              >- In stock: {res.data.stock} units</span>

              <div className='flex flex-col gap-10'>
                <select
                  className="my-2 w-[22%] bg-gray-200 rounded-md text-sm shadow shadow-slate-400 outline-none hover:bg-gray-300 hover:cursor-pointer"
                  {...register('qty', {
                    onChange: e => {
                      if (e.target.value === '6') {
                        console.log(e.target.value)
                      }
                    }
                  })}
                >
                  <optgroup label='Quantity'>
                    {[...Array(res.data.stock)].map((_, i) => {
                      if (i < 6) {
                        const currQty = i + 1;
                        return (
                          <option
                            key={i}
                            value={currQty}
                          >
                            Qty: {`${currQty === 6 ? `${currQty}+` : currQty}`}
                          </option>
                        );
                      }
                    })}
                  </optgroup>
                </select>
                <hr />
                <div>
                  <div className='flex justify-around'>
                    <div className='flex flex-col font-semibold'>
                      <span>Product</span>
                      <span>Brand</span>
                      <span>Category</span>
                    </div>
                    <div className='flex flex-col capitalize'>
                      <span>{res.data.title}</span>
                      <span>{res.data.brand}</span>
                      <span>{res.data.category}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className='grid grid-cols-2 gap-4 h-full'>
                  <button
                    className={clsx(
                      "bg-yellow-400 rounded-xl p-1 shadow-lg hover:bg-yellow-500/80"
                    )}>Add to Cart
                  </button>

                  <button
                    className={clsx(
                      "bg-orange-400 rounded-xl p-1 shadow-lg hover:bg-orange-500"
                    )}>Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mb-10' />
        <div className=''>
          <h3 className='text-2xl text-orange-500 font-mono mb-4'>Products related to this item</h3>
          <div className='flex overflow-auto gap-4'>
            {
              products_shared.data?.products.map(p => (
                <ProductCard product={p} key={p.id} />
              ))
            }
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log({ query: ctx.query, params: ctx.params })
  return {
    props: {
      id: ctx.query.id
    }
  }
}


export default ProductPage;