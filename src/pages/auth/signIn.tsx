import type { LoginAuth } from '@common/auth';
import { Lock } from '@components/ui/Lock';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form';

const SignInPage = () => {

  const [ locked, setStatus ] = useState(true);
  const { register, handleSubmit } = useForm<LoginAuth>({
    mode: 'all', shouldFocusError: true
  });

  const handleLogin: SubmitHandler<LoginAuth> = async ( data ) => {
    const res = await signIn('credentials', { redirect: false, ...data });
    console.log(res);
  }

  return (
    <div className='h-screen flex justify-center items-center bg-slate-700 text-white'>
      <div className='w-[70%] h-[70%] rounded shadow-2xl flex flex-col items-center justify-center'>
        <Lock isLocked={locked} />

        <h1 className='text-2xl font-mono'>Sign in</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(handleLogin)}>
          <div>
            <div>Email</div>
            <input type="text" className='bg-red-500 rounded' {...register('email')} />
          </div>
          <div>
            <div>Password</div>
            <input type="password" className='bg-red-500 rounded' {...register('password')} />
          </div>

          {/* onClick={() => setStatus(!locked)} */}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage;