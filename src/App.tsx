import { useState, useEffect } from 'react'
import './App.css'
import { BerandaView } from './components/BerandaView'
import { BottomNav, type TabType } from './components/BottomNav'
import { PetaView } from './components/PetaView'
import { PrestasiView } from './components/PrestasiView'
import { MateriView } from './components/MateriView'
import { ProfilView } from './components/ProfilView'
import { QuizGame } from './components/QuizGame'
import {
  MissionsModal,
  SettingsModal,
  StarsShopModal,
  GemsShopModal,
} from './components/Modals'
import { initialMissions, type MissionItem } from './data/missionsData'
import { initialAchievements, type AchievementItem } from './data/achievementsData'
import { sounds } from './utils/sound'

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('Beranda')

  // Player State with LocalStorage Persistence
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('game_stars')
    return saved !== null ? parseInt(saved, 10) : 120
  })

  const [gems, setGems] = useState<number>(() => {
    const saved = localStorage.getItem('game_gems')
    return saved !== null ? parseInt(saved, 10) : 45
  })

  const [playerLevel, setPlayerLevel] = useState<number>(() => {
    const saved = localStorage.getItem('game_level')
    return saved !== null ? parseInt(saved, 10) : 3
  })

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('game_coins')
    return saved !== null ? parseInt(saved, 10) : 460
  })

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('game_xp')
    return saved !== null ? parseInt(saved, 10) : 850
  })

  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('game_player_name') || 'Rizki'
  })

  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem('game_avatar') || '👦🏻'
  })

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

  // Missions & Achievements
  const [missions, setMissions] = useState<MissionItem[]>(initialMissions)
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements)

  // Active Modals & Quiz Session
  const [activeModal, setActiveModal] = useState<
    'missions' | 'settings' | 'starsShop' | 'gemsShop' | null
  >(null)
  const [isPlayingQuiz, setIsPlayingQuiz] = useState<boolean>(false)
  const [quizLevel, setQuizLevel] = useState<number>(1)
  const [petaFlowStep, setPetaFlowStep] = useState<'map' | 'detail' | 'exploration' | 'quiz' | 'result'>('map')

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('game_stars', stars.toString())
  }, [stars])

  useEffect(() => {
    localStorage.setItem('game_gems', gems.toString())
  }, [gems])

  useEffect(() => {
    localStorage.setItem('game_level', playerLevel.toString())
  }, [playerLevel])

  useEffect(() => {
    localStorage.setItem('game_coins', coins.toString())
  }, [coins])

  useEffect(() => {
    localStorage.setItem('game_xp', xp.toString())
  }, [xp])

  useEffect(() => {
    localStorage.setItem('game_player_name', playerName)
  }, [playerName])

  useEffect(() => {
    localStorage.setItem('game_avatar', avatar)
  }, [avatar])

  // Sound Manager Sync
  const handleToggleSound = () => {
    const nextVal = !soundEnabled
    setSoundEnabled(nextVal)
    sounds.isEnabled = nextVal
  }

  // Quiz Launchers
  const handleStartGame = (level = 1) => {
    setQuizLevel(level)
    setIsPlayingQuiz(true)
  }

  const handleFinishQuiz = (earnedStars: number, earnedGems: number) => {
    setStars((s) => s + earnedStars)
    setGems((g) => g + earnedGems)

    // Update Missions progress
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === 'm1') {
          return { ...m, progress: Math.min(m.target, m.progress + 1) }
        }
        if (m.id === 'm3') {
          return { ...m, progress: Math.min(m.target, m.progress + earnedStars) }
        }
        return m
      })
    )

    // Level check
    if (stars + earnedStars >= 180 && playerLevel < 4) {
      setPlayerLevel(4)
    }

    setIsPlayingQuiz(false)
  }

  // Claim Mission Reward
  const handleClaimMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && !m.claimed) {
          if (m.rewardType === 'stars') {
            setStars((s) => s + m.rewardAmount)
          } else {
            setGems((g) => g + m.rewardAmount)
          }
          return { ...m, claimed: true }
        }
        return m
      })
    )
  }

  // Claim Achievement Reward
  const handleClaimAchievement = (achId: string) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === achId && !a.claimed) {
          if (a.rewardType === 'stars') {
            setStars((s) => s + a.rewardAmount)
          } else {
            setGems((g) => g + a.rewardAmount)
          }
          return { ...a, claimed: true }
        }
        return a
      })
    )
  }

  // Reset progress
  const handleResetProgress = () => {
    setStars(120)
    setGems(45)
    setPlayerLevel(3)
    setPlayerName('Rizki')
    setAvatar('👦🏻')
    setMissions(initialMissions)
    setAchievements(initialAchievements)
    localStorage.clear()
  }

  const activeMission = missions[0] || initialMissions[0]

  return (
    <div className="mobile-app-wrapper">
      {/* Phone Stage Container with rounded frame */}
      <div className="game-phone-viewport">
        {/* Active Screen Tab View */}
        <main className="game-screen-content">
          {activeTab === 'Beranda' && (
            <BerandaView
              stars={stars}
              gems={gems}
              playerLevel={playerLevel}
              playerName={playerName}
              avatar={avatar}
              activeMission={activeMission}
              onStartGame={() => handleStartGame(1)}
              onOpenMissions={() => setActiveModal('missions')}
              onOpenSettings={() => setActiveModal('settings')}
              onOpenStarsShop={() => setActiveModal('starsShop')}
              onOpenGemsShop={() => setActiveModal('gemsShop')}
              onOpenProfile={() => setActiveTab('Profil')}
              onGoToMateri={() => setActiveTab('Materi')}
            />
          )}

          {activeTab === 'Peta' && (
            <PetaView
              stars={stars}
              gems={gems}
              coins={coins}
              xp={xp}
              playerLevel={playerLevel}
              playerName={playerName}
              avatar={avatar}
              activeMission={activeMission}
              onUpdateRewards={(earnedStars, earnedCoins, earnedXp) => {
                setStars((s) => s + earnedStars)
                setCoins((c) => c + earnedCoins)
                setXp((x) => x + earnedXp)
                if (xp + earnedXp >= 1000 && playerLevel < 4) {
                  setPlayerLevel(4)
                }
              }}
              onBackToHome={() => setActiveTab('Beranda')}
              onOpenMissions={() => setActiveModal('missions')}
              onOpenSettings={() => setActiveModal('settings')}
              onOpenStarsShop={() => setActiveModal('starsShop')}
              onOpenGemsShop={() => setActiveModal('gemsShop')}
              onOpenProfile={() => setActiveTab('Profil')}
              onFlowStepChange={(step) => setPetaFlowStep(step)}
            />
          )}

          {activeTab === 'Prestasi' && (
            <PrestasiView
              achievements={achievements}
              stars={stars}
              gems={gems}
              onClaimAchievement={handleClaimAchievement}
              onBackToHome={() => setActiveTab('Beranda')}
            />
          )}

          {activeTab === 'Materi' && (
            <MateriView
              stars={stars}
              gems={gems}
              onBackToHome={() => setActiveTab('Beranda')}
            />
          )}

          {activeTab === 'Profil' && (
            <ProfilView
              playerName={playerName}
              avatar={avatar}
              playerLevel={playerLevel}
              stars={stars}
              gems={gems}
              onUpdateProfile={(newName, newAvatar) => {
                setPlayerName(newName)
                setAvatar(newAvatar)
              }}
              onBackToHome={() => setActiveTab('Beranda')}
            />
          )}
        </main>

        {/* Global Bottom Navigation Dock */}
        {!isPlayingQuiz && (activeTab !== 'Peta' || petaFlowStep === 'map') && (
          <BottomNav
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab)
              if (tab === 'Peta') {
                setPetaFlowStep('map')
              }
            }}
          />
        )}

        {/* Fullscreen Interactive Quiz Overlay */}
        {isPlayingQuiz && (
          <QuizGame
            initialLevel={quizLevel}
            onFinishGame={handleFinishQuiz}
            onExitGame={() => setIsPlayingQuiz(false)}
          />
        )}

        {/* --- MODALS --- */}
        {activeModal === 'missions' && (
          <MissionsModal
            missions={missions}
            onClaim={handleClaimMission}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'settings' && (
          <SettingsModal
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onResetProgress={handleResetProgress}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'starsShop' && (
          <StarsShopModal
            stars={stars}
            onAddStars={(amount) => setStars((s) => s + amount)}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'gemsShop' && (
          <GemsShopModal
            gems={gems}
            onAddGems={(amount) => setGems((g) => g + amount)}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
