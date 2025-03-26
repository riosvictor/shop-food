import { FC } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { InputField } from '@/shared/components/InputField'
import { Button } from '@/components/ui/button'

interface RegisterModalProps {
  isRegistering: boolean
  setIsRegistering: (value: boolean) => void
  handleRegister: (e: React.FormEvent) => void
  registerEmail: string
  setRegisterEmail: (email: string) => void
  registerPassword: string
  setRegisterPassword: (password: string) => void
}

export const RegisterModal: FC<RegisterModalProps> = ({
  isRegistering,
  setIsRegistering,
  handleRegister,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword
}) => (
  <Dialog open={isRegistering} onOpenChange={(open) => setIsRegistering(open)}>
    <DialogTrigger asChild>
      <Button variant="outline" onClick={() => setIsRegistering(true)} className="w-full">
        Criar conta
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastro</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleRegister} className="space-y-4">
        <InputField
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Senha"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <Button type="submit" className="w-full bg-green-500">
          Cadastrar
        </Button>
      </form>
      <DialogClose asChild>
        <Button type="button" variant="secondary" className="mt-4 w-full">
          Fechar
        </Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
)
