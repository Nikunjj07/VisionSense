import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { SignupService } from "@/services/authapi"
export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [name, setName] = useState("")
const navigate= useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      await SignupService({email:email,username:name,password:password})
    }catch(err){
      console.log("Signup error\n",err)
    }
    // Handle login logic here
    console.log("Login attempted with:", { email, password,name })
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
          <h1 className="text-4xl font-bold text-foreground tracking-tight ">Create A Faboulus Account</h1>
          <p className="text-sm text-muted-foreground">We are very happy to have you.</p>
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

{/*Username*/}
  <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
            UserName
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
           Create Account
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button className="p-0 m-0" variant="link" onClick={()=>
            {
       navigate('/login')
            }
          }>
     Login
          </Button>
          </p>
        </div>
      </div>
    </div>
</div>
</>
  )
}
