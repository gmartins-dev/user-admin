import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/lib/validations"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Dados inválidos",
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { name, email, password, cep, state, city } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cep: cep || null,
        state: state || null,
        city: city || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cep: true,
        state: true,
        city: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      user
    }, { status: 201 })

  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
