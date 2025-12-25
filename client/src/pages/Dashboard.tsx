
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart, CartesianGrid, Area, AreaChart } from "recharts"




export default function Dashboard() {
    const [chartType, setChartType] = useState("bar")
    const [classData, _setClassData] = useState([
        { name: "Class A", average: 85, attendance: 92 },
        { name: "Class B", average: 78, attendance: 88 },
        { name: "Class C", average: 92, attendance: 95 },
        { name: "Class D", average: 65, attendance: 75 },
        { name: "Class E", average: 72, attendance: 82 },
    ])
    const [studentData, _setStudentData] = useState([
        { name: "Mon", present: 450, absent: 50 },
        { name: "Tue", present: 460, absent: 40 },
        { name: "Wed", present: 455, absent: 45 },
        { name: "Thu", present: 470, absent: 30 },
        { name: "Fri", present: 440, absent: 60 },
    ])
    const [totalStudents, _setTotalStudents] = useState(3000);
    const [activeClasses, _setActiveClasses] = useState(20);
    const [attendanceRate, _setAttendanceRate] = useState("56%");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Analytics Page</h1>
                <div className="flex items-center gap-2">
                    <Select value={chartType} onValueChange={setChartType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Chart Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                        </SelectContent>
                    </Select>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10a">10th-A</SelectItem>
                             <SelectItem value="10b">10th-B</SelectItem>
                              <SelectItem value="10c">10th-C</SelectItem>
                               <SelectItem value="10d">10th-D</SelectItem>
                          <SelectItem value="10e">10th-E</SelectItem>
                          <SelectItem value="10f">10th-F</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Class Wise Analysis</CardTitle>
                        <CardDescription>Performance average by class</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'line' ? (
                                    <LineChart data={classData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}% `} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Line type="monotone" dataKey="average" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} name="Average Score" />
                                    </LineChart>
                                ) : chartType === 'area' ? (
                                    <AreaChart data={classData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}% `} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Area type="monotone" dataKey="average" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} name="Average Score" />
                                    </AreaChart>
                                ) : (
                                    <BarChart data={classData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}% `} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Bar dataKey="average" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Average Score" />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Trends</CardTitle>
                        <CardDescription>Weekly student attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={studentData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="present" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} name="Present" />
                                    <Line type="monotone" dataKey="absent" stroke="var(--destructive)" strokeWidth={2} name="Absent" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalStudents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{activeClasses}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{attendanceRate}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
