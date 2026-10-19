import React, { useState } from 'react'
import { sounds } from '../utils/sound'
import { quizQuestions, type QuestionItem } from '../data/quizQuestions'

interface QuizGameProps {
  initialLevel?: number
  onFinishGame: (earnedStars: number, earnedGems: number) => void
  onExitGame: () => void
}

export const QuizGame: React.FC<QuizGameProps> = ({
  initialLevel = 1,
  onFinishGame,
  onExitGame,
}) => {
  const currentQuestions: QuestionItem[] = quizQuestions.filter((q) => q.level === initialLevel)
  const [qIndex, setQIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isVictory, setIsVictory] = useState(false)
  const [streak, setStreak] = useState(0)

  const currentQ = currentQuestions[qIndex] || currentQuestions[0]

  const handleChoose = (choice: string) => {
    if (selectedAnswer) return
    setSelectedAnswer(choice)

    const isCorrect = choice === currentQ.correctAnswer
    if (isCorrect) {
      sounds.playSuccess()
      setScore((s) => s + 10)
      setStreak((st) => st + 1)
    } else {
      sounds.playWrong()
      setStreak(0)
      setLives((l) => {
        const nextLives = l - 1
        if (nextLives <= 0) {
          setIsGameOver(true)
        }
        return nextLives
      })
    }
  }

  const handleNext = () => {
    sounds.playClick()
    if (qIndex < currentQuestions.length - 1) {
      setQIndex((idx) => idx + 1)
      setSelectedAnswer(null)
    } else {
      sounds.playVictory()
      setIsVictory(true)
    }
  }

  const handleClaimAndExit = () => {
    sounds.playStarCoin()
    const starsReward = score + 20
    const gemsReward = lives * 5
    onFinishGame(starsReward, gemsReward)
  }

  // Victory Celebration Screen
  if (isVictory) {
    const starsReward = score + 20
    const gemsReward = lives * 5
    return (
      <div className="quiz-screen-overlay victory-screen">
        <div className="quiz-result-card">
          <div className="result-sparkles">🎉 ⭐ 🏆 ⭐ 🎉</div>
          <span className="result-kicker">LEVEL SELESAI DENGAN GEMILANG!</span>
          <h2>Petualang Bangun Datar Hebat!</h2>
          <p className="result-subtext">Kamu berhasil menyelesaikan semua tantangan di {currentQ.levelTitle}!</p>

          <div className="result-stars-row">
            <span className="result-star bounce-1">⭐</span>
            <span className="result-star bounce-2">⭐</span>
            <span className="result-star bounce-3">{lives >= 2 ? '⭐' : '☆'}</span>
          </div>

          <div className="result-rewards-box">
            <div className="reward-item">
              <span className="reward-icon">⭐</span>
              <strong>+{starsReward} Bintang</strong>
            </div>
            <div className="reward-item">
              <span className="reward-icon">💎</span>
              <strong>+{gemsReward} Permata</strong>
            </div>
          </div>

          <button type="button" className="quiz-result-btn" onClick={handleClaimAndExit}>
            Klaim Hadiah & Kembali ke Beranda 🚀
          </button>
        </div>
      </div>
    )
  }

  // Game Over Screen (if lives run out)
  if (isGameOver) {
    return (
      <div className="quiz-screen-overlay gameover-screen">
        <div className="quiz-result-card">
          <div className="result-sparkles">💔 🔄 💔</div>
          <span className="result-kicker">JANGAN MENYERAH!</span>
          <h2>Nyawa Kamu Habis</h2>
          <p className="result-subtext">Bangun datar memang penuh teka-teki. Ayo pelajari kembali materinya!</p>

          <div className="gameover-actions">
            <button
              type="button"
              className="quiz-result-btn retry-btn"
              onClick={() => {
                sounds.playClick()
                setLives(3)
                setQIndex(0)
                setSelectedAnswer(null)
                setIsGameOver(false)
                setScore(0)
              }}
            >
              🔄 Coba Lagi
            </button>
            <button
              type="button"
              className="quiz-secondary-btn"
              onClick={() => {
                sounds.playClick()
                onExitGame()
              }}
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-screen-overlay">
      <div className="quiz-container-box">
        {/* Top Quiz Header */}
        <div className="quiz-top-bar">
          <button
            type="button"
            className="quiz-exit-btn"
            onClick={() => { sounds.playClick(); onExitGame(); }}
            aria-label="Keluar dari Kuis"
          >
            ✕
          </button>

          <div className="quiz-progress-wrapper">
            <div className="quiz-progress-labels">
              <span>{currentQ.levelTitle}</span>
              <span>Soal {qIndex + 1} / {currentQuestions.length}</span>
            </div>
            <div className="quiz-bar-track">
              <div
                className="quiz-bar-fill"
                style={{ width: `${((qIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Lives Indicator */}
          <div className="quiz-lives-indicator">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span key={idx} className={idx < lives ? 'heart-full' : 'heart-empty'}>
                {idx < lives ? '❤️' : '🤍'}
              </span>
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div className="quiz-card-body">
          {/* Shape Visual / Icon */}
          <div className="quiz-shape-avatar" style={{ backgroundColor: `${currentQ.shapeVisual.color}22` }}>
            <span className="shape-giant-icon">{currentQ.shapeVisual.icon}</span>
          </div>

          {streak >= 2 && (
            <div className="streak-badge">
              🔥 {streak}x Kombo Beruntun!
            </div>
          )}

          <h3 className="quiz-prompt-text">{currentQ.prompt}</h3>

          {/* Options Grid */}
          <div className="quiz-options-list">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt
              const isCorrectAnswer = opt === currentQ.correctAnswer
              let optClass = 'quiz-opt-btn'

              if (selectedAnswer) {
                if (isSelected) {
                  optClass += isCorrectAnswer ? ' correct' : ' wrong'
                } else if (isCorrectAnswer) {
                  optClass += ' correct-reveal'
                } else {
                  optClass += ' disabled'
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  className={optClass}
                  disabled={Boolean(selectedAnswer)}
                  onClick={() => handleChoose(opt)}
                >
                  <span className="opt-label">{opt}</span>
                  {selectedAnswer && isCorrectAnswer && <span className="opt-check">✓</span>}
                  {selectedAnswer && isSelected && !isCorrectAnswer && <span className="opt-cross">✕</span>}
                </button>
              )
            })}
          </div>

          {/* Answer Feedback & Explanation */}
          {selectedAnswer && (
            <div className={`quiz-feedback-box ${selectedAnswer === currentQ.correctAnswer ? 'success' : 'alert'}`}>
              <div className="feedback-header">
                <strong>
                  {selectedAnswer === currentQ.correctAnswer ? '🎉 Jawaban Tepat Sekali!' : '💡 Belum Tepat!'}
                </strong>
              </div>
              <p className="feedback-explanation">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer Next Button */}
        {selectedAnswer && (
          <div className="quiz-footer-bar">
            <button type="button" className="quiz-next-action-btn" onClick={handleNext}>
              {qIndex < currentQuestions.length - 1 ? 'Lanjutkan Soal Berikutnya →' : 'Lihat Hasil Petualangan 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
