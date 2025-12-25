import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LiveCam() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Vision Sense</h1>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Camera Feed */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Live Camera</h2>
                        <p className="text-sm text-muted-foreground">Real-time student image capture and verification</p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Camera Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full bg-black rounded-md flex items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 right-4">
                                    <Badge variant="destructive" className="animate-pulse">REC</Badge>
                                </div>
                                <div className="text-muted-foreground text-sm">Camera Feed Placeholder</div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Start</Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column: Student Details */}
                <div className="flex flex-col gap-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Student Details</h2>
                        <p className="text-sm text-muted-foreground">Current student information</p>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 mb-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="text-xl">AK</AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <div className="font-semibold text-lg">Aarav Kumar</div>
                                    <div className="text-sm text-muted-foreground">Class 10A</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-medium text-muted-foreground">SPID</span>
                                    <span className="text-sm font-semibold">SP001</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-medium text-muted-foreground">Roll No</span>
                                    <span className="text-sm font-semibold">01</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                                    <span className="text-sm font-semibold">aarav@example.com</span>
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                                    <Badge variant="outline" className="text-green-600 border-green-600">Verified</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
