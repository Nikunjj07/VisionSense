import { Background } from "@/components/background-snippets"
import { FeatureGrid } from "@/components/feature-section"

import {



  User,
  PieChart,
  BrainCircuit
  

} from 'lucide-react';
import { Navbar1 } from "@/components/ui/navbar-1"
import TeamSection from "@/components/team";
import {FooterSection} from "@/components/footer";
import { Feature2 } from "@/components/feature-2";

export function Landing()
{

    const featureCategories = [
  {
    icon: <PieChart size={24} />,
    title: 'Student and class wise Analytics',
    items: [
      { text: 'Analysis Provides you a better view' },
      { text: 'of students attention-span and ' },
      { text: 'attitude towards academics and way to improve it' },
    ],
  },
  {
    icon: <User size={24} />,
    title: 'Student Records Managment',
    items: [
      { text: 'We provide storage to store this automated' },
      { text: 'student records on our dashboard' },
      
    ],
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'Ai Suggestions',
    items: [
      { text: 'Get suggestions provided' },
      { text: 'by our ai to improve perfomance' },
      { text: 'and optimize perfomance of students' },
    ],
  },

];
    return(
        <>
<div className="bg-background h-screen w-screen flex flex-col justify-start items-center ">
    <div className="lg:w-7xl md:w-full w-full h-full flex flex-col justify-start items-center">
<Navbar1/>
        <Background/>
        
 <div className="w-7xl flex justify-center items-center">
   <Feature2   
      title="Who we are?"
      description="As students based in Surat, we are deeply immersed in the dynamic and rapidly evolving fields of Artificial Intelligence (AI) and Software as a Service (SaaS) development. Our academic journeys are complemented by a fervent passion to not only understand the theoretical underpinnings of these transformative technologies but also to actively contribute to their advancement."
      imageSrc="public/clip-removebg-preview.png"
      imageAlt="placeholder hero"
  />
 </div>

   <FeatureGrid
        title={
          <>
           What we provide?{' '}
            <span className="relative inline-block">
              to you
              <svg
                viewBox="0 0 120 6"
                className="absolute left-0 bottom-0 -mb-1 w-full"
                aria-hidden="true"
              >
                <path
                  d="M1 4.5C25.46 1.63 78.43 1.39 119 4.5"
                  stroke="#6cd720ff" // pink-400
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </>
        }
        subtitle="Explore Our Features"
        illustrationSrc="https://tally.so/images/demo/v2/designed-for-you.png" // Replace with your image link
        categories={featureCategories}
        buttonText="Get started now!"
        buttonHref="#"
      />

      <TeamSection/>

<FooterSection/>
    </div>
</div>
        </>
    )
}