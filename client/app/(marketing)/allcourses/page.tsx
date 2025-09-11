import TopSection from '@/components/TopSection'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from "sonner"

const page = () => {
  return (
    <div>
      <TopSection title="All Courses"
         breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses" },
        ]}
        highlight='Courses'
      />
   
       
        All courses page</div>
  )
}

export default page