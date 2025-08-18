import { z } from "zod"

// Validação de senha mais robusta
const passwordSchema = z.string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .max(100, "A senha deve ter no máximo 100 caracteres")
  .regex(/^(?=.*[a-z])/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/^(?=.*[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/^(?=.*\d)/, "A senha deve conter pelo menos um número")
  .regex(/^(?=.*[@$!%*?&])/, "A senha deve conter pelo menos um caractere especial (@$!%*?&)")

// Validação de email mais rigorosa
const emailSchema = z.string()
  .email("Email inválido")
  .toLowerCase()
  .refine((email) => {
    // Validação adicional para domínios comuns
    const domain = email.split('@')[1]
    const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com']
    return !blockedDomains.includes(domain)
  }, "Email de domínio temporário não permitido")

// Validação de CEP
const cepValidationSchema = z.string()
  .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000")
  .transform((cep) => cep.replace(/\D/g, ''))

// Validação de nome
const nameSchema = z.string()
  .min(2, "Nome deve ter pelo menos 2 caracteres")
  .max(100, "Nome deve ter no máximo 100 caracteres")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços")
  .transform((name) => name.trim())

// User registration schema
export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  cep: cepValidationSchema.optional(),
  state: z.string().optional(),
  city: z.string().optional(),
})

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

// User update schema (for admin)
export const updateUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
})

// CEP lookup schema
export const cepLookupSchema = z.object({
  cep: cepValidationSchema,
})

// Types
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CEPInput = z.infer<typeof cepLookupSchema>
