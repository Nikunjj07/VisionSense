import {  ArrowDown, ArrowRight, MoveRight, PhoneCall,Stars } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Badge } from "./badge";
import { PaperDesignBackground } from "../neon-dither";
function Hero1() {
  return (
   <>
  <PaperDesignBackground className="absolute"/>
  <div className="w-full flex flex-row justify-center items-center absolute">

<div className="h-[300px] w-[300px] bg-primary rounded-full blur-[150px]"></div>

  </div>
        <div className="w-full h-auto relative  px-10" id="Home">
            
      <div className=" mx-auto">
        
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col ">
          <div>
         <Badge variant="default">Future of attendance-system <Stars size={12} className="ml-2" fill="white"/></Badge>
          </div>
          <div className="flex gap-4 flex-col">
     
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-semibold">
       <div className="relative flex justify-center items-center">
   <span className="absolute blur-xl bg-gradient-to-br from-emerald-500 to-lime-500 bg-clip-text text-transparent font-semibold">VisionSense</span>
   <span className="relative font-semibold">Vision<span className="text-primary">Sense</span></span>  
       </div>
<div>Attendance management system</div>
            </h1>
            <p className="mt-2 text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
       Vision-sense helps managing the attendance and mental health of students through our proffeisnol trained model used for analysis for attention span of the student
            </p>
          </div>



          <div className="flex lg:flex-row md:flex-row flex-col gap-3">
            <Button size="lg" className="gap-4" variant="outline">
           Get Started <ArrowRight/>
            </Button>
            <Button size="lg" className="gap-4">
             View More <ArrowDown/>
            </Button>


            
          </div>
        
        
              
     
        </div>
        
      </div>
      
    </div>
   </>

  );
}

export { Hero1 };
