import { unstable_cache } from 'next/cache'
import { prisma } from './db'

// Cache para estatísticas do dashboard
export const getUserStats = unstable_cache(
  async () => {
    const [totalUsers, adminUsers, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // últimos 7 dias
          }
        }
      })
    ])

    return {
      totalUsers,
      adminUsers,
      regularUsers: totalUsers - adminUsers,
      recentUsers
    }
  },
  ['user-stats'],
  {
    revalidate: 300, // 5 minutos
    tags: ['users']
  }
)

// Cache para lista de usuários
export const getCachedUsers = unstable_cache(
  async () => {
    return await prisma.user.findMany({
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
    })
  },
  ['users-list'],
  {
    revalidate: 60, // 1 minuto
    tags: ['users']
  }
)
