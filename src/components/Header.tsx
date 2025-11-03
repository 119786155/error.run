import { ThemeToggle } from '@/components/ThemeToggle'

export const Header = () => {
  return (
    <header className="mx-5 my-3 flex justify-between">
      <ThemeToggle />
    </header>
  )
}
