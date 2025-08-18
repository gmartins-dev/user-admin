"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import { Shield, LogOut, User, ArrowLeft } from "lucide-react"

interface AdminHeaderProps {
  user: {
    name: string
    email: string
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-destructive" />
              <h1 className="text-xl font-bold text-foreground">
                Admin Panel
              </h1>
            </div>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <div>
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
              </div>
            </div>

            <ModeToggle />

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
