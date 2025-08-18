import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from './ui/dialog'
import { useAsyncOperation } from '@/hooks'
import { MessageSquare, Star } from 'lucide-react'

interface FeedbackProps {
  children: React.ReactNode
}

export function FeedbackDialog({ children }: FeedbackProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [open, setOpen] = useState(false)
  const { execute, isLoading } = useAsyncOperation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await execute(
      async () => {
        // Aqui você enviaria o feedback para sua API
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating, feedback })
        })

        if (!response.ok) {
          throw new Error('Erro ao enviar feedback')
        }

        return response.json()
      },
      {
        successMessage: 'Feedback enviado com sucesso! Obrigado.',
        showToast: true
      }
    )

    // Reset form
    setRating(0)
    setFeedback('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Feedback
          </DialogTitle>
          <DialogDescription>
            Sua opinião é importante para nós. Como podemos melhorar?
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating com estrelas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Avaliação</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Textarea para feedback */}
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Comentários
            </label>
            <Textarea
              id="feedback"
              placeholder="Compartilhe sua experiência, sugestões ou reporte problemas..."
              value={feedback}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!rating || !feedback.trim() || isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Feedback'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
