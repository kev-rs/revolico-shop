import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import svg from '../../../public/favicon.ico'

export const Loader: React.FC<{ amount?: number }> = ({ amount = 1 }) => {
  return (
    <>
      {
        Array(amount).fill(0).map((_, i) => (
          <div className='border p-1' key={i}>
            <Skeleton height={300} className="rounded-none" />
            <Skeleton count={4} className="rounded-none" />
            <Skeleton width={100} className="rounded-none" />
          </div>
        ))
      }
    </>
  )
}

{/* <div>
              bg-[url('/img/hero-pattern.svg')]
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-[100%]">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>

            </div> */}