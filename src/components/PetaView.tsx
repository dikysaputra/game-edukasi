import React, { useState } from 'react'
import { sounds } from '../utils/sound'
import type { MapLevelInfo } from '../data/quizQuestions'
import type { MissionItem } from '../data/missionsData'
import { LevelPreviewModal } from './LevelPreviewModal'
import { ShapeCollectionModal } from './ShapeCollectionModal'
import { LevelDetailView } from './levelFlow/LevelDetailView'
import { ExplorationView } from './levelFlow/ExplorationView'
import { LevelQuizView } from './levelFlow/LevelQuizView'
import { LevelResultView } from './levelFlow/LevelResultView'
import { level1Data, getLevelData, islandThemeNames, type LevelDetailData } from '../data/levelFlowData'
import mapScreenImg from '../assets/map-screen.jpg'

interface PetaViewProps {
  stars: number
  gems: number
  coins: number
  xp: number
  playerLevel: number
  playerName: string
  avatar: string
  activeMission: MissionItem
  onUpdateRewards: (earnedStars: number, earnedCoins: number, earnedXp: number) => void
  onBackToHome: () => void
  onOpenMissions: () => void
  onOpenSettings: () => void
  onOpenStarsShop: () => void
  onOpenGemsShop: () => void
  onOpenProfile: () => void
  onFlowStepChange?: (step: 'map' | 'detail' | 'exploration' | 'quiz' | 'result') => void
}

interface MapIslandNodeConfig {
  lvl: number
  islandNumber: number
  top: string
  left: string
  title: string
}

// Exactly 3 levels per island, ordered sequentially from 1 to 15!
const mapIslandsLevels: MapIslandNodeConfig[] = [
  // Pulau 1: Pulau Bentuk (Levels 1, 2, 3)
  { lvl: 1, islandNumber: 1, top: '26.7%', left: '15.7%', title: 'Gerbang Pulau Bentuk' },
  { lvl: 2, islandNumber: 1, top: '26.7%', left: '27.6%', title: 'Lembah Bentuk' },
  { lvl: 3, islandNumber: 1, top: '26.7%', left: '39.5%', title: 'Hutan Bentuk' },

  // Pulau 2: Hutan Segi Empat (Levels 4, 5, 6)
  { lvl: 4, islandNumber: 2, top: '36.3%', left: '64.5%', title: 'Sisi & Sudut Segi Empat' },
  { lvl: 5, islandNumber: 2, top: '35.7%', left: '76.5%', title: 'Macam-macam Segi Empat' },
  { lvl: 6, islandNumber: 2, top: '36.1%', left: '88.4%', title: 'Keliling Segi Empat' },

  // Pulau 3: Pegunungan Segitiga (Levels 7, 8, 9)
  { lvl: 7, islandNumber: 3, top: '54.3%', left: '18.4%', title: 'Segitiga Sama Sisi & Kaki' },
  { lvl: 8, islandNumber: 3, top: '54.0%', left: '30.2%', title: 'Segitiga Siku-siku' },
  { lvl: 9, islandNumber: 3, top: '53.7%', left: '40.9%', title: 'Keliling Segi Empat' },

  // Pulau 4: Danau Lingkaran (Levels 10, 11, 12)
  { lvl: 10, islandNumber: 4, top: '61.2%', left: '68.8%', title: 'Jari-jari Lingkaran' },
  { lvl: 11, islandNumber: 4, top: '61.2%', left: '77.3%', title: 'Diameter Lingkaran' },
  { lvl: 12, islandNumber: 4, top: '61.6%', left: '88.3%', title: 'Keliling & Luas Lingkaran' },

  // Pulau 5: Kastil Geometri (Levels 13, 14, 15)
  { lvl: 13, islandNumber: 5, top: '80.0%', left: '39.3%', title: 'Gabungan Bentuk Datar' },
  { lvl: 14, islandNumber: 5, top: '80.5%', left: '50.1%', title: 'Luas Gabungan Bentuk' },
  { lvl: 15, islandNumber: 5, top: '80.5%', left: '60.2%', title: 'Ujian Geometri Pamungkas' },
]

const STORAGE_KEY = 'game_level_progress_v4'

const getInitialLevelProgress = (): Record<number, { completed: boolean; stars: number; unlocked: boolean }> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object' && parsed[1]?.unlocked) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to parse saved level progress', e)
  }
  // Only Level 1 starts unlocked; Levels 2 to 15 are strictly locked until previous level is completed!
  return {
    1: { completed: false, stars: 0, unlocked: true },
    2: { completed: false, stars: 0, unlocked: false },
    3: { completed: false, stars: 0, unlocked: false },
    4: { completed: false, stars: 0, unlocked: false },
    5: { completed: false, stars: 0, unlocked: false },
    6: { completed: false, stars: 0, unlocked: false },
    7: { completed: false, stars: 0, unlocked: false },
    8: { completed: false, stars: 0, unlocked: false },
    9: { completed: false, stars: 0, unlocked: false },
    10: { completed: false, stars: 0, unlocked: false },
    11: { completed: false, stars: 0, unlocked: false },
    12: { completed: false, stars: 0, unlocked: false },
    13: { completed: false, stars: 0, unlocked: false },
    14: { completed: false, stars: 0, unlocked: false },
    15: { completed: false, stars: 0, unlocked: false },
  }
}

export const PetaView: React.FC<PetaViewProps> = ({
  stars,
  gems,
  coins,
  playerLevel,
  playerName,
  avatar,
  activeMission,
  onUpdateRewards,
  onBackToHome,
  onOpenMissions,
  onOpenSettings,
  onOpenStarsShop,
  onOpenGemsShop,
  onOpenProfile,
  onFlowStepChange,
}) => {
  // Current step in the 5-step game loop:
  // 1. 'map' -> Peta Dunia
  // 2. 'detail' -> Detail Level
  // 3. 'exploration' -> Eksplorasi & Kumpulkan
  // 4. 'quiz' -> Soal / Tantangan
  // 5. 'result' -> Hasil Level
  const [flowStep, setFlowStep] = useState<'map' | 'detail' | 'exploration' | 'quiz' | 'result'>('map')

  // Level flow state & 3 lives system
  const [activeLevelData, setActiveLevelData] = useState<LevelDetailData>(level1Data)
  const [currentLives, setCurrentLives] = useState<number>(3)
  const [coinsEarnedInExploration, setCoinsEarnedInExploration] = useState(12)
  const [finalScore, setFinalScore] = useState(460)
  const [quizCorrectCount, setQuizCorrectCount] = useState(5)

  // Level Progression: 5 islands x 3 levels = 15 levels total
  // Only Level 1 starts unlocked; succeeding levels unlock one-by-one as previous is completed
  const [levelProgress, setLevelProgress] = useState<Record<number, { completed: boolean; stars: number; unlocked: boolean }>>(getInitialLevelProgress)
  const [shakingNodeId, setShakingNodeId] = useState<number | null>(null)

  // Map easter-eggs and dialogs
  const [bubbleText, setBubbleText] = useState<string | null>(null)
  const [heroBouncing, setHeroBouncing] = useState(false)
  const [previewLevel, setPreviewLevel] = useState<MapLevelInfo | null>(null)
  const [showShapeCollection, setShowShapeCollection] = useState(false)

  const changeStep = (step: 'map' | 'detail' | 'exploration' | 'quiz' | 'result') => {
    setFlowStep(step)
    if (onFlowStepChange) {
      onFlowStepChange(step)
    }
  }

  // Character interaction on map
  const handleHeroClick = () => {
    sounds.playBoing()
    setHeroBouncing(true)
    const messages = [
      'Halo! Kita ada di Pulau Bentuk! Selesaikan level satu per satu untuk membuka pulau selanjutnya!',
      'Hati-hati saat menjelajah! Jangan sampai jatuh agar 3 nyawamu utuh!',
      'Di akhir level, sisa nyawamu menentukan berapa bintang emas ⭐ yang kamu peroleh!',
      'Segitiga siap menemanimu menaklukkan 15 level di 5 pulau geometri!'
    ]
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    setBubbleText(randomMsg)
    setTimeout(() => setHeroBouncing(false), 600)
    setTimeout(() => setBubbleText(null), 4500)
  }

  // Launch the 4-step level flow when a level node is clicked
  const handleLevelClick = (lvlNum: number) => {
    const info = levelProgress[lvlNum]
    if (!info || !info.unlocked) {
      sounds.playWrong()
      setShakingNodeId(lvlNum)
      setTimeout(() => setShakingNodeId(null), 500)
      setBubbleText(`🔒 Level ${lvlNum} masih terkunci! Selesaikan Level ${lvlNum - 1} terlebih dahulu.`)
      setTimeout(() => setBubbleText(null), 3500)
      return
    }

    sounds.playClick()
    setActiveLevelData(getLevelData(lvlNum))
    setCurrentLives(3) // Each level starts fresh with 3 lives
    changeStep('detail')
  }

  // Step 2 -> Step 3: Start Exploration
  const handleStartExploration = () => {
    sounds.playClick()
    changeStep('exploration')
  }

  // Step 3 -> Step 4: Finish Exploration and go to Quiz
  const handleFinishExploration = (earnedCoins: number, _shapes: number, remainingLives: number) => {
    setCoinsEarnedInExploration(earnedCoins)
    setCurrentLives(remainingLives)
    changeStep('quiz')
  }

  // Step 4 -> Step 5: Finish Quiz and show Results
  const handleFinishQuiz = (score: number, correctCount: number, remainingLives: number) => {
    setFinalScore(score)
    setQuizCorrectCount(correctCount)
    setCurrentLives(remainingLives)

    // Calculate star rating strictly based on remaining lives (1 to 3 stars)
    const starsEarned = Math.max(1, Math.min(3, remainingLives))

    // Update level progress (mark completed, save stars matching lives, unlock next level)
    setLevelProgress((prev) => {
      const currentLevelNum = activeLevelData.levelNumber
      const updated = {
        ...prev,
        [currentLevelNum]: {
          completed: true,
          stars: starsEarned, // Matches remaining lives: 3 lives = 3 stars, 2 lives = 2 stars, 1 life = 1 star
          unlocked: true,
        },
        ...(currentLevelNum < 15
          ? {
              [currentLevelNum + 1]: {
                ...(prev[currentLevelNum + 1] || { completed: false, stars: 0 }),
                unlocked: true,
              },
            }
          : {}),
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error('Failed to save progress to localStorage:', e)
      }
      return updated
    })

    // Award rewards to player's global wallet
    onUpdateRewards(starsEarned, coinsEarnedInExploration || 460, 100)
    changeStep('result')
  }

  // Step 5 Actions: Continue or Replay
  const handleContinueFromResult = () => {
    changeStep('map')
    const nextLvl = activeLevelData.levelNumber + 1
    if (nextLvl <= 15) {
      setBubbleText(`🎉 Luar biasa! Level ${activeLevelData.levelNumber} selesai! Level ${nextLvl} sekarang sudah terbuka!`)
      setTimeout(() => setBubbleText(null), 4500)
    } else {
      setBubbleText('👑 Selamat! Kamu telah berhasil menaklukkan seluruh 15 level petualangan!')
      setTimeout(() => setBubbleText(null), 5000)
    }
  }

  const handleReplayLevel = () => {
    setCurrentLives(3)
    changeStep('detail')
  }

  // Island Banner Click
  const handleIslandBannerClick = (islandName: string, desc: string) => {
    sounds.playClick()
    setBubbleText(`${islandName}: ${desc}`)
    setTimeout(() => setBubbleText(null), 4000)
  }

  // Zeppelin Easter Egg
  const handleZeppelinClick = () => {
    sounds.playBoing()
    setBubbleText('🎈 Kapal Udara Geometri: Mengirim perbekalan koin dan bentuk ke seluruh pulau!')
    setTimeout(() => setBubbleText(null), 4000)
  }

  // --- STEP 2: DETAIL LEVEL VIEW ---
  if (flowStep === 'detail') {
    return (
      <LevelDetailView
        levelData={activeLevelData}
        playerStars={stars}
        playerCoins={coins}
        onBackToMap={() => changeStep('map')}
        onStartExploration={handleStartExploration}
      />
    )
  }

  // --- STEP 3: EKSPLORASI & KUMPULKAN VIEW ---
  if (flowStep === 'exploration') {
    return (
      <ExplorationView
        levelData={activeLevelData}
        onFinishExploration={handleFinishExploration}
        onExit={() => changeStep('map')}
      />
    )
  }

  // --- STEP 4: SOAL / TANTANGAN VIEW ---
  if (flowStep === 'quiz') {
    return (
      <LevelQuizView
        levelData={activeLevelData}
        explorationScore={100}
        initialLives={currentLives}
        onFinishQuiz={handleFinishQuiz}
        onExit={() => changeStep('map')}
      />
    )
  }

  // --- STEP 5: HASIL LEVEL VIEW ---
  if (flowStep === 'result') {
    return (
      <LevelResultView
        levelData={activeLevelData}
        finalScore={finalScore}
        correctCount={quizCorrectCount}
        coinsEarned={coinsEarnedInExploration}
        remainingLives={currentLives}
        onContinue={handleContinueFromResult}
        onReplay={handleReplayLevel}
      />
    )
  }

  // --- STEP 1: PETA DUNIA (DEFAULT MAP SCREEN) ---
  return (
    <div className="peta-container">
      {/* 100% Visual Fidelity matching user uploaded image */}
      <img
        src={mapScreenImg}
        alt="Peta Petualangan Bangun Datar"
        className="peta-art-base"
        draggable={false}
      />

      {/* Floating Sparkles & Clouds animation layer */}
      <div className="sky-particles" aria-hidden="true">
        <span className="sparkle s1">✨</span>
        <span className="sparkle s2">⭐</span>
        <span className="sparkle s3">✨</span>
      </div>

      {/* Speech Bubble for Character Si Segitiga */}
      {bubbleText && (
        <div className="character-speech-bubble map-speech-bubble" onClick={() => setBubbleText(null)}>
          <span className="speech-tail map-speech-tail" />
          <p>{bubbleText}</p>
        </div>
      )}

      {/* --- TOP BAR INTERACTIVE OVERLAYS --- */}
      {/* 1. Player Profile Pill */}
      <button
        type="button"
        className="hotspot-map-player-pill"
        onClick={() => { sounds.playClick(); onOpenProfile(); }}
        aria-label={`Profil Siswa ${playerName}`}
        title="Buka Profil Siswa"
      >
        <span className="pill-avatar">{avatar}</span>
        <div className="pill-info">
          <span className="pill-role">Siswa</span>
          <strong className="pill-name">{playerName}</strong>
          <div className="pill-progress-track">
            <div className="pill-progress-fill" style={{ width: '75%' }} />
          </div>
          <span className="pill-level">Level {playerLevel}</span>
        </div>
      </button>

      {/* 2. Stars Currency Pill */}
      <div className="hotspot-map-stars-pill" title="Koleksi Bintang">
        <button
          type="button"
          className="currency-click-area"
          onClick={() => { sounds.playStarCoin(); onOpenStarsShop(); }}
          aria-label="Lihat Bintang"
        >
          <span className="currency-star-icon">⭐</span>
          <span className="currency-value">{stars}</span>
        </button>
        <button
          type="button"
          className="currency-add-btn"
          onClick={(e) => { e.stopPropagation(); sounds.playStarCoin(); onOpenStarsShop(); }}
          aria-label="Tambah Bintang"
        >
          +
        </button>
      </div>

      {/* 3. Gems Currency Pill */}
      <div className="hotspot-map-gems-pill" title="Koleksi Permata">
        <button
          type="button"
          className="currency-click-area"
          onClick={() => { sounds.playClick(); onOpenGemsShop(); }}
          aria-label="Lihat Permata"
        >
          <span className="currency-gem-icon">💎</span>
          <span className="currency-value">{gems}</span>
        </button>
        <button
          type="button"
          className="currency-add-btn"
          onClick={(e) => { e.stopPropagation(); sounds.playClick(); onOpenGemsShop(); }}
          aria-label="Tambah Permata"
        >
          +
        </button>
      </div>

      {/* 4. Settings Button */}
      <button
        type="button"
        className="hotspot-map-settings-btn"
        onClick={() => { sounds.playClick(); onOpenSettings(); }}
        aria-label="Pengaturan Game"
        title="Pengaturan"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      {/* --- SUB-HEADER: BACK BUTTON, WOODEN BANNER & MISSIONS CARD --- */}
      {/* 5. Circular Back Button */}
      <button
        type="button"
        className="hotspot-map-back-btn"
        onClick={() => { sounds.playClick(); onBackToHome(); }}
        aria-label="Kembali ke Beranda"
        title="Kembali ke Beranda"
      >
        <span className="back-chevron">‹</span>
      </button>

      {/* 6. Wooden Plaque Banner ("Peta Petualangan") */}
      <div
        className="hotspot-map-title-banner"
        onClick={() => handleIslandBannerClick('Peta Petualangan', 'Pilih Pulau Bentuk dan ketuk Level 1 untuk memulai alur petualangan lengkap!')}
        role="button"
        tabIndex={0}
        aria-label="Peta Petualangan - Jelajahi Dunia, Temukan Bentuknya!"
        title="Peta Petualangan"
      />

      {/* 7. Daily Mission Card Hotspot */}
      <button
        type="button"
        className="hotspot-map-mission-card"
        onClick={() => { sounds.playClick(); onOpenMissions(); }}
        aria-label={`Misi Hari Ini: ${activeMission.title} (${activeMission.progress}/${activeMission.target})`}
        title={`Misi Hari Ini: ${activeMission.title}`}
      />

      {/* --- ISLAND BANNERS INTERACTIVITY --- */}
      <button
        type="button"
        className="hotspot-island-banner island-1-banner"
        onClick={() => handleIslandBannerClick('1. Pulau Bentuk', 'Zona pertama untuk mempelajari bangun datar dasar seperti segitiga, persegi, dan lingkaran.')}
        aria-label="Pulau Bentuk - Mengenali bentuk dasar"
      />
      <button
        type="button"
        className="hotspot-island-banner island-2-banner"
        onClick={() => handleIslandBannerClick('2. Hutan Segi Empat', 'Zona pohon ungu dan gerbang persegi untuk mengenal sisi, sudut, trapesium, dan jajar genjang.')}
        aria-label="Hutan Segi Empat - Sisi, sudut dan jenis-jenisnya"
      />
      <button
        type="button"
        className="hotspot-island-banner island-3-banner"
        onClick={() => handleIslandBannerClick('3. Pegunungan Segitiga', 'Puncak bersalju tempat mempelajari jenis segitiga siku-siku, sama kaki, dan keliling.')}
        aria-label="Pegunungan Segitiga - Jenis segitiga dan keliling"
      />
      <button
        type="button"
        className="hotspot-island-banner island-4-banner"
        onClick={() => handleIslandBannerClick('4. Danau Lingkaran', 'Danau cincin donat ungu tempat mempelajari jari-jari, diameter, dan luas lingkaran.')}
        aria-label="Danau Lingkaran - Jari-jari, diameter dan luas"
      />
      <button
        type="button"
        className="hotspot-island-banner island-5-banner"
        onClick={() => handleIslandBannerClick('5. Kastil Geometri', 'Pusat istana megah tempat menguji kemampuan menghitung luas gabungan bentuk datar!')}
        aria-label="Kastil Geometri - Gabungan bentuk dan luas"
      />

      {/* --- LEVEL NODES: EXACTLY 3 LEVELS PER ISLAND (15 LEVELS TOTAL) --- */}
      {mapIslandsLevels.map((item) => {
        const p = levelProgress[item.lvl] || { completed: false, stars: 0, unlocked: false }
        const isUnlocked = !!p.unlocked
        const isCompleted = !!p.completed
        const isShaking = shakingNodeId === item.lvl
        const isCurrentActive = isUnlocked && !isCompleted

        return (
          <button
            key={item.lvl}
            type="button"
            className={`map-island-node node-lvl-${item.lvl} ${isUnlocked ? 'node-unlocked' : 'node-locked'} ${isShaking ? 'shaking' : ''}`}
            style={{ top: item.top, left: item.left }}
            onClick={() => handleLevelClick(item.lvl)}
            aria-label={`[${islandThemeNames[item.lvl]?.name || 'Pulau'}] Level ${item.lvl}: ${item.title} - ${isCompleted ? `${p.stars} Bintang` : isUnlocked ? 'Terbuka' : 'Terkunci'}`}
            title={`[${islandThemeNames[item.lvl]?.name || 'Pulau'}] Level ${item.lvl}: ${item.title} ${!isUnlocked ? '(Terkunci - Selesaikan level sebelumnya)' : ''}`}
          >
            {/* Clean, non-stacking stars sitting naturally right on the node rim */}
            {isCompleted && p.stars > 0 && (
              <div className={`node-stars-row stars-count-${p.stars}`} aria-label={`${p.stars} bintang`}>
                {Array.from({ length: p.stars }).map((_, idx) => (
                  <span key={idx} className="node-floating-star">⭐</span>
                ))}
              </div>
            )}

            {/* Glowing ring animation on current ready level */}
            {isCurrentActive && <span className="node-glow-ring" />}

            {/* If locked, show sleek lock badge overlay */}
            {!isUnlocked && (
              <span className="locked-node-overlay" aria-hidden="true">
                <span className="locked-padlock-icon">🔒</span>
              </span>
            )}
          </button>
        )
      })}

      {/* Si Segitiga Character on Island 1 */}
      <div
        className={`hotspot-hero-on-map ${heroBouncing ? 'hero-bounce-active' : ''}`}
        onClick={handleHeroClick}
        role="button"
        tabIndex={0}
        aria-label="Si Segitiga di Pulau Bentuk"
        title="Ketuk aku!"
      >
        <span className="hero-map-tap-hint">👆</span>
      </div>

      {/* Airship Easter Egg */}
      <div
        className="hotspot-zeppelin"
        onClick={handleZeppelinClick}
        role="button"
        tabIndex={0}
        aria-label="Kapal Udara Geometri"
        title="Kapal Udara"
      />

      {/* --- BOTTOM-LEFT: KOLEKSI BENTUK (3/24) CARD --- */}
      <button
        type="button"
        className="hotspot-shape-chest-card"
        onClick={() => {
          sounds.playStarCoin()
          setShowShapeCollection(true)
        }}
        aria-label="Koleksi Bentuk: 3 dari 24 bentuk terkumpul"
        title="Buka Koleksi Bentuk (3/24)"
      >
        <span className="chest-tap-glow" aria-hidden="true" />
      </button>

      {/* --- LEVEL PREVIEW MODAL (if previewLevel is set) --- */}
      {previewLevel && (
        <LevelPreviewModal
          levelInfo={previewLevel}
          currentStars={stars}
          onStartLevel={(lvl) => {
            setPreviewLevel(null)
            handleLevelClick(lvl)
          }}
          onClose={() => setPreviewLevel(null)}
        />
      )}

      {/* --- SHAPE COLLECTION MODAL --- */}
      {showShapeCollection && (
        <ShapeCollectionModal onClose={() => setShowShapeCollection(false)} />
      )}
    </div>
  )
}
