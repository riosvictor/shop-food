import React from 'react'

type LoadingProps = {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Loading: React.FC<LoadingProps> = ({ message, size = 'md' }) => {
  const spinnerSize = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${spinnerSize[size]} animate-spin rounded-full border-4 border-t-transparent border-gray-500`} />

      {message && <p className="text-center text-sm text-gray-700">{message}</p>}
    </div>
  )
}
