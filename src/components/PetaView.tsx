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
import { level1Data, type LevelDetailData } from '../data/levelFlowData'
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

  // Level flow state
  const [activeLevelData, setActiveLevelData] = useState<LevelDetailData>(level1Data)
  const [coinsEarnedInExploration, setCoinsEarnedInExploration] = useState(12)
  const [finalScore, setFinalScore] = useState(460)
  const [quizCorrectCount, setQuizCorrectCount] = useState(5)

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
      'Halo! Kita ada di Pulau Bentuk! Ayo lanjut taklukkan Level 1 & 2!',
      'Lihat ke seberang awan, ada Hutan Segi Empat dan Danau Lingkaran!',
      'Kumpulkan semua bentuk di tahap Eksplorasi untuk bonus poin!',
      'Segitiga punya 3 sisi kokoh, siap menemanimu menjelajahi peta ini!'
    ]
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    setBubbleText(randomMsg)
    setTimeout(() => setHeroBouncing(false), 600)
    setTimeout(() => setBubbleText(null), 4500)
  }

  // Launch the 4-step level flow when a level node is clicked
  const handleLevelClick = (lvlNum: number) => {
    sounds.playClick()
    // Configure level data (custom or default Level 1)
    if (lvlNum === 1) {
      setActiveLevelData(level1Data)
    } else {
      setActiveLevelData({
        ...level1Data,
        levelNumber: lvlNum,
        levelTitle: lvlNum <= 3 ? 'Pulau Bentuk' : lvlNum <= 12 ? 'Hutan Segi Empat' : 'Pegunungan Geometri',
        objective: 'Mengenali bangun datar, sisi, sudut, serta kelilingnya.',
      })
    }
    // Advance to Step 2: Detail Level
    changeStep('detail')
  }

  // Step 2 -> Step 3: Start Exploration
  const handleStartExploration = () => {
    sounds.playClick()
    changeStep('exploration')
  }

  // Step 3 -> Step 4: Finish Exploration and go to Quiz
  const handleFinishExploration = (earnedCoins: number) => {
    setCoinsEarnedInExploration(earnedCoins)
    changeStep('quiz')
  }

  // Step 4 -> Step 5: Finish Quiz and show Results
  const handleFinishQuiz = (score: number, correctCount: number) => {
    setFinalScore(score)
    setQuizCorrectCount(correctCount)
    // Award rewards to player's global wallet
    onUpdateRewards(3, coinsEarnedInExploration || 460, 100)
    changeStep('result')
  }

  // Step 5 Actions: Continue or Replay
  const handleContinueFromResult = () => {
    changeStep('map')
  }

  const handleReplayLevel = () => {
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

      {/* 7. Daily Mission Card */}
      <button
        type="button"
        className="hotspot-map-mission-card"
        onClick={() => { sounds.playClick(); onOpenMissions(); }}
        aria-label="Misi Hari Ini"
        title="Lihat Detail Misi"
      >
        <div className="mission-icon-wrap">📋</div>
        <div className="mission-text-wrap">
          <span className="mission-title">{activeMission.title}</span>
          <span className="mission-sub">{activeMission.description}</span>
          <div className="mission-bar-track">
            <div
              className="mission-bar-fill"
              style={{ width: `${Math.min(100, (activeMission.progress / activeMission.target) * 100)}%` }}
            />
          </div>
        </div>
        <div className="mission-status-wrap">
          <span className="mission-chevron">›</span>
          <span className="mission-count-badge">
            {activeMission.progress}/{activeMission.target}
          </span>
        </div>
      </button>

      {/* --- QUICK START CHIP FOR COMPLETE FLOW --- */}
      <button
        type="button"
        className="map-flow-quick-chip"
        onClick={() => handleLevelClick(1)}
        title="Mulai Alur Level 1: Detail ➔ Eksplorasi ➔ Soal ➔ Hasil"
      >
        <span className="chip-play-icon">▶</span>
        <span className="chip-label">Mainkan Alur Lengkap Level 1</span>
        <span className="chip-badge">Baru!</span>
      </button>

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

      {/* --- LEVEL NODES (Starting the sequential flow!) --- */}
      {/* Island 1: Pulau Bentuk */}
      <button
        type="button"
        className="hotspot-level-node node-lvl-1 active-completed"
        onClick={() => handleLevelClick(1)}
        aria-label="Level 1 - Mulai Alur Petualangan"
        title="Level 1: Gerbang Pulau Bentuk"
      >
        <span className="node-glow-ring" />
      </button>

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

      <button
        type="button"
        className="hotspot-level-node node-lvl-2 active-ready"
        onClick={() => handleLevelClick(2)}
        aria-label="Level 2 - Siap Dimainkan"
        title="Level 2: Persegi & Persegi Panjang"
      >
        <span className="node-glow-ring" />
      </button>

      <button
        type="button"
        className="hotspot-level-node node-lvl-3 locked"
        onClick={() => handleLevelClick(3)}
        aria-label="Level 3 - Terkunci"
        title="Level 3: Tebak Bentuk"
      />

      {/* Island 2: Hutan Segi Empat Nodes */}
      <button
        type="button"
        className="hotspot-level-node node-lvl-7 locked"
        onClick={() => handleLevelClick(7)}
        aria-label="Level 7"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-8 locked"
        onClick={() => handleLevelClick(8)}
        aria-label="Level 8"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-9 locked"
        onClick={() => handleLevelClick(9)}
        aria-label="Level 9"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-10 locked"
        onClick={() => handleLevelClick(8)}
        aria-label="Level 8 / 10"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-12a locked"
        onClick={() => handleLevelClick(12)}
        aria-label="Level 12"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-12b locked"
        onClick={() => handleLevelClick(12)}
        aria-label="Level 12"
      />

      {/* Island 3: Pegunungan Segitiga Nodes */}
      <button
        type="button"
        className="hotspot-level-node node-lvl-13 locked"
        onClick={() => handleLevelClick(13)}
        aria-label="Level 13"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-14 locked"
        onClick={() => handleLevelClick(14)}
        aria-label="Level 14"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-15 locked"
        onClick={() => handleLevelClick(15)}
        aria-label="Level 15"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-16 locked"
        onClick={() => handleLevelClick(16)}
        aria-label="Level 16"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-17 locked"
        onClick={() => handleLevelClick(17)}
        aria-label="Level 17"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-18 locked"
        onClick={() => handleLevelClick(18)}
        aria-label="Level 18"
      />

      {/* Island 4: Danau Lingkaran Nodes */}
      <button
        type="button"
        className="hotspot-level-node node-lvl-19 locked"
        onClick={() => handleLevelClick(19)}
        aria-label="Level 19"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-20 locked"
        onClick={() => handleLevelClick(20)}
        aria-label="Level 20"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-21 locked"
        onClick={() => handleLevelClick(21)}
        aria-label="Level 21"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-22 locked"
        onClick={() => handleLevelClick(22)}
        aria-label="Level 22"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-23 locked"
        onClick={() => handleLevelClick(23)}
        aria-label="Level 23"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-24 locked"
        onClick={() => handleLevelClick(24)}
        aria-label="Level 24"
      />

      {/* Island 5: Kastil Geometri Nodes */}
      <button
        type="button"
        className="hotspot-level-node node-lvl-25 locked"
        onClick={() => handleLevelClick(25)}
        aria-label="Level 25"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-26 locked"
        onClick={() => handleLevelClick(26)}
        aria-label="Level 26"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-27 locked"
        onClick={() => handleLevelClick(27)}
        aria-label="Level 27"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-28 locked"
        onClick={() => handleLevelClick(28)}
        aria-label="Level 28"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-29 locked"
        onClick={() => handleLevelClick(29)}
        aria-label="Level 29"
      />
      <button
        type="button"
        className="hotspot-level-node node-lvl-30 locked"
        onClick={() => handleLevelClick(30)}
        aria-label="Level 30"
      />

      {/* Airship Easter Egg */}
      <div
        className="hotspot-zeppelin"
        onClick={handleZeppelinClick}
        role="button"
        tabIndex={0}
        aria-label="Kapal Udara Geometri"
        title="Kapal Udara"
      />

      {/* --- BOTTOM-LEFT: HADIAH DUNIA CARD (Screen 1 exact match!) --- */}
      <button
        type="button"
        className="hotspot-world-reward-card"
        onClick={() => {
          sounds.playStarCoin()
          setShowShapeCollection(true)
        }}
        aria-label="Hadiah Dunia: 1/6"
        title="Buka Koleksi Hadiah Dunia"
      >
        <span className="reward-card-title">Hadiah Dunia</span>
        <div className="reward-shapes-chips">
          <span className="reward-chip chip-tri">▲</span>
          <span className="reward-chip chip-sq">■</span>
          <span className="reward-chip chip-circ">●</span>
        </div>
        <div className="reward-progress-track">
          <div className="reward-progress-fill" style={{ width: '16.6%' }} />
        </div>
        <span className="reward-ratio-badge">1/6</span>
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
