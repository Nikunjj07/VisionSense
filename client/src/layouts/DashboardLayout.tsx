import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PieChart, School, FileText, Video, Moon, Sun, LogOut, EyeIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { useTheme } from "@/components/theme-provider"
import { DialogDescription,DialogClose,Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"



export default function DashboardLayout() {
    const { setTheme, theme } = useTheme()
const navigate = useNavigate();

const items = [
  {
    title: "Analytics",
    url: "/dashboard",
    icon: PieChart,
  },
  {
    title: "Classes",
    url: "/dashboard/classes",
    icon: School,
  },
  {
    title: "Student-records",
    url: "/dashboard/records",
    icon: FileText,
  },
  {
    title: "live-cam",
    url: "/dashboard/live",
    icon: Video,
  },

]

    return (
   <>
<SidebarProvider>
    
     <Sidebar collapsible="icon">
        <SidebarHeader className="w-full flex justify-center items-center">
<SidebarContent className="w-full flex flex-row justify-start items-center gap-1  py-2">
<Avatar className="bg-primary flex justify-center items-center h-8 w-8">
<EyeIcon/>
</Avatar>
<h1 className="text-xl font-bold">Vision<span className="text-primary">Sense</span></h1>
</SidebarContent>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tracking-wide uppercase">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
           <SidebarMenuItem>
         {
            items.map((item:any)=>
            (
                <SidebarMenuButton variant="accent" onClick={()=>
                {
                    navigate(item.url)
                }
                }>
                    <item.icon size={15}/>
                 {item.title}
                </SidebarMenuButton>
            ))
         }

           </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      
      </SidebarContent>
        <SidebarFooter  className="w-full flex justify-center items-center">
 <SidebarContent className="w-full flex flex-row justify-start items-center gap-1 border-t border-neutral-700 py-2">
<Avatar className="h-8 w-8" >
    <AvatarFallback className="bg-primary text-xs">{"xyz@gmail.com"[0] + "xyz@gmail.com"[1]}</AvatarFallback>
</Avatar>
<div className="flex-1 flex flex-col justify-start items-start">
<h1 className="lg:text-sm md:text-sm text-sm">{"xyz@gmail.com".replace("@gmail.com","")}</h1>
<span className="text-neutral-500 text-xs">{"xyz@gmail.com"}</span>
</div>
<Dialog>
    <DialogTrigger>
        <Button variant="outline" className="ml-5" size="sm" >
    <LogOut size={10}/> Logout
</Button>
    </DialogTrigger>
    <DialogContent>
    <div className="flex flex-col justify-start items-center mt-5 gap-1">
    <DialogTitle>You Sure You want to Logout from this Account?</DialogTitle>
    <DialogDescription>You Can Log-in back later your all info will be saved.</DialogDescription>
    </div>
        <div className="w-full mt-5 flex flex-row justify-between gap-2 items-center">
           <div className="flex-1"><Button className="w-full">Yes</Button></div> 
            <DialogClose className="flex-1"><Button className="w-full" variant="secondary">Cancel</Button></DialogClose>
        </div>
    </DialogContent>
</Dialog>
 </SidebarContent>




     
        </SidebarFooter>
    </Sidebar>
<section className="h-full w-full flex flex-col justify-start items-center px-10 py-5">
<nav className="w-full flex justify-between items-center h-fit">

<SidebarTrigger/>


 <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
</nav>
   <div className="w-full h-fit">
      <Outlet />
   </div>
</section>
</SidebarProvider>
   </>
    )
}