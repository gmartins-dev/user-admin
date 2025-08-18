"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
    role: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Sistema de Usuários
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
            
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            
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
