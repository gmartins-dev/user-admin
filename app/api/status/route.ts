import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Testa conexão
    await prisma.$connect()
    
    // Conta usuários
    const userCount = await prisma.user.count()
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    })
    
    // Verifica se admin existe
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
      select: { id: true, email: true, role: true, createdAt: true }
    })
    
    return NextResponse.json({
      success: true,
      database: {
        url: process.env.DATABASE_URL || 'não configurado',
        connected: true,
        userCount,
        adminCount,
        adminExists: !!adminExists,
        adminDetails: adminExists
      },
      environment: {
        nextauth_secret: process.env.NEXTAUTH_SECRET ? 'configurado' : 'não configurado',
        nextauth_url: process.env.NEXTAUTH_URL || 'não configurado'
      }
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      database: {
        url: process.env.DATABASE_URL || 'não configurado',
        connected: false
      }
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
