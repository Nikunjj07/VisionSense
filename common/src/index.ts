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

export const studentData