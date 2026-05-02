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
          className="not-found__cat"
          role="img"
          aria-label="Cute cat 404 illustration"
        >
          <circle cx="100" cy="100" r="80" fill="#FFE5D9" />
          <ellipse cx="65" cy="85" rx="12" ry="14" fill="white" />
          <ellipse cx="135" cy="85" rx="12" ry="14" fill="white" />
          <ellipse cx="65" cy="85" rx="6" ry="8" fill="#3D3D3D" />
          <ellipse cx="135" cy="85" rx="6" ry="8" fill="#3D3D3D" />
          <ellipse cx="67" cy="83" rx="2" ry="3" fill="white" />
          <ellipse cx="137" cy="83" rx="2" ry="3" fill="white" />
          <ellipse cx="100" cy="105" rx="8" ry="6" fill="#FFB4A2" />
          <path d="M92 115 Q100 125 108 115" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="55" y1="95" x2="30" y2="90" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="100" x2="30" y2="100" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="105" x2="30" y2="110" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="145" y1="95" x2="170" y2="90" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="145" y1="100" x2="170" y2="100" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <line x1="145" y1="105" x2="170" y2="110" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 55 Q35 20 50 50" fill="#FFE5D9" stroke="#3D3D3D" strokeWidth="2" />
          <path d="M35 45 Q40 30 48 48" fill="#FFB4A2" />
          <path d="M175 55 Q165 20 150 50" fill="#FFE5D9" stroke="#3D3D3D" strokeWidth="2" />
          <path d="M165 45 Q160 30 152 48" fill="#FFB4A2" />
          <circle cx="75" cy="115" rx="15" ry="8" fill="#FFCAD4" opacity="0.6" />
          <circle cx="125" cy="115" rx="15" ry="8" fill="#FFCAD4" opacity="0.6" />
          <path
            d="M140 60 Q155 55 165 65"
            stroke="#3D3D3D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="not-found__thought"
          />
          <circle cx="170" cy="55" r="5" fill="#3D3D3D" className="not-found__thought-dot" />
          <circle cx="180" cy="48" r="3" fill="#3D3D3D" className="not-found__thought-dot" />
          <text x="100" y="170" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#3D3D3D">
            404
          </text>
          <text x="100" y="190" textAnchor="middle" fontSize="12" fill="#888">
            Page not found
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
