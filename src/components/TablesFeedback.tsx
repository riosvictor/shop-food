import { TTable } from '../types/entities'

export const TablesFeedback = ({ loading, error, tables }: { loading: boolean; error: string; tables: TTable[] }) => {
  if (loading) return <p className="text-gray-500 text-center">Carregando mesas...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>
  if (tables.length === 0) return <p className="text-gray-500 text-center">Nenhuma mesa disponível.</p>
  return null
}
