import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { UsersTable } from "@/components/admin/users-table"
import { AdminStats } from "@/components/admin/admin-stats"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  // Get all users and stats
  const [users, totalUsers, totalAdmins] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        cep: true,
        state: true,
        city: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.user.count(),
    prisma.user.count({
      where: { role: "ADMIN" }
    })
  ])

  const stats = {
    totalUsers,
    totalAdmins,
    totalRegularUsers: totalUsers - totalAdmins,
    usersThisMonth: await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={session.user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <p className="mt-2 text-gray-600">
              Gerencie usuários e visualize estatísticas do sistema.
            </p>
          </div>
          
          <AdminStats stats={stats} />
          
          <div className="mt-8">
            <UsersTable users={users} currentUserId={session.user.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
