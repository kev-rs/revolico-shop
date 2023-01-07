import Link from 'next/link'
import { ThemeMode } from './Theme'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import clsx from 'clsx'
// import { trpc } from '@utils/trpc'
// import { useContext } from 'react'
// import { SearchContext } from '@context/context'

export const Navbar = () => {

  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const { register, handleSubmit } = useForm<{ search: string; }>({ mode: 'all' });
  // const { searchQuery } = useContext(SearchContext);
  const router = useRouter();

  const handleSearchSubmit: SubmitHandler<{ search: string; }> = ( data ) => {
    // console.log(data);
    // searchQuery(data.search);
    if(data.search.length < 1) return router.push('/search/results_0')
    router.push(`/search/${data.search}`);
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(e.target.value);
  // }

  return (
    <nav className="bg-gray-900 p-2 text-white flex items-center justify-around">
      <div className='flex flex-col gap-2 mb-1'>
        <Link href='/' passHref>
          <h1 className='text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 -rotate-6 hover:cursor-pointer hover:animate-flow'>
            <span className='text-2x font-serif'>Re</span>
            <span className='text-5xl font-serif'>vo</span>l
            <span className='text-3xl font-mono'>ico</span>
          </h1>
        </Link>
        {/* <hr className='rotate-2' /> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative -top-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg> */}
      </div>
      <div className='flex justify-center w-full max-w-[40%]'>
        <div className='bg-orange-300 flex w-full rounded'>
          <form className='w-full' onSubmit={handleSubmit(handleSearchSubmit)}>
            <input type='search' className='w-[100%] rounded-bl rounded-tl text-black p-1' {...register('search')} />
          </form>
          <div className='p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <ThemeMode />
      </div>
      <div className='flex items-center gap-10'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <button 
          onClick={() => router.push('/auth/signIn')}
          className={clsx(
            { "hidden": session.status === "authenticated" }
          )}
        >
          Sign in
        </button>
        <div className='flex'>
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <div className='bg-blue-400 w-5 h-6 rounded-full flex justify-center relative -top-2 right-2'>2</div>
        </div>
      </div>
    </nav>
  )
}
