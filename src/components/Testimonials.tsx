import Autoplay from "embla-carousel-autoplay"
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react"
import { User2 } from "lucide-react";
 
type Testimonial = {
    id: string;
    userName: string;
    review: string;
  };

  const testimonials: Testimonial[] = [
    {
      id: "1",
      userName: "John Doe",
      review: "This service is amazing! I highly recommend it.",
    },
    {
      id: "2",
      userName: "Jane Smith",
      review: "A fantastic experience! Will definitely use it again.",
    },
    // Add more testimonials here
  ];






export function Testimonials() {


  





  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  )
 
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {testimonials.map((t, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex flex-col  items-center justify-center gap-y-8 p-6">
                  
                  <div className="flex flex-row justify-start gap-x-2">
                    <User2 />
                  <span className="text-4 ">{t.userName}</span>
                  </div>

                  <span className="text-4 ">{t.review}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}