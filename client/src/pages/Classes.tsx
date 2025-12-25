import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, MoreVertical } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"



export default function Classes() {
    const [classesData, setClassesData] = useState([
    {
        id: 1,
        name: "Class-12-A",
        teacher: "Mr. Sarah Wilson",
        students: 45,
        lectures: [
            { id: 1, name: "Lecture-1", status: "Finished", time: "09:00 AM" },
            { id: 2, name: "Lecture-2", status: "Ongoing", time: "10:00 AM" },
            { id: 3, name: "Lecture-3", status: "Scheduled", time: "11:00 AM" },
            { id: 4, name: "Lecture-4", status: "Scheduled", time: "12:00 PM" },
            { id: 5, name: "Lecture-5", status: "Scheduled", time: "01:00 PM" },
        ]
    },
    {
        id: 2,
        name: "Class-11-B",
        teacher: "Mr. John Doe",
        students: 38,
        lectures: [
            { id: 1, name: "Lecture-1", status: "Finished", time: "09:00 AM" },
            { id: 2, name: "Lecture-2", status: "Finished", time: "10:00 AM" },
            { id: 3, name: "Lecture-3", status: "Ongoing", time: "11:00 AM" },
            { id: 4, name: "Lecture-4", status: "Scheduled", time: "12:00 PM" },
            { id: 5, name: "Lecture-5", status: "Scheduled", time: "01:00 PM" },
        ]
    },
    {
        id: 3,
        name: "Class-10-C",
        teacher: "Mrs. Emily Davis",
        students: 42,
        lectures: [
            { id: 1, name: "Lecture-1", status: "Scheduled", time: "09:00 AM" },
            { id: 2, name: "Lecture-2", status: "Scheduled", time: "10:00 AM" },
            { id: 3, name: "Lecture-3", status: "Scheduled", time: "11:00 AM" },
            { id: 4, name: "Lecture-4", status: "Scheduled", time: "12:00 PM" },
            { id: 5, name: "Lecture-5", status: "Scheduled", time: "01:00 PM" },
        ]
    },
])
    const [newClassName, setNewClassName] = useState('')
    const [newTeacherName, setNewTeacherName] = useState('')
    const [newLectures, setNewLectures] = useState(5)
    const [newStudentCount, setNewSetstudentCount] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingClass, setEditingClass] = useState<any>(null)

    useEffect(() => {
        if (editingClass) {
            setNewClassName(editingClass.name)
            setNewTeacherName(editingClass.teacher)
            setNewLectures(editingClass.lectures.length)
        } else {
            setNewClassName('')
            setNewTeacherName('')
            setNewLectures(5)
        }
    }, [editingClass])
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Arrange Classes</h1>
                    <p className="text-sm text-muted-foreground">Schedule and Start Sessions</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            Add New <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
                            <DialogDescription>
                                {editingClass ? 'Edit the class details. Click save when you\'re done.' : 'Create a new class schedule. Click save when you\'re done.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (editingClass) {
                                setClassesData(classesData.map(c => c.id === editingClass.id ? { ...c, name: newClassName, teacher: newTeacherName } : c))
                                setEditingClass(null)
                            } else {
                                const newId = classesData.length > 0 ? Math.max(...classesData.map(c => c.id)) + 1 : 1
                                const newClass = {
                                    id: newId,
                                    name: newClassName,
                                    teacher: newTeacherName,
                                    students: newStudentCount,
                                    lectures: Array.from({ length: newLectures }, (_, i) => ({
                                        id: i + 1,
                                        name: `Lecture-${i + 1}`,
                                        status: "Scheduled",
                                        time: `${9 + i}:00 AM`
                                    }))
                                }
                                setClassesData([...classesData, newClass])
                            }
                            setNewClassName('')
                            setNewTeacherName('')
                            setNewSetstudentCount(0)
                            setNewLectures(5)
                            setIsDialogOpen(false)
                        }}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Class Name
                                </Label>
                                <Input id="name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g. Class 12-A" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="teacher">
                                    Teacher Name
                                </Label>
                                <Input id="teacher" value={newTeacherName} onChange={(e) => setNewTeacherName(e.target.value)} placeholder="e.g. Mr. John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lectures">
                                    No. of Lectures
                                </Label>
                                <Input id="lectures" type="number" value={newLectures} onChange={(e) => setNewLectures(Number(e.target.value))} placeholder="5" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="students">
                                    No. of students
                                </Label>
                                <Input id="students" type="number" value={newStudentCount} onChange={(e) => setNewSetstudentCount(Number(e.target.value))} placeholder="0" />
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classesData.map((cls) => (
                    <Card key={cls.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold">{cls.name}</CardTitle>
                                <CardDescription>{cls.teacher} • {cls.students} Students</CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => {
                                        setEditingClass(cls)
                                        setIsDialogOpen(true)
                                    }}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setClassesData(classesData.filter(c => c.id !== cls.id))}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="space-y-4">
                                {cls.lectures.map((lecture) => (
                                    <div key={lecture.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <span className="text-sm font-medium">{lecture.name}</span>
                                        {lecture.status === "Finished" && (
                                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                                                Finished
                                            </Button>
                                        )}
                                        {lecture.status === "Ongoing" && (
                                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 animate-pulse">
                                                Ongoing
                                            </Button>
                                        )}
                                        {lecture.status === "Scheduled" && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="default" size="sm" className="h-7 text-xs">
                                                        Start
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Start Session</DialogTitle>
                                                        <DialogDescription>
                                                            Set the duration for this session.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="duration">
                                                                Duration (Hours)
                                                            </Label>
                                                            <Input id="duration" type="number" placeholder="1" />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Start Session</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
