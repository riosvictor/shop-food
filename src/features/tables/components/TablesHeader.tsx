import { FC } from 'react'
import { Button } from '@/components/ui/button'

type TablesHeaderProps = {
  onAddTable: () => void
  adding: boolean
}

export const TablesHeader: FC<TablesHeaderProps> = ({ onAddTable, adding }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Mesas</h1>
      <Button onClick={onAddTable} disabled={adding}>
        {adding ? 'Adicionando...' : 'Adicionar Mesa'}
      </Button>
    </div>
  )
}
