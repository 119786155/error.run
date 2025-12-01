import { getContent } from '@/i18n'
import R from '@/recordation.json'

export const Footer = () => {
  return (
    <footer className="text-xs text-gray-700 dark:text-gray-400 text-center leading-[250%]">
      <a href={R.link.psr} rel="noreferrer" target="_blank" className="block">
        {getContent('recordation.psr')}
      </a>
      <a href={R.link.icp} target="_blank" rel="noopener" className="block">
        {getContent('recordation.icp')}
      </a>
    </footer>
  )
}
