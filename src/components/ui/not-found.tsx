import { Link } from '@tanstack/react-router'
import { getContent } from '@/i18n'
import './not-found.css'

export function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">{getContent('notFound.message')}</p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__btn not-found__btn--primary">
          {getContent('notFound.goHome')}
        </Link>
        <button type="button" className="not-found__btn not-found__btn--secondary" onClick={() => history.back()}>
          {getContent('notFound.goBack')}
        </button>
      </div>
    </div>
  )
}
