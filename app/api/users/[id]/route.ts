import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { updateUserSchema } from "@/lib/validations"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// PUT - Update user (admin only)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validation = updateUserSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { name, email } = validation.data

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Check if email is already in use by another user
    if (email !== existingUser.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email }
      })

      if (emailInUse) {
        return NextResponse.json(
          { error: "Email já está em uso" },
          { status: 409 }
        )
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: { name, email },
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
      }
    })

    return NextResponse.json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser
    })

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// DELETE - Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Prevent admin from deleting themselves
    if (existingUser.id === session.user.id) {
      return NextResponse.json(
        { error: "Você não pode deletar a si mesmo" },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({
      message: "Usuário deletado com sucesso"
    })

  } catch (error) {
    console.error("Erro ao deletar usuário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
