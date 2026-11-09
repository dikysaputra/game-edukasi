import React, { useState } from 'react'
import { sounds } from '../../utils/sound'
import type { LevelDetailData } from '../../data/levelFlowData'

interface LevelQuizViewProps {
  levelData: LevelDetailData
  explorationScore: number
  initialLives?: number
  onFinishQuiz: (finalScore: number, correctCount: number, remainingLives: number) => void
  onExit: () => void
}

export const LevelQuizView: React.FC<LevelQuizViewProps> = ({
  levelData,
  explorationScore,
  initialLives,
  onFinishQuiz,
  onExit,
}) => {
  const [qIndex, setQIndex] = useState(0)
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null)
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(explorationScore)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [tryCount, setTryCount] = useState(0)
  const [lives, setLives] = useState(initialLives ?? levelData.initialLives ?? 3)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentQ = levelData.questions[qIndex]

  // Deduct life on wrong answer helper
  const deductLife = () => {
    sounds.playWrong()
    setTryCount((t) => t + 1)
    setLives((prev) => {
      const nextLives = Math.max(0, prev - 1)
      if (nextLives === 0) {
        setIsGameOver(true)
      }
      return nextLives
    })
  }

  // Single-choice selection (Type: single-choice, numeric, object-identify)
  const handleSelectOption = (optId: string) => {
    if (hasSubmitted && isCorrect) return
    sounds.playClick()
    setSelectedSingle(optId)

    const chosen = currentQ.options.find((o) => o.id === optId)
    const correct = Boolean(chosen?.isCorrect)
    setIsCorrect(correct)
    setHasSubmitted(true)

    if (correct) {
      sounds.playSuccess()
      setCorrectAnswersCount((c) => c + 1)
      const points = 100 + (tryCount === 0 ? 50 : 0) // +100 correct, +50 no-hint first try
      setScore((s) => s + points)
    } else {
      deductLife()
    }
  }

  // Multi-select toggle (Type: multi-select)
  const handleToggleMulti = (optId: string) => {
    if (hasSubmitted && isCorrect) return
    sounds.playClick()
    setSelectedMulti((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    )
  }

  // Submit multi-select answer
  const handleSubmitMulti = () => {
    const correctIds = currentQ.options.filter((o) => o.isCorrect).map((o) => o.id)
    const isExactMatch =
      correctIds.length === selectedMulti.length &&
      correctIds.every((id) => selectedMulti.includes(id))

    setIsCorrect(isExactMatch)
    setHasSubmitted(true)

    if (isExactMatch) {
      sounds.playSuccess()
      setCorrectAnswersCount((c) => c + 1)
      const points = 100 + (tryCount === 0 ? 50 : 0)
      setScore((s) => s + points)
    } else {
      deductLife()
    }
  }

  // Try again after wrong answer
  const handleTryAgain = () => {
    sounds.playClick()
    setHasSubmitted(false)
    setIsCorrect(null)
    setSelectedSingle(null)
  }

  // Retry quiz after Game Over
  const handleRetryQuiz = () => {
    sounds.playClick()
    setLives(levelData.initialLives || 3)
    setIsGameOver(false)
    setQIndex(0)
    setSelectedSingle(null)
    setSelectedMulti([])
    setHasSubmitted(false)
    setIsCorrect(null)
    setTryCount(0)
    setScore(explorationScore)
    setCorrectAnswersCount(0)
  }

  // Advance to next question or finish quiz
  const handleNextQuestion = () => {
    sounds.playClick()
    if (qIndex < levelData.questions.length - 1) {
      setQIndex((idx) => idx + 1)
      setSelectedSingle(null)
      setSelectedMulti([])
      setHasSubmitted(false)
      setIsCorrect(null)
      setTryCount(0)
    } else {
      sounds.playVictory()
      onFinishQuiz(score, correctAnswersCount, lives)
    }
  }

  return (
    <div className="level-flow-screen quiz-level-screen">
      {/* Top Header Bar matching Screen 4 with Lives */}
      <header className="flow-top-bar quiz-top-bar">
        <button
          type="button"
          className="flow-pause-circle-btn"
          onClick={() => {
            sounds.playClick()
            setIsPaused((p) => !p)
          }}
          aria-label="Jeda Kuis"
        >
          <span>{isPaused ? '▶' : '⏸'}</span>
        </button>

        {/* Lives (Hati / Nyawa) Bar: 3 Hearts */}
        <div className="flow-header-lives-display quiz-lives-bar" title={`Sisa Nyawa: ${lives}/3`}>
          {[1, 2, 3].map((heartIndex) => (
            <span
              key={heartIndex}
              className={`heart-icon ${heartIndex <= lives ? 'heart-full' : 'heart-empty'}`}
            >
              {heartIndex <= lives ? '❤️' : '🤍'}
            </span>
          ))}
        </div>

        {/* Question Counter Pill */}
        <div className="quiz-progress-pill">
          <span className="quiz-num-badge">
            {qIndex + 1} / {levelData.questions.length}
          </span>
        </div>
      </header>

      {/* Progress Track */}
      <div className="quiz-header-progress-track">
        <div
          className="quiz-header-progress-fill"
          style={{ width: `${((qIndex + 1) / levelData.questions.length) * 100}%` }}
        />
      </div>

      {/* Question Body */}
      <div className="quiz-screen-body">
        {/* Category Label */}
        <span className="quiz-category-tag">{currentQ.categoryName}</span>

        {/* Prompt */}
        <h3 className="quiz-main-prompt">{currentQ.prompt}</h3>

        {/* Question Illustration / Image */}
        {currentQ.illustrationEmoji && (
          <div className="quiz-illustration-frame">
            {currentQ.illustrationEmoji === '🏠' ? (
              <div className="cute-house-illustration" aria-label="Rumah Kartun">
                <div className="house-roof-triangle">
                  <span className="roof-tip">🔺</span>
                </div>
                <div className="house-wall-square">
                  <div className="house-door" />
                  <div className="house-window" />
                </div>
              </div>
            ) : currentQ.illustrationEmoji === '🪟' ? (
              <div className="cute-window-illustration" aria-label="Jendela Kayu">
                <div className="window-frame-quad">
                  <div className="glass-pane pane-1" />
                  <div className="glass-pane pane-2" />
                  <div className="glass-pane pane-3" />
                  <div className="glass-pane pane-4" />
                </div>
              </div>
            ) : (
              <span className="quiz-giant-emoji">{currentQ.illustrationEmoji}</span>
            )}
          </div>
        )}

        {/* Option Layout 1: Object Cards Grid (Identifikasi Bentuk 2x2 cards) */}
        {currentQ.type === 'object-identify' && (
          <div className="quiz-grid-identify-cards">
            {currentQ.options.map((opt) => {
              const isSelected = selectedSingle === opt.id
              let cardClass = 'identify-card-btn'
              if (hasSubmitted) {
                if (isSelected) {
                  cardClass += opt.isCorrect ? ' correct-pick' : ' wrong-pick'
                } else if (opt.isCorrect) {
                  cardClass += ' correct-reveal'
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={cardClass}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <span className="card-item-emoji">{opt.imageEmoji}</span>
                  <span className="card-item-label">{opt.label}</span>
                  {hasSubmitted && isSelected && (
                    <span className="pick-indicator">{opt.isCorrect ? '✓' : '✕'}</span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Option Layout 2: Multi-select Checkbox Grid (Klasifikasi Bentuk) */}
        {currentQ.type === 'multi-select' && (
          <div className="quiz-multiselect-container">
            <div className="multiselect-grid">
              {currentQ.options.map((opt) => {
                const isChecked = selectedMulti.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`multiselect-card-btn ${isChecked ? 'checked' : ''}`}
                    onClick={() => handleToggleMulti(opt.id)}
                  >
                    <span className="card-item-emoji">{opt.imageEmoji}</span>
                    <span className="card-item-label">{opt.label}</span>
                    <span className={`custom-checkbox ${isChecked ? 'active' : ''}`}>
                      {isChecked ? '✓' : ''}
                    </span>
                  </button>
                )
              })}
            </div>
            {!hasSubmitted && (
              <button
                type="button"
                className="submit-multi-btn"
                disabled={selectedMulti.length === 0}
                onClick={handleSubmitMulti}
              >
                Periksa Pilihan (Pilih Semua yang Benar)
              </button>
            )}
          </div>
        )}

        {/* Option Layout 3: Numeric Buttons (Ciri-ciri Bentuk 3, 4, 5, 6) */}
        {currentQ.type === 'numeric' && (
          <div className="quiz-numeric-options-row">
            {currentQ.options.map((opt) => {
              const isSelected = selectedSingle === opt.id
              let btnClass = 'numeric-opt-btn'
              if (hasSubmitted) {
                if (isSelected) {
                  btnClass += opt.isCorrect ? ' correct' : ' wrong'
                } else if (opt.isCorrect) {
                  btnClass += ' correct-reveal'
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <span className="numeric-val">{opt.label}</span>
                  {hasSubmitted && isSelected && (
                    <span className="numeric-mark">{opt.isCorrect ? '✓' : '✕'}</span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Option Layout 4: Standard Options List (Screen 4 Style - Segitiga, Persegi, Persegi Panjang, Lingkaran) */}
        {currentQ.type === 'single-choice' && (
          <div className="quiz-standard-options-list">
            {currentQ.options.map((opt) => {
              const isSelected = selectedSingle === opt.id
              let btnClass = 'standard-opt-btn'
              if (hasSubmitted) {
                if (isSelected) {
                  btnClass += opt.isCorrect ? ' correct' : ' wrong'
                } else if (opt.isCorrect) {
                  btnClass += ' correct-reveal'
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={btnClass}
                  style={{ backgroundColor: opt.color || '#ffffff' }}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <span className="opt-shape-symbol">{opt.imageEmoji}</span>
                  <span className="opt-shape-text">{opt.label}</span>
                  {hasSubmitted && isSelected && (
                    <span className="opt-check-bubble">
                      {opt.isCorrect ? '✓' : '✕'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Answer Feedback & Explanation */}
        {hasSubmitted && (
          <div className={`quiz-result-feedback ${isCorrect ? 'is-success' : 'is-error'}`}>
            <div className="feedback-badge-row">
              <span className="feedback-lead">
                {isCorrect ? '🎉 Jawaban Benar! (+100 Poin)' : '💡 Belum Tepat!'}
              </span>
            </div>
            <p className="feedback-explanation-text">{currentQ.explanation}</p>

            {!isCorrect && (
              <button
                type="button"
                className="try-again-action-btn"
                onClick={handleTryAgain}
              >
                🔄 Coba Lagi
              </button>
            )}
          </div>
        )}

        {/* Next Question / Finish Action Button */}
        {hasSubmitted && isCorrect && (
          <div className="quiz-next-action-row">
            <button
              type="button"
              className="quiz-primary-next-btn"
              onClick={handleNextQuestion}
            >
              {qIndex < levelData.questions.length - 1
                ? 'Lanjut Soal Berikutnya ➔'
                : 'Lihat Hasil Level 🏆'}
            </button>
          </div>
        )}
      </div>

      {/* Game Over (Nyawa Habis) Overlay */}
      {isGameOver && (
        <div className="explore-gameover-overlay">
          <div className="gameover-dialog-card">
            <span className="gameover-broken-heart">💔</span>
            <h3>Nyawa Habis!</h3>
            <p>Nyawamu habis saat menjawab kuis. Coba pelajari lagi konsep bentuknya dan ulangi kuis!</p>
            <div className="gameover-actions-column">
              <button
                type="button"
                className="gameover-retry-btn"
                onClick={handleRetryQuiz}
              >
                🔄 Ulangi Kuis (Isi 3 Nyawa)
              </button>
              <button
                type="button"
                className="gameover-exit-btn"
                onClick={onExit}
              >
                ✕ Kembali ke Peta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Dialog Overlay */}
      {isPaused && (
        <div className="explore-pause-overlay">
          <div className="pause-dialog-card">
            <h3>Kuis Dijeda</h3>
            <button
              type="button"
              className="pause-action-btn primary"
              onClick={() => setIsPaused(false)}
            >
              ▶ Lanjutkan Kuis
            </button>
            <button
              type="button"
              className="pause-action-btn exit"
              onClick={onExit}
            >
              ✕ Keluar ke Peta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
