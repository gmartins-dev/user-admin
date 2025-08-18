import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/theme-toggle"
import { Shield, Users, UserPlus, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Sistema de Usuários
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Link href="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button>
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Sistema de Gerenciamento
            <span className="text-primary"> de Usuários</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Uma solução completa para gerenciamento de usuários com autenticação segura,
            validação de dados e interface administrativa intuitiva.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <UserPlus className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Cadastro Público</CardTitle>
              <CardDescription>
                Registro simples com validação de CEP automática via API pública
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Validação de senha segura</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Preenchimento automático por CEP</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Validação em tempo real</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Dashboard Pessoal</CardTitle>
              <CardDescription>
                Área privada para visualizar e gerenciar informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Perfil personalizado</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dados protegidos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Interface responsiva</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <Shield className="h-12 w-12 text-destructive mb-4" />
              <CardTitle>Painel Admin</CardTitle>
              <CardDescription>
                Gerenciamento completo de usuários com permissões administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Edição de usuários</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Exclusão segura</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Estatísticas em tempo real</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="mt-24 bg-card rounded-2xl border border-border shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Teste o Sistema
            </h2>
            <p className="text-muted-foreground mb-8">
              Use as credenciais abaixo para testar as funcionalidades administrativas
            </p>
            <div className="bg-muted rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-foreground mb-3">Credenciais Admin</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> admin@example.com</p>
                <p><strong>Senha:</strong> Admin123!@#</p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/login">
                <Button variant="outline">
                  Fazer Login como Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Sistema de Gerenciamento de Usuários. Desenvolvido com Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
