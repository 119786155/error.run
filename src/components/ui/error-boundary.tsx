import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            role="alert"
            className="flex size-full items-center justify-center p-8"
            data-testid="error-boundary-fallback"
          >
            <div className="text-center">
              <p className="text-muted-foreground text-lg">Something went wrong</p>
              <button
                type="button"
                className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
