import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { loginService } from "@/services/authapi"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
const navigate= useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempted with:", { email, password })
    try{
      await loginService({email: email, password:password})
    }catch(err){
      console.log("ERROR: ",err)
    }
  }

  return (
<>
<div style={{
   background: "radial-gradient(circle at 47% 125%,#ff003700, #2b3027ff)"
}}  className="h-screen w-screen flex justify-center items-center px-10">
    <div className="w-full max-w-sm">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-2 text-left">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">We are great to have you back again</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border h-12"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-border h-12"
            />
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
          <Button className="p-0 m-0" variant="link" onClick={()=>
            {
       navigate('/signup')
            }
          }>
            Sign-up
          </Button>
          </p>
        </div>
      </div>
    </div>
</div>
</>
  )
}
