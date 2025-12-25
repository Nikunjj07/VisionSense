import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, MoreVertical } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const classesData = [
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
]

export default function Classes() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Arrange Classes</h1>
                    <p className="text-sm text-muted-foreground">Schedule and Start Sessions</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            Add New <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Class</DialogTitle>
                            <DialogDescription>
                                Create a new class schedule. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Class Name
                                </Label>
                                <Input id="name" placeholder="e.g. Class 12-A" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lectures">
                                    No. of Lectures
                                </Label>
                                <Input id="lectures" type="number" placeholder="5" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
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
