import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  return (
    <header className="w-full flex justify-end items-center p-4 border-b">
      <ThemeToggle />
    </header>
  )
}
