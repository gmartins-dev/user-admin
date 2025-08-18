import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserProfile } from "@/components/dashboard/user-profile"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Get user data with full details
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      cep: true,
      state: true,
      city: true,
      createdAt: true,
    }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Bem-vindo, {user.name}!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Esta é sua área pessoal. Aqui você pode visualizar suas informações.
            </p>
          </div>

          <UserProfile user={user} />
        </div>
      </main>
    </div>
  )
}
