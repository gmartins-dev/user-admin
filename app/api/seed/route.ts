import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Primeiro, tenta conectar ao banco
    await prisma.$connect()
    
    const adminEmail = 'admin@example.com'
    const adminPassword = 'Admin123!@#'

    // Verifica se já existe
    const existing = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existing) {
      return NextResponse.json({ 
        success: true,
        message: "Admin já existe", 
        email: adminEmail,
        role: existing.role
      })
    }

    // Cria o admin
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json({ 
      success: true,
      message: "Admin criado com sucesso!",
      admin 
    })
    
  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json(
      { 
        success: false,
        error: "Erro ao criar admin",
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        database: process.env.DATABASE_URL || 'não configurado'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
