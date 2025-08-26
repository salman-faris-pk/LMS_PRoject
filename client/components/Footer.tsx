import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary mt-16">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe our newsletter to get update.
            </h1>

            <div className="flex flex-col mt-6 space-y-3 md:flex-row md:space-y-0 md:space-x-2">
              <Input 
                id="email" 
                type="text" 
                className="px-4 py-6 text-gray-700 bg-white border rounded-md focus:border-primary focus:ring-primary/40 focus:outline-none focus:ring" 
                placeholder="Email" 
              />
              
              <Button 
                className="px-4 py-6 text-white bg-primary border border-primary hover:bg-primary/90 transition-colors duration-300"
              >
                Subscribe
              </Button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Quick Link</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link href="/" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Home</Link>
              <Link href="/contact" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Who We Are</Link>
              <Link href="/blog" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Our Philosophy</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Industries</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Retail & E-Commerce</a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Information Technology</a>
              <a href="#" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-primary">Finance & Insurance</a>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-gray-200 md:my-8" />
        
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="company-logo"
              className="h-9 w-auto"
              priority
            />
            <span className="text-3xl font-bold">
              <span className="text-black/80">Mr</span>
              <span className="text-primary">Code</span>
            </span>
          </Link>
          
          <div className="text-sm text-gray-600">
            © Copyright {year}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer