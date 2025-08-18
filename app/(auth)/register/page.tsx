"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cep: "",
      state: "",
      city: "",
    },
  })

  const watchCep = form.watch("cep")

  const handleCepLookup = async (cep: string) => {
    if (!cep || cep.length < 8) return

    setIsLoadingCep(true)
    try {
      const cleanCep = cep.replace(/\D/g, "")
      const response = await fetch(`/api/cep?cep=${cleanCep}`)
      
      if (response.ok) {
        const data = await response.json()
        form.setValue("state", data.state)
        form.setValue("city", data.city)
        toast.success("CEP encontrado!")
      } else {
        const error = await response.json()
        toast.error(error.error || "CEP não encontrado")
        form.setValue("state", "")
        form.setValue("city", "")
      }
    } catch (error) {
      toast.error("Erro ao consultar CEP")
      console.error("Erro CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Conta criada com sucesso!")
        router.push("/login?message=Conta criada com sucesso! Faça seu login.")
      } else {
        toast.error(result.error || "Erro ao criar conta")
      }
    } catch (error) {
      toast.error("Erro ao criar conta")
      console.error("Erro registro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Criar nova conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              faça login em sua conta existente
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Seu nome completo"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="seu@email.com"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormLabel>CEP (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="00000-000"
                        maxLength={9}
                        disabled={isLoading || isLoadingCep}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          const formattedValue = value.replace(/(\d{5})(\d)/, "$1-$2")
                          field.onChange(formattedValue)
                          
                          if (value.length === 8) {
                            handleCepLookup(value)
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="SP"
                        disabled={isLoading || isLoadingCep}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="São Paulo"
                        disabled={isLoading || isLoadingCep}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isLoadingCep}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
