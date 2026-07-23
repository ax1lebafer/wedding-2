import type { ReactNode } from 'react'
import './PageLayout.scss'

type PageLayoutProps = {
  children?: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="page">{children}</div>
}
