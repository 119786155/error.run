import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card'

describe('Card', () => {
  it('should render card with content', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeDefined()
  })

  it('should apply custom className', () => {
    render(<Card className="custom-card">Content</Card>)
    const card = screen.getByText('Content')
    expect(card.className).toContain('custom-card')
  })
})

describe('CardHeader', () => {
  it('should render header with content', () => {
    render(<CardHeader>Header Content</CardHeader>)
    expect(screen.getByText('Header Content')).toBeDefined()
  })
})

describe('CardTitle', () => {
  it('should render title', () => {
    render(<CardTitle>Card Title</CardTitle>)
    expect(screen.getByText('Card Title')).toBeDefined()
  })
})

describe('CardDescription', () => {
  it('should render description', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeDefined()
  })
})

describe('CardAction', () => {
  it('should render action content', () => {
    render(<CardAction>Action</CardAction>)
    expect(screen.getByText('Action')).toBeDefined()
  })
})

describe('CardContent', () => {
  it('should render content', () => {
    render(<CardContent>Main Content</CardContent>)
    expect(screen.getByText('Main Content')).toBeDefined()
  })
})

describe('CardFooter', () => {
  it('should render footer', () => {
    render(<CardFooter>Footer Content</CardFooter>)
    expect(screen.getByText('Footer Content')).toBeDefined()
  })
})

describe('Card composition', () => {
  it('should render complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Title')).toBeDefined()
    expect(screen.getByText('Description')).toBeDefined()
    expect(screen.getByText('Content')).toBeDefined()
    expect(screen.getByText('Footer')).toBeDefined()
  })
})
