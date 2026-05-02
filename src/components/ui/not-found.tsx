import { Link } from '@tanstack/react-router'
import { getContent } from '@/i18n'
import './not-found.css'

export function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__icon">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="not-found__monster"
          role="img"
          aria-label="Cute mischievous monster 404 illustration"
        >
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="3" />

          <line x1="70" y1="35" x2="70" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="130" y1="35" x2="130" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          <circle cx="70" cy="10" r="6" stroke="currentColor" strokeWidth="2" className="not-found__antenna-ball" />
          <circle cx="130" cy="10" r="6" stroke="currentColor" strokeWidth="2" className="not-found__antenna-ball" />

          <g className="not-found__eye-left">
            <line x1="65" y1="75" x2="85" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="85" y1="75" x2="65" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>

          <g className="not-found__eye-right">
            <line x1="115" y1="75" x2="135" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="135" y1="75" x2="115" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>

          <path
            d="M70 130 Q100 155 130 130"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="not-found__mouth"
          />

          <path d="M75 140 Q100 152 125 140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />

          <path
            d="M85 125 Q88 132 92 125"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="not-found__fang-left"
          />
          <path
            d="M115 125 Q112 132 108 125"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="not-found__fang-right"
          />

          <text
            x="100"
            y="185"
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            404
          </text>
        </svg>
      </div>
      <h1 className="not-found__title">{getContent('notFound.title')}</h1>
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
