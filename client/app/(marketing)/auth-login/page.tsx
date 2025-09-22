"use client"
import React, { useState } from 'react';
import { useActionState } from 'react';
import TopSection from '@/components/TopSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from './api/signIn';
import { SignInState } from '@/lib/validation-schemas';


const initialState: SignInState = {
  message: '',
  errors: {},
  fieldValues: { email: '', password: '' },
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(signIn, initialState);

  return (
    <>
      <TopSection
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sign-In" },
        ]}
      />

      <section className="bg-white md:py-10">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Welcome back!
          </h2>
           <Button
            variant="outline"
            size="lg"
            className="mt-6 w-full flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
               <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
           </svg>
            Sign in with Google
           </Button>

         <Button
            variant="outline"
            size="lg"
            className="mt-6 w-full flex items-center justify-center gap-2"
          >
         <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
           <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.6 3 1.1.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.3 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4.1-2.6 5-5.1 5.3.4.3.7.9.7 1.9v2.9c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z"
              />
            </svg>
            Sign in with GitHub
          </Button>

          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b"></span>
            <p className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </p>
            <span className="w-1/5 border-b"></span>
          </div>

          <form action={action}>
            <div className="mt-6">
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="p-5"
                defaultValue={state.fieldValues?.email}
                required
              />
              {state.errors?.email && (
                <span className="text-xs text-red-700">{state.errors.email.join(', ')}</span>
              )}
            </div>

            <div className="mt-4 relative">
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="p-5 pr-12"
                defaultValue={state.fieldValues?.password}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-[2.2rem] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {state.errors?.password && (
                <span className="text-xs text-red-700">{state.errors.password.join(', ')}</span>
              )}
            </div>

            <Button className="mt-6 w-full" size="lg" disabled={isPending}>
              {isPending ? 'Signing ...' : 'Sign In'}
            </Button>

            {state.message && (
              <p className="w-full bg-red-100 mt-2 p-3 rounded-md text-xs text-red-800">
                {state.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
