import z, { email } from "zod";

export const signupInput = z.object({
    name: z.string().min(2).max(15),
    email: z.string().email(),
    password: z.string().min(6)
})

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninType = z.infer<typeof signinInput>

export const initializeSession = z.object({
    sessionId: z.string(),
    class: z.string(),
    duration: z.number()
})

export type InitializeSessionType = z.infer<typeof initializeSession>

export const studentData = z.object({
    id: z.string(),
    spid: z.string(),
    name: z.string(),
    classId: z.string(),
    faceEncoding: z.array(z.number())
})

export type StudentData = z.infer<typeof studentData>

export const classData = z.object({
    id: z.string(),
    name: z.string(),
    students: z.array(z.string())
})

export type ClassData = z.infer<typeof classData>

export const attendanceData = z.object({
    id: z.string(),
    studentId: z.string(),
    classId: z.string(),
    date: z.date(),
    isPresent: z.boolean()
})

export type AttendanceData = z.infer<typeof attendanceData>