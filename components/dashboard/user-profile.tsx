import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, MapPin, Calendar } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    cep: string | null
    state: string | null
    city: string | null
    createdAt: Date
  }
}

export function UserProfile({ user }: UserProfileProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Informações Pessoais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <p className="text-lg font-medium text-foreground">{user.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-foreground">{user.email}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Tipo de Usuário</label>
            <div className="mt-1">
              <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Localização</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.cep ? (
            <>
              <div>
                <label className="text-sm font-medium text-muted-foreground">CEP</label>
                <p className="text-foreground">{user.cep}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Estado</label>
                <p className="text-foreground">{user.state}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Cidade</label>
                <p className="text-foreground">{user.city}</p>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground italic">
              Nenhuma informação de localização cadastrada
            </p>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Informações da Conta</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Data de Cadastro
            </label>
            <p className="text-lg text-foreground">{formatDate(user.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
