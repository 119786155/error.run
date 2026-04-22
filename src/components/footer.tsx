import { getContent } from '@/i18n'

export const Footer = () => {
  return (
    <footer className="text-xs text-gray-700 dark:text-gray-400 text-center leading-[250%]">
      <a href={import.meta.env.VITE_PSR_LINK} rel="noreferrer" target="_blank" className="block">
        {getContent('recordation.psr')}
      </a>
      <a href={import.meta.env.VITE_ICP_LINK} target="_blank" rel="noopener" className="block">
        {getContent('recordation.icp')}
      </a>
    </footer>
  )
}
