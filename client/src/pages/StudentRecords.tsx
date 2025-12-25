
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, MoreVertical, Upload, CloudUpload, X, FileImage } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentRecords() {
    const [studentsData, setStudentsData] = useState([
        { id: "ST-001", name: "Alice Johnson", class: "10-A", status: "Uploaded" },
        { id: "ST-002", name: "Bob Smith", class: "10-A", status: "Not Uploaded" },
        { id: "ST-003", name: "Charlie Brown", class: "10-B", status: "Uploaded" },
        { id: "ST-004", name: "Diana Prince", class: "11-C", status: "Not Uploaded" },
        { id: "ST-005", name: "Evan Wright", class: "12-A", status: "Uploaded" },
    ])
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newName, setNewName] = useState('')
    const [newClass, setNewClass] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            if (selectedFiles.length + newFiles.length > 5) {
                alert("You can only upload a maximum of 5 files.")
                return
            }
            setSelectedFiles([...selectedFiles, ...newFiles])
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files)
            if (selectedFiles.length + newFiles.length > 5) {
                alert("You can only upload a maximum of 5 files.")
                return
            }
            setSelectedFiles([...selectedFiles, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Student Records</h1>
                    <p className="text-sm text-muted-foreground">Manage student data and uploads.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            Add New <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Student</DialogTitle>
                            <DialogDescription>
                                Enter student details here.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            const maxId = studentsData.length > 0 ? Math.max(...studentsData.map(s => parseInt(s.id.split('-')[1]))) : 0
                            const newId = `ST-${String(maxId + 1).padStart(3, '0')}`
                            const newStudent = {
                                id: newId,
                                name: newName,
                                class: newClass,
                                status: "Not Uploaded"
                            }
                            setStudentsData([...studentsData, newStudent])
                            setNewName('')
                            setNewClass('')
                            setIsDialogOpen(false)
                        }}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="class">
                                    Class
                                </Label>
                                <Select value={newClass} onValueChange={setNewClass}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10-A">10-A</SelectItem>
                                        <SelectItem value="10-B">10-B</SelectItem>
                                        <SelectItem value="11-A">11-A</SelectItem>
                                        <SelectItem value="11-B">11-B</SelectItem>
                                        <SelectItem value="12-A">12-A</SelectItem>
                                        <SelectItem value="12-B">12-B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Student</Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Students Directory</CardTitle>
                    <CardDescription>A list of all students and their document status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentsData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.status === "Uploaded" ? "default" : "destructive"}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {student.status === "Not Uploaded" ? (
                                            <Dialog onOpenChange={() => setSelectedFiles([])}>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="gap-2">
                                                        <Upload className="h-4 w-4" /> Upload
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>Upload Documents</DialogTitle>
                                                        <DialogDescription>
                                                            Upload up to 5 photos for {student.name}.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div
                                                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
                                                            onDragOver={handleDragOver}
                                                            onDragLeave={handleDragLeave}
                                                            onDrop={handleDrop}
                                                            onClick={triggerFileInput}
                                                        >
                                                            <CloudUpload className="h-10 w-10 text-muted-foreground mb-4" />
                                                            <p className="text-sm text-muted-foreground text-center">
                                                                Drag and drop your files here or click to select.<br />
                                                                (Max 5 photos)
                                                            </p>
                                                            <Input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                className="hidden"
                                                                multiple
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                        {selectedFiles.length > 0 && (
                                                            <div className="grid gap-2">
                                                                {selectedFiles.map((file, index) => (
                                                                    <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                                            <FileImage className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                                            <span className="text-sm truncate">{file.name}</span>
                                                                        </div>
                                                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                                                                            <X className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={selectedFiles.length === 0}>
                                                            Confirm Upload ({selectedFiles.length})
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        ) : (
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

