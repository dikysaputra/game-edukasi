export interface QuestionItem {
  id: string
  level: number
  levelTitle: string
  prompt: string
  shapeVisual: {
    type: 'segitiga' | 'persegi' | 'lingkaran' | 'persegi-panjang' | 'trapesium' | 'belah-ketupat'
    color: string
    icon: string
  }
  options: string[]
  correctAnswer: string
  explanation: string
  hint: string
}

export const gameLevels = [
  { level: 1, title: 'Lembah Segitiga', minStars: 0, unlocked: true, rewardStars: 30, rewardGems: 10 },
  { level: 2, title: 'Danau Lingkaran', minStars: 50, unlocked: true, rewardStars: 40, rewardGems: 15 },
  { level: 3, title: 'Hutan Persegi', minStars: 100, unlocked: true, rewardStars: 50, rewardGems: 20 },
  { level: 4, title: 'Puncak Trapesium', minStars: 160, unlocked: false, rewardStars: 60, rewardGems: 25 },
  { level: 5, title: 'Benteng Poligon', minStars: 240, unlocked: false, rewardStars: 80, rewardGems: 40 },
]

export const quizQuestions: QuestionItem[] = [
  // Level 1: Lembah Segitiga (Bentuk Dasar)
  {
    id: 'q1-1',
    level: 1,
    levelTitle: 'Lembah Segitiga',
    prompt: 'Aku memiliki 3 sisi garis lurus dan 3 buah sudut. Siapakah aku?',
    shapeVisual: { type: 'segitiga', color: '#facc15', icon: '🔺' },
    options: ['Lingkaran', 'Segitiga', 'Persegi', 'Trapesium'],
    correctAnswer: 'Segitiga',
    explanation: 'Segitiga selalu dibatasi oleh 3 sisi dan memiliki 3 buah titik sudut.',
    hint: 'Hitung jumlah sisi pada atap rumah atau potongan pizza!'
  },
  {
    id: 'q1-2',
    level: 1,
    levelTitle: 'Lembah Segitiga',
    prompt: 'Bentuk bangun datar apakah yang tidak memiliki sudut sama sekali?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '⭕' },
    options: ['Persegi', 'Segitiga', 'Lingkaran', 'Jajar Genjang'],
    correctAnswer: 'Lingkaran',
    explanation: 'Lingkaran dibentuk oleh satu garis lengkung tertutup tanpa titik sudut (0 sudut).',
    hint: 'Bentuk seperti koin uang atau roda sepeda.'
  },
  {
    id: 'q1-3',
    level: 1,
    levelTitle: 'Lembah Segitiga',
    prompt: 'Berapakah jumlah sisi pada sebuah Persegi?',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🟦' },
    options: ['3 sisi', '4 sisi sama panjang', '5 sisi', 'Tidak punya sisi'],
    correctAnswer: '4 sisi sama panjang',
    explanation: 'Persegi memiliki tepat 4 sisi yang semua panjangnya sama persis.',
    hint: 'Bentuk ubin lantai atau papan catur memiliki sisi yang sama.'
  },

  // Level 2: Danau Lingkaran (Sifat & Perbedaan)
  {
    id: 'q2-1',
    level: 2,
    levelTitle: 'Danau Lingkaran',
    prompt: 'Benda di bawah ini yang umumnya berbentuk Persegi Panjang adalah ...',
    shapeVisual: { type: 'persegi-panjang', color: '#10b981', icon: '📱' },
    options: ['Pintu Rumah', 'Koin Uang', 'Potongan Pizza', 'Caping Petani'],
    correctAnswer: 'Pintu Rumah',
    explanation: 'Pintu rumah memiliki dua pasang sisi sejajar berukuran panjang dan lebar berbeda (persegi panjang).',
    hint: 'Tingginya lebih panjang dibanding lebarnya.'
  },
  {
    id: 'q2-2',
    level: 2,
    levelTitle: 'Danau Lingkaran',
    prompt: 'Besar masing-masing sudut siku-siku pada persegi dan persegi panjang adalah ...',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '📐' },
    options: ['45°', '60°', '90°', '180°'],
    correctAnswer: '90°',
    explanation: 'Sudut siku-siku selalu memiliki besar tepat 90 derajat tegak lurus.',
    hint: 'Sudut yang membentuk huruf L tegak sempurna.'
  },
  {
    id: 'q2-3',
    level: 2,
    levelTitle: 'Danau Lingkaran',
    prompt: 'Garis lurus yang menghubungkan titik pusat lingkaran dengan sisi lingkaran disebut ...',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '🎯' },
    options: ['Diameter', 'Jari-jari (r)', 'Sisi Miring', 'Tinggi'],
    correctAnswer: 'Jari-jari (r)',
    explanation: 'Jari-jari adalah jarak dari titik pusat ke tepi lingkaran (panjangnya setengah diameter).',
    hint: 'Simbolnya adalah huruf r (radius).'
  },

  // Level 3: Hutan Persegi (Tebak Bangun Lanjut)
  {
    id: 'q3-1',
    level: 3,
    levelTitle: 'Hutan Persegi',
    prompt: 'Bangun datar segi empat yang memiliki sepasang sisi sejajar tetapi tidak sama panjang adalah ...',
    shapeVisual: { type: 'trapesium', color: '#8b5cf6', icon: '⛵' },
    options: ['Trapesium', 'Persegi', 'Segitiga', 'Lingkaran'],
    correctAnswer: 'Trapesium',
    explanation: 'Trapesium ciri utamanya adalah memiliki sepasang sisi berhadapan yang sejajar.',
    hint: 'Bentuknya menyerupai perahu atau atap rumah tradisional.'
  },
  {
    id: 'q3-2',
    level: 3,
    levelTitle: 'Hutan Persegi',
    prompt: 'Makanan tradisional ketupat saat lebaran menyerupai bentuk bangun datar ...',
    shapeVisual: { type: 'belah-ketupat', color: '#ec4899', icon: '🎋' },
    options: ['Belah Ketupat', 'Persegi Panjang', 'Lingkaran', 'Segitiga Siku-siku'],
    correctAnswer: 'Belah Ketupat',
    explanation: 'Bentuk anyaman ketupat memiliki 4 sisi sama panjang dengan diagonal tegak lurus.',
    hint: 'Namanya sama persis dengan makanan tersebut!'
  },
  {
    id: 'q3-3',
    level: 3,
    levelTitle: 'Hutan Persegi',
    prompt: 'Berapakah jumlah seluruh besar sudut dalam sebuah segitiga?',
    shapeVisual: { type: 'segitiga', color: '#facc15', icon: '🔺' },
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '180°',
    explanation: 'Jika ketiga sudut dalam segitiga dijumlahkan, hasilnya selalu tepat 180°.',
    hint: 'Sama dengan sudut garis lurus.'
  }
]
