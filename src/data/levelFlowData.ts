export type QuestionType = 'single-choice' | 'multi-select' | 'numeric' | 'object-identify'

export interface QuestionCardOption {
  id: string
  label: string
  imageEmoji: string
  isCorrect: boolean
  color?: string
}

export interface LevelFlowQuestion {
  id: string
  type: QuestionType
  categoryName: string
  prompt: string
  illustrationEmoji?: string
  options: QuestionCardOption[]
  explanation: string
  hint: string
}

export interface LevelDetailData {
  levelNumber: number
  worldName: string
  worldNumber: number
  levelTitle: string
  objective: string
  estimatedTime: string
  challengesCount: number
  starsEarned: number
  targetShapes: { type: string; icon: string; name: string; color: string }[]
  totalTargetShapes: number
  questions: LevelFlowQuestion[]
  rewardBaseScore: number
  rewardCoins: number
  rewardXp: number
}

export const level1Data: LevelDetailData = {
  levelNumber: 1,
  worldName: 'Pulau Bentuk',
  worldNumber: 1,
  levelTitle: 'Gerbang Pulau Bentuk',
  objective: 'Mengenali persegi, segitiga, persegi panjang, dan lingkaran.',
  estimatedTime: '3-5 menit',
  challengesCount: 5,
  starsEarned: 3,
  targetShapes: [
    { type: 'segitiga', icon: '🔺', name: 'Segitiga', color: '#f59e0b' },
    { type: 'persegi', icon: '🟦', name: 'Persegi', color: '#3b82f6' },
    { type: 'lingkaran', icon: '🔴', name: 'Lingkaran', color: '#ef4444' }
  ],
  totalTargetShapes: 5,
  rewardBaseScore: 460,
  rewardCoins: 460,
  rewardXp: 100,
  questions: [
    // 1. Identifikasi bentuk (Visual image grid)
    {
      id: 'q1-identify',
      type: 'object-identify',
      categoryName: '1. Identifikasi bentuk',
      prompt: 'Manakah benda di bawah ini yang berbentuk lingkaran?',
      options: [
        { id: 'opt-ball', label: 'Bola Sepak', imageEmoji: '⚽', isCorrect: true, color: '#f8fafc' },
        { id: 'opt-tent', label: 'Tenda Berkemah', imageEmoji: '⛺', isCorrect: false, color: '#f8fafc' },
        { id: 'opt-clock', label: 'Jam Dinding', imageEmoji: '⏰', isCorrect: true, color: '#f8fafc' },
        { id: 'opt-book', label: 'Buku Tulis', imageEmoji: '📘', isCorrect: false, color: '#f8fafc' }
      ],
      explanation: 'Bola sepak dan jam dinding memiliki bentuk bulat lingkaran sempurna tanpa sudut!',
      hint: 'Cari benda yang tepinya bulat melengkung tanpa sudut siku.'
    },

    // 2. Klasifikasi bentuk (Multi-select with checkboxes)
    {
      id: 'q2-classify',
      type: 'multi-select',
      categoryName: '2. Klasifikasi bentuk',
      prompt: 'Pilih semua benda yang berbentuk persegi panjang!',
      options: [
        { id: 'opt-table', label: 'Meja Belajar', imageEmoji: '🪑', isCorrect: true },
        { id: 'opt-cheese', label: 'Potongan Keju', imageEmoji: '🧀', isCorrect: false },
        { id: 'opt-door', label: 'Pintu Rumah', imageEmoji: '🚪', isCorrect: true },
        { id: 'opt-notebook', label: 'Buku Catatan', imageEmoji: '📘', isCorrect: true }
      ],
      explanation: 'Meja, pintu, dan buku catatan memiliki dua pasang sisi sejajar sama panjang (panjang dan lebar berbeda).',
      hint: 'Persegi panjang memiliki sisi atas/bawah yang lebih panjang dibanding sisi kanan/kiri.'
    },

    // 3. Ciri-ciri bentuk (Numeric button choices with shape visual)
    {
      id: 'q3-traits',
      type: 'numeric',
      categoryName: '3. Ciri-ciri bentuk',
      prompt: 'Berapa banyak sisi yang dimiliki oleh segitiga?',
      illustrationEmoji: '🔺',
      options: [
        { id: 'num-3', label: '3', imageEmoji: '🔺', isCorrect: true },
        { id: 'num-4', label: '4', imageEmoji: '🟦', isCorrect: false },
        { id: 'num-5', label: '5', imageEmoji: '⭐', isCorrect: false },
        { id: 'num-6', label: '6', imageEmoji: '🛑', isCorrect: false }
      ],
      explanation: 'Segitiga dibatasi oleh tepat 3 sisi garis lurus dan mempunyai 3 buah titik sudut.',
      hint: 'Hitung garis yang membungkus gambar segitiga kuning!'
    },

    // 4. Penerapan dalam kehidupan (Window shape radio selection)
    {
      id: 'q4-real-life',
      type: 'single-choice',
      categoryName: '4. Penerapan dalam kehidupan',
      prompt: 'Bentuk bangun datar apa yang tepat untuk jendela kayu ini?',
      illustrationEmoji: '🪟',
      options: [
        { id: 'opt-circle', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-square', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-triangle', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Jendela rumah tersebut memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku, yaitu berbentuk Persegi.',
      hint: 'Semua sisi jendela tersebut sama panjang dan membentuk sudut siku-siku 90°.'
    },

    // 5. Soal Rumah Pulau Bentuk (Screen 4 exact representation)
    {
      id: 'q5-house',
      type: 'single-choice',
      categoryName: '5. Evaluasi Bangun Datar',
      prompt: 'Dinding pada rumah di bawah ini berbentuk apa?',
      illustrationEmoji: '🏠',
      options: [
        { id: 'opt-tri-h', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-sq-h', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-rect-h', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' },
        { id: 'opt-circ-h', label: 'Lingkaran', imageEmoji: '🔴', isCorrect: false, color: '#fef2f2' }
      ],
      explanation: 'Dinding utama rumah berbentuk Persegi dengan atap berbentuk Segitiga merah di atasnya!',
      hint: 'Perhatikan bagian dinding badan rumah berwarna krem di bawah atap.'
    }
  ]
}

// Rules and Scoring specification matching the bottom table
export const rulesAndScoring = {
  questionsPerLevel: 5,
  correctAnswerPoints: 100,
  wrongAnswerPoints: 0,
  explorationBonusPerItem: 10,
  noHintBonus: 50,
  xpReward: 100,
  coinReward: 460
}
