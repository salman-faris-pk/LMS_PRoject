import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TypingAnimation } from "@/components/magicui/typing-animation";


const Hero = () => {
  return (
    <div className="mt-24 sm:mt-14 md:mt-10 flex flex-col items-center justify-center text-center gap-4 md:gap-6 py-12 md:py-20 px-4">
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Transform{' '}
          <span>
             knowledge 
          </span>
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
           into{' '}
          <span>
             mastery
          </span>
        </h2>
      </div>
      
      <TypingAnimation className="max-w-prose font-normal text-xs sm:text-base md:text-lg text-muted-foreground">
        Join thousands of students mastering new skills through our interactive courses 
        and expert-led curriculum. Start your learning journey today.
      </TypingAnimation>
      
      <div className="flex gap-3 w-full justify-center max-w-md">
        <Button variant="outline" size="lg" className="gap-1 px-4 sm:px-6">
          Sign In
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" className="gap-1 px-4 sm:px-6">
            Browse Courses
          <ArrowRight className="h-4 w-4" />
        </Button>

      </div>
    </div>
  )
}

export default Hero
