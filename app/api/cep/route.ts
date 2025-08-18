import { NextRequest, NextResponse } from "next/server"
import { cepLookupSchema } from "@/lib/validations"

interface ViaCEPResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cep = searchParams.get("cep")

    if (!cep) {
      return NextResponse.json(
        { error: "CEP é obrigatório" },
        { status: 400 }
      )
    }

    const validation = cepLookupSchema.safeParse({ cep })
    if (!validation.success) {
      return NextResponse.json(
        { error: "CEP inválido" },
        { status: 400 }
      )
    }

    const cleanCep = cep.replace(/\D/g, "")

    const response = await fetch(
      `https://viacep.com.br/ws/${cleanCep}/json/`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao consultar CEP" },
        { status: 500 }
      )
    }

    const data: ViaCEPResponse = await response.json()

    if (data.erro) {
      return NextResponse.json(
        { error: "CEP não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      cep: data.cep,
      city: data.localidade,
      state: data.uf,
      address: data.logradouro,
      district: data.bairro,
    })
  } catch (error) {
    console.error("Erro na API de CEP:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
