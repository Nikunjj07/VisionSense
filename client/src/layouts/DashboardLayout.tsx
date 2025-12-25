import { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PieChart, School, FileText, Video, Moon, Sun } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useTheme } from "@/components/theme-provider"

export default function DashboardLayout() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { setTheme, theme } = useTheme()

    const NavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted ${isActive ? "bg-muted text-primary" : "text-muted-foreground"
                } ${isCollapsed ? "justify-center" : ""}`
            }
            onClick={() => setIsMobileOpen(false)}
            title={isCollapsed ? label : ""}
        >
            <Icon className="h-4 w-4" />
            {!isCollapsed && <span>{label}</span>}
        </NavLink>
    )

    const navItems = [
        { to: "/", icon: PieChart, label: "Analysis" },
        { to: "/classes", icon: School, label: "Classes" },
        { to: "/records", icon: FileText, label: "Student-Records" },
        { to: "/live", icon: Video, label: "Live-Cam" },
    ]

    return (
        <div className={`grid min-h-screen w-full transition-all duration-300 ${isCollapsed ? "md:grid-cols-[60px_1fr]" : "md:grid-cols-[240px_1fr]"}`}>
            <div className="hidden border-r bg-muted/40 md:block transition-all duration-300">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className={`flex h-14 items-center border-b px-4 lg:h-[60px] ${isCollapsed ? "justify-center" : "px-6"}`}>
                        {!isCollapsed && <span className="font-semibold text-lg">Vision Sense</span>}
                        {isCollapsed && <span className="font-semibold text-lg">VS</span>}
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-2 text-sm font-medium">
                            {navItems.map((item) => (
                                <NavItem key={item.to} {...item} />
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col w-[240px]">
                            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                                <span className="font-semibold text-lg">Vision Sense</span>
                            </div>
                            <nav className="grid gap-2 text-lg font-medium">
                                {navItems.map((item) => (
                                    <NavItem key={item.to} {...item} />
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>

                    <div className="w-full flex-1">
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />     //Dynamic Avatar Image
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
