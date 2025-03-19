"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { useForm, usePage, router } from "@inertiajs/react"
import GuestLayout from "../Layouts/GuestLayout"
import AppLayout from "@/Layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { ShineBorder } from "@/components/ui/shine-border"
import { cn } from "@/lib/utils"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const { csrf_token, user } = usePage<{ csrf_token: string; user: any }>().props
  const { theme } = useTheme()
  const loginFormRef = useRef<HTMLDivElement>(null)
  const registerFormRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      router.visit("/dashboard")
    }
  }, [user])

  // Formulario de Login
  const {
    data: loginData,
    setData: setLoginData,
    post: loginPost,
    processing: loginProcessing,
    errors: loginErrors,
  } = useForm({
    _token: csrf_token,
    email: "",
    password: "",
  })

  // Formulario de Registro
  const {
    data: registerData,
    setData: setRegisterData,
    post: registerPost,
    processing: registerProcessing,
    errors: registerErrors,
  } = useForm({
    _token: csrf_token,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  // Update content height based on active form
  useEffect(() => {
    if (!isAnimating) {
      const activeForm = isLogin ? loginFormRef.current : registerFormRef.current
      if (activeForm && contentRef.current) {
        contentRef.current.style.height = `${activeForm.offsetHeight}px`
      }
    }
  }, [isLogin, isAnimating, loginErrors, registerErrors])

  // Handle form switching with animation
  const handleFormSwitch = (loginMode: boolean) => {
    if (loginMode === isLogin) return

    setIsAnimating(true)

    // Get target height before animation
    const targetForm = loginMode ? loginFormRef.current : registerFormRef.current
    if (targetForm && contentRef.current) {
      // First animate out the current form
      setTimeout(() => {
        // Then animate the height and switch forms
        contentRef.current!.style.height = `${targetForm.offsetHeight}px`
        setIsLogin(loginMode)

        // Finally, complete the animation
        setTimeout(() => {
          setIsAnimating(false)
        }, 300)
      }, 150)
    }
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginPost("/login", {
      onSuccess: () => router.reload({ only: ["user"] }),
    })
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerPost("/register", {
      onSuccess: () => router.reload({ only: ["user"] }),
    })
  }

  return (
    <AppLayout>
      <GuestLayout>
        <div className="w-full max-w-md">
          {/* Tabs Navigation - Elevadas por encima de la card */}
          <div className="flex justify-center translate-y-[-50%]">
            <div className="flex shadow-md rounded-t-lg overflow-hidden border border-border">
              <button
                onClick={() => handleFormSwitch(true)}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out relative",
                  isLogin
                    ? "bg-card text-card-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:bg-muted/90",
                )}
              >
                Iniciar Sesión
                {isLogin && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transition-all duration-300 ease-in-out"></div>
                )}
              </button>
              <button
                onClick={() => handleFormSwitch(false)}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out relative",
                  !isLogin
                    ? "bg-card text-card-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:bg-muted/90",
                )}
              >
                Registrarse
                {!isLogin && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transition-all duration-300 ease-in-out"></div>
                )}
              </button>
            </div>
          </div>
          <Card className="w-full max-w-md relative overflow-hidden pt-6 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
            <ShineBorder
              shineColor={["#7C4DFF", "#E91E63", "#FF9800"]}
              className="transition-opacity duration-500 ease-in-out"
            />
            <CardHeader>
              <CardTitle className="transition-all duration-300 ease-in-out">
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </CardTitle>
              <CardDescription className="transition-all duration-300 ease-in-out">
                {isLogin
                  ? "Ingresa tus credenciales para acceder a tu cuenta"
                  : "Registra tus datos para crear una cuenta"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={contentRef}
                className="relative transition-all duration-300 ease-in-out overflow-hidden"
                style={{ height: isLogin ? "auto" : "auto" }} // Initial height, will be set by useEffect
              >
                <div
                  ref={loginFormRef}
                  className={cn(
                    "w-full transition-all duration-300 ease-in-out",
                    isAnimating ? "opacity-0 transform translate-x-8" : "opacity-100 transform translate-x-0",
                    !isLogin && "absolute top-0 left-0 pointer-events-none",
                  )}
                  style={{ display: !isLogin && !isAnimating ? "none" : "block" }}
                >
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <input type="hidden" name="_token" value={csrf_token} />
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData("email", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                      {loginErrors.email && (
                        <p className="text-destructive text-sm transition-all duration-300 ease-in-out">
                          {loginErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="********"
                        value={loginData.password}
                        onChange={(e) => setLoginData("password", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                      {loginErrors.password && (
                        <p className="text-destructive text-sm transition-all duration-300 ease-in-out">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>
                  </form>
                </div>

                <div
                  ref={registerFormRef}
                  className={cn(
                    "w-full transition-all duration-300 ease-in-out",
                    isAnimating ? "opacity-0 transform translate-x-[-8px]" : "opacity-100 transform translate-x-0",
                    isLogin && "absolute top-0 left-0 pointer-events-none",
                  )}
                  style={{ display: isLogin && !isAnimating ? "none" : "block" }}
                >
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <input type="hidden" name="_token" value={csrf_token} />
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Tu nombre"
                        value={registerData.name}
                        onChange={(e) => setRegisterData("name", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                      {registerErrors.name && (
                        <p className="text-destructive text-sm transition-all duration-300 ease-in-out">
                          {registerErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData("email", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                      {registerErrors.email && (
                        <p className="text-destructive text-sm transition-all duration-300 ease-in-out">
                          {registerErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="********"
                        value={registerData.password}
                        onChange={(e) => setRegisterData("password", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                      {registerErrors.password && (
                        <p className="text-destructive text-sm transition-all duration-300 ease-in-out">
                          {registerErrors.password}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password-confirmation">Confirmar Contraseña</Label>
                      <Input
                        id="register-password-confirmation"
                        type="password"
                        placeholder="********"
                        value={registerData.password_confirmation}
                        onChange={(e) => setRegisterData("password_confirmation", e.target.value)}
                        className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full transition-all duration-300 ease-in-out">
                {isLogin ? (
                  <Button
                    type="button"
                    className="w-full transition-all duration-300 ease-in-out hover:translate-y-[-2px]"
                    onClick={handleLoginSubmit}
                    disabled={loginProcessing || isAnimating}
                  >
                    {loginProcessing ? "Procesando..." : "Iniciar Sesión"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-full transition-all duration-300 ease-in-out hover:translate-y-[-2px]"
                    onClick={handleRegisterSubmit}
                    disabled={registerProcessing || isAnimating}
                  >
                    {registerProcessing ? "Procesando..." : "Registrarse"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </GuestLayout>
    </AppLayout>
  )
}

export default Auth

