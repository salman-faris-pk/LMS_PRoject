import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import underlineShape from "@/assets/shape-2.webp"
import Image from "next/image"

type BreadcrumbType = {
  label: string
  href?: string
}

type PageHeaderProps = {
  breadcrumbs?: BreadcrumbType[]
  title?: string
  highlight?: string
}

const TopSection = ({ breadcrumbs = [], title,highlight }: PageHeaderProps) => {

  const parts = highlight && title ? title.split(highlight) : [title]

  return (
      <div className="w-full bg-secondary py-8 md:py-12">
       <Breadcrumb className="container px-4 md:px-12">
    <BreadcrumbList>
    {breadcrumbs.map((bc, idx) => (
      <React.Fragment key={idx}>
        <BreadcrumbItem key={idx} className="text-md md:text-lg font-medium">
          {bc.href ? (
            <BreadcrumbLink asChild>
              <Link href={bc.href} className="hover:text-primary">
                {bc.label}
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="text-primary">{bc.label}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    ))}
  </BreadcrumbList>
</Breadcrumb>

       <h1 className="container relative px-4 md:px-10 mt-8 tracking-wide text-xl md:text-4xl font-normal text-gray-700">
        {parts[0]}
        {highlight && (
          <span className="relative inline-block text-primary ml-1">
            {highlight}
            <Image
              src={underlineShape}
              alt="underline"
              width={120}
              height={10}

              className="absolute left-2 md:left-5 -bottom-3 md:-bottom-4 object-contain"
            />
          </span>
        )}
        {parts[1]}
      </h1>
    </div>
  )
}

export default TopSection