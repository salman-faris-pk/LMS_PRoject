import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const CourseCard = () => {

  const courses = [
    {
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      description: "Learn advanced React patterns including compound components, render props, and hooks best practices.",
      duration: "8 hours",
      students: 1250,
      rating: 4.8,
      progress: 65,
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Python for Data Science",
      instructor: "Michael Chen",
      description: "Master Python for data analysis, visualization, and machine learning with real-world projects.",
      duration: "12 hours",
      students: 3421,
      rating: 4.9,
      progress: 30,
      category: "Data Science",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "UX/UI Design Fundamentals",
      instructor: "Emma Rodriguez",
      description: "Learn the principles of user experience and interface design with hands-on projects.",
      duration: "6 hours",
      students: 876,
      rating: 4.7,
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      {courses.map((course, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
          {/* Course Image */}
          <div className="relative h-48 w-full">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-2 left-2 bg-white text-primary hover:bg-white">
              {course.category}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
            <CardDescription className="line-clamp-1">By {course.instructor}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            </div>

            {course.progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="ghost">
              <BookOpen className="mr-2 h-4 w-4" />
              Details
            </Button>
            <Button>
              {course.progress ? "Continue" : "Enroll"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CourseCard