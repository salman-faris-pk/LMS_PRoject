import TopSection from '@/components/TopSection'
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Page = () => {
  return (
    <>
      <TopSection
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sign-up" },
        ]}
      />
      <section className="bg-white md:py-10">
        <div className="w-full max-w-md p-6 m-auto bg-white rounded-lg shadow-md">
          {/* Page Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Create an Account
          </h2>

          <form className="mt-6">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="mt-2 p-5"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2 p-5"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2 p-5"
              />
            </div>

            {/* Submit */}
            <div className="mt-6">
              <Button className="w-full">Sign Up</Button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b border-gray-300"></span>
            <p className="text-xs text-center text-gray-500 uppercase mb-5">
              or register with
            </p>
            <span className="w-1/5 border-b border-gray-300"></span>
          </div>

          {/* Social Login Buttons - Full Width */}
          <div className="mt-6 space-y-3">
            {/* Google Button */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>

            {/* GitHub Button */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.6 3 1.1.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.3 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4.1-2.6 5-5.1 5.3.4.3.7.9.7 1.9v2.9c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z"
                />
              </svg>
              <span>Continue with GitHub</span>
            </Button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-xs font-light text-center text-gray-500">
            Already have an account?{" "}
            <a
              href="/auth-login"
              className="font-medium text-gray-700 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

export default Page
