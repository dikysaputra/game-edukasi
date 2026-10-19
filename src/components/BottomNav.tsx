import React from 'react'
import { sounds } from '../utils/sound'

export type TabType = 'Beranda' | 'Peta' | 'Prestasi' | 'Materi' | 'Profil'

interface BottomNavProps {
  activeTab: TabType
  onSelectTab: (tab: TabType) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    {
      key: 'Beranda',
      label: 'Beranda',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      )
    },
    {
      key: 'Peta',
      label: 'Peta',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      )
    },
    {
      key: 'Prestasi',
      label: 'Prestasi',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 4h16v6a7 7 0 0 1-14 0V4z" />
          <path d="M12 17v4" />
          <path d="M8 21h8" />
        </svg>
      )
    },
    {
      key: 'Materi',
      label: 'Materi',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      key: 'Profil',
      label: 'Profil',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ]

  const handleTabClick = (tab: TabType) => {
    sounds.playClick()
    onSelectTab(tab)
  }

  return (
    <nav className="bottom-navigation-dock" aria-label="Navigasi Utama">
      <div className="bottom-nav-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              className={`dock-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="dock-icon-wrapper">{tab.icon}</div>
              <span className="dock-item-label">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
