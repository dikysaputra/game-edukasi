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
  subCategory?: string
  learningOutcome?: string
  adventureMission?: string
  objective: string
  estimatedTime: string
  challengesCount: number
  starsEarned: number
  initialLives: number // Default: 3 hearts
  targetShapes: { type: string; icon: string; name: string; color: string }[]
  totalTargetShapes: number
  questions: LevelFlowQuestion[]
  rewardBaseScore: number
  rewardCoins: number
  rewardXp: number
}

// Map each island (5 islands x 3 levels = 15 levels total)
export const islandThemeNames: Record<number, { name: string; subtitle: string; islandNumber: number }> = {
  1: { name: 'Pulau Bentuk', subtitle: 'Gerbang Pulau Bentuk', islandNumber: 1 },
  2: { name: 'Pulau Bentuk', subtitle: 'Lembah Bentuk', islandNumber: 1 },
  3: { name: 'Pulau Bentuk', subtitle: 'Hutan Bentuk', islandNumber: 1 },

  4: { name: 'Hutan Segi Empat', subtitle: 'Sisi, sudut dan jenis-jenisnya', islandNumber: 2 },
  5: { name: 'Hutan Segi Empat', subtitle: 'Sisi, sudut dan jenis-jenisnya', islandNumber: 2 },
  6: { name: 'Hutan Segi Empat', subtitle: 'Sisi, sudut dan jenis-jenisnya', islandNumber: 2 },

  7: { name: 'Pegunungan Segitiga', subtitle: 'Jenis segitiga dan keliling', islandNumber: 3 },
  8: { name: 'Pegunungan Segitiga', subtitle: 'Jenis segitiga dan keliling', islandNumber: 3 },
  9: { name: 'Pegunungan Segitiga', subtitle: 'Jenis segitiga dan keliling', islandNumber: 3 },

  10: { name: 'Danau Lingkaran', subtitle: 'Jari-jari, diameter dan luas', islandNumber: 4 },
  11: { name: 'Danau Lingkaran', subtitle: 'Jari-jari, diameter dan luas', islandNumber: 4 },
  12: { name: 'Danau Lingkaran', subtitle: 'Jari-jari, diameter dan luas', islandNumber: 4 },

  13: { name: 'Kastil Geometri', subtitle: 'Gabungan bentuk dan luas', islandNumber: 5 },
  14: { name: 'Kastil Geometri', subtitle: 'Gabungan bentuk dan luas', islandNumber: 5 },
  15: { name: 'Kastil Geometri', subtitle: 'Gabungan bentuk dan luas', islandNumber: 5 },
}

export function getLevelData(levelNumber: number): LevelDetailData {
  const meta = islandThemeNames[levelNumber] || {
    name: 'Pulau Bentuk',
    subtitle: 'Mengenal bentuk dasar',
    islandNumber: 1
  }

  // Level 1: Gerbang Pulau Bentuk (Slide 3 PPT)
  const level1Questions: LevelFlowQuestion[] = [
    {
      id: 'q1-1',
      type: 'single-choice',
      categoryName: '1. Mengenali Bentuk',
      prompt: 'Manakah gambar yang berbentuk segitiga?',
      illustrationEmoji: '🔺',
      options: [
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: true, color: '#fefce8' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Segitiga dibatasi oleh 3 sisi lurus dan 3 sudut lancip!',
      hint: 'Cari bentuk yang memiliki tiga sudut runcing seperti atap rumah.'
    },
    {
      id: 'q1-2',
      type: 'single-choice',
      categoryName: '2. Bentuk Bulat',
      prompt: 'Bangun datar manakah yang berbentuk bulat?',
      illustrationEmoji: '⭕',
      options: [
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: true, color: '#fef2f2' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-trap', label: 'Trapesium', imageEmoji: '⛵', isCorrect: false, color: '#faf5ff' }
      ],
      explanation: 'Lingkaran memiliki garis tepi melengkung tertutup yang bulat sempurna tanpa sudut!',
      hint: 'Bentuk bulat seperti koin uang atau roda sepeda.'
    },
    {
      id: 'q1-3',
      type: 'single-choice',
      categoryName: '3. Memilih Persegi',
      prompt: 'Pilih gambar yang merupakan persegi.',
      illustrationEmoji: '🟦',
      options: [
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-door', label: 'Persegi Panjang', imageEmoji: '🚪', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Persegi memiliki empat sisi yang sama panjang dan empat sudut siku-siku.',
      hint: 'Semua sisinya memiliki ukuran yang sama persis seperti ubin keramik.'
    },
    {
      id: 'q1-4',
      type: 'single-choice',
      categoryName: '4. Tiga Sisi',
      prompt: 'Bentuk apa yang memiliki tiga sisi?',
      illustrationEmoji: '🔺',
      options: [
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: true, color: '#fefce8' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Segitiga berasal dari kata "tiga", yang artinya dibatasi oleh tepat 3 sisi garis lurus.',
      hint: 'Hitung garis pembatas bangun datar tersebut: 1, 2, 3!'
    },
    {
      id: 'q1-5',
      type: 'single-choice',
      categoryName: '5. Empat Sisi Sama Panjang',
      prompt: 'Bangun datar apa yang memiliki empat sisi sama panjang?',
      illustrationEmoji: '🟦',
      options: [
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-trap', label: 'Trapesium', imageEmoji: '⛵', isCorrect: false, color: '#faf5ff' }
      ],
      explanation: 'Persegi adalah bangun datar segi empat khusus dengan keempat sisinya berukuran sama panjang.',
      hint: 'Bentuk kotak sempurna dengan panjang dan lebar sama.'
    }
  ]

  // Level 2: Lembah Bentuk (Slide 4 PPT)
  const level2Questions: LevelFlowQuestion[] = [
    {
      id: 'q2-1',
      type: 'numeric',
      categoryName: '1. Sisi Segitiga',
      prompt: 'Berapa jumlah sisi pada segitiga?',
      illustrationEmoji: '🔺',
      options: [
        { id: 'num-3', label: '3 sisi', imageEmoji: '🔺', isCorrect: true },
        { id: 'num-4', label: '4 sisi', imageEmoji: '🟦', isCorrect: false },
        { id: 'num-5', label: '5 sisi', imageEmoji: '⬟', isCorrect: false },
        { id: 'num-0', label: '0 sisi', imageEmoji: '⭕', isCorrect: false }
      ],
      explanation: 'Segitiga selalu dibatasi oleh tepat 3 sisi garis lurus.',
      hint: 'Kata "Segitiga" menunjukkan bahwa bangun ini memiliki tiga sisi lurus.'
    },
    {
      id: 'q2-2',
      type: 'numeric',
      categoryName: '2. Titik Sudut Persegi',
      prompt: 'Berapa jumlah titik sudut pada persegi?',
      illustrationEmoji: '🟦',
      options: [
        { id: 'num-4', label: '4 titik sudut', imageEmoji: '🟦', isCorrect: true },
        { id: 'num-3', label: '3 titik sudut', imageEmoji: '🔺', isCorrect: false },
        { id: 'num-5', label: '5 titik sudut', imageEmoji: '⭐', isCorrect: false },
        { id: 'num-0', label: '0 titik sudut', imageEmoji: '⭕', isCorrect: false }
      ],
      explanation: 'Persegi memiliki 4 buah titik sudut (pojokan) yang berbentuk siku-siku 90°.',
      hint: 'Hitung setiap pojokan tajam pada bangun persegi kotak.'
    },
    {
      id: 'q2-3',
      type: 'numeric',
      categoryName: '3. Titik Sudut Lingkaran',
      prompt: 'Berapa jumlah titik sudut pada lingkaran?',
      illustrationEmoji: '⭕',
      options: [
        { id: 'num-0', label: '0 titik sudut', imageEmoji: '⭕', isCorrect: true },
        { id: 'num-1', label: '1 titik sudut', imageEmoji: '📍', isCorrect: false },
        { id: 'num-3', label: '3 titik sudut', imageEmoji: '🔺', isCorrect: false },
        { id: 'num-4', label: '4 titik sudut', imageEmoji: '🟦', isCorrect: false }
      ],
      explanation: 'Lingkaran adalah garis lengkung mulus tanpa pojokan, sehingga memiliki 0 titik sudut.',
      hint: 'Lingkaran bulat mulus dan tidak mempunyai pojokan runcing sama sekali.'
    },
    {
      id: 'q2-4',
      type: 'single-choice',
      categoryName: '4. Memiliki Empat Sisi',
      prompt: 'Bangun datar apa yang memiliki empat sisi?',
      illustrationEmoji: '🟦',
      options: [
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-star', label: 'Bintang', imageEmoji: '⭐', isCorrect: false, color: '#fefce8' }
      ],
      explanation: 'Persegi merupakan segi empat yang memiliki 4 sisi garis lurus.',
      hint: 'Bangun datar segi empat seperti ubin atau buku tulis.'
    },
    {
      id: 'q2-5',
      type: 'single-choice',
      categoryName: '5. Tanpa Titik Sudut',
      prompt: 'Bangun datar apa yang tidak memiliki titik sudut?',
      illustrationEmoji: '⭕',
      options: [
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: true, color: '#fef2f2' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Lingkaran tidak memiliki sudut maupun titik sudut (0 titik sudut).',
      hint: 'Bentuk bundar yang melengkung tanpa sudut seperti roda atau donat.'
    }
  ]

  // Level 3: Hutan Bentuk (Slide 5 PPT)
  const level3Questions: LevelFlowQuestion[] = [
    {
      id: 'q3-1',
      type: 'single-choice',
      categoryName: '1. Bentuk Jam Dinding',
      prompt: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
      illustrationEmoji: '⏰',
      options: [
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: true, color: '#fef2f2' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-trap', label: 'Trapesium', imageEmoji: '⛵', isCorrect: false, color: '#faf5ff' }
      ],
      explanation: 'Jam dinding bulat memiliki garis keliling melingkar mulus yang menyerupai lingkaran.',
      hint: 'Benda bulat bundar tanpa sudut yang ada di dinding rumah.'
    },
    {
      id: 'q3-2',
      type: 'single-choice',
      categoryName: '2. Bentuk Atap Rumah',
      prompt: 'Atap rumah pada gambar menyerupai bentuk apa?',
      illustrationEmoji: '🏠',
      options: [
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: true, color: '#fefce8' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false, color: '#f0fdf4' }
      ],
      explanation: 'Atap rumah memiliki dua sisi miring dan satu alas lurus yang membentuk segitiga.',
      hint: 'Bentuk runcing segitiga di bagian paling atas rumah.'
    },
    {
      id: 'q3-3',
      type: 'single-choice',
      categoryName: '3. Bentuk Ubin Lantai',
      prompt: 'Ubin dengan empat sisi sama panjang menyerupai apa?',
      illustrationEmoji: '🔲',
      options: [
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: true, color: '#eff6ff' },
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false, color: '#fef2f2' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-jajar', label: 'Jajar Genjang', imageEmoji: '💠', isCorrect: false, color: '#faf5ff' }
      ],
      explanation: 'Ubin lantai memiliki 4 sisi sama panjang dan 4 sudut siku-siku, persis seperti bentuk persegi.',
      hint: 'Ubin keramik kotak yang sering kita injak di lantai rumah.'
    },
    {
      id: 'q3-4',
      type: 'numeric',
      categoryName: '4. Jumlah Sisi Pintu',
      prompt: 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
      illustrationEmoji: '🚪',
      options: [
        { id: 'num-4', label: '4 sisi', imageEmoji: '🚪', isCorrect: true },
        { id: 'num-3', label: '3 sisi', imageEmoji: '🔺', isCorrect: false },
        { id: 'num-5', label: '5 sisi', imageEmoji: '⬟', isCorrect: false },
        { id: 'num-2', label: '2 sisi', imageEmoji: '📏', isCorrect: false }
      ],
      explanation: 'Pintu berbentuk persegi panjang memiliki 2 sisi tegak dan 2 sisi mendatar, total 4 sisi.',
      hint: 'Hitung semua tepi pintu: atas, bawah, kanan, dan kiri.'
    },
    {
      id: 'q3-5',
      type: 'single-choice',
      categoryName: '5. Bentuk Roda Sepeda',
      prompt: 'Roda sepeda jika dilihat dari samping berbentuk apa?',
      illustrationEmoji: '🚲',
      options: [
        { id: 'opt-circ', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: true, color: '#fef2f2' },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false, color: '#fefce8' },
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: false, color: '#eff6ff' },
        { id: 'opt-belah', label: 'Belah Ketupat', imageEmoji: '🎋', isCorrect: false, color: '#faf5ff' }
      ],
      explanation: 'Roda sepeda berbentuk bulat melingkar sempurna tanpa sudut agar dapat berputar menggelinding.',
      hint: 'Bentuk bulat bundar yang berputar saat sepeda dikayuh.'
    }
  ]

  // Questions for Island 2: Hutan Segi Empat (Levels 4, 5, 6)
  const island2Questions: LevelFlowQuestion[] = [
    {
      id: `q${levelNumber}-1`,
      type: 'single-choice',
      categoryName: '1. Sifat Sudut',
      prompt: 'Berapakah besar sudut siku-siku pada persegi dan persegi panjang?',
      illustrationEmoji: '📐',
      options: [
        { id: 'opt-45', label: '45°', imageEmoji: '📐', isCorrect: false },
        { id: 'opt-60', label: '60°', imageEmoji: '📐', isCorrect: false },
        { id: 'opt-90', label: '90° (Tegak Lurus)', imageEmoji: '📐', isCorrect: true },
        { id: 'opt-180', label: '180°', imageEmoji: '📐', isCorrect: false }
      ],
      explanation: 'Sudut siku-siku selalu berukuran tepat 90 derajat tegak lurus sempurna.',
      hint: 'Membentuk sudut seperti huruf L tegak!'
    },
    {
      id: `q${levelNumber}-2`,
      type: 'single-choice',
      categoryName: '2. Trapesium',
      prompt: 'Bangun segi empat yang memiliki tepat sepasang sisi berhadapan sejajar adalah ...',
      illustrationEmoji: '⛵',
      options: [
        { id: 'opt-trap', label: 'Trapesium', imageEmoji: '⛵', isCorrect: true },
        { id: 'opt-ling', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false },
        { id: 'opt-segi3', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false },
        { id: 'opt-jajar', label: 'Jajar Genjang', imageEmoji: '💠', isCorrect: false }
      ],
      explanation: 'Ciri utama trapesium adalah memiliki sepasang sisi berhadapan yang sejajar.',
      hint: 'Bentuknya menyerupai badan perahu atau atap rumah joglo.'
    },
    {
      id: `q${levelNumber}-3`,
      type: 'numeric',
      categoryName: '3. Jumlah Sudut Segi Empat',
      prompt: 'Berapakah jumlah semua titik sudut pada bangun segi empat?',
      illustrationEmoji: '🟦',
      options: [
        { id: 'n-3', label: '3', imageEmoji: '🔺', isCorrect: false },
        { id: 'n-4', label: '4', imageEmoji: '🟦', isCorrect: true },
        { id: 'n-5', label: '5', imageEmoji: '⭐', isCorrect: false },
        { id: 'n-6', label: '6', imageEmoji: '🛑', isCorrect: false }
      ],
      explanation: 'Semua bangun segi empat (persegi, persegi panjang, trapesium, dll.) selalu memiliki 4 titik sudut.',
      hint: 'Hitung keempat pojok bangun datar segi empat!'
    },
    {
      id: `q${levelNumber}-4`,
      type: 'multi-select',
      categoryName: '4. Pasangan Sisi Sejajar',
      prompt: 'Pilih semua bangun datar yang memiliki 2 pasang sisi sejajar!',
      options: [
        { id: 'opt-sq', label: 'Persegi', imageEmoji: '🟦', isCorrect: true },
        { id: 'opt-rect', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: true },
        { id: 'opt-jajar', label: 'Jajar Genjang', imageEmoji: '💠', isCorrect: true },
        { id: 'opt-tri', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false }
      ],
      explanation: 'Persegi, persegi panjang, dan jajar genjang semuanya memiliki 2 pasang sisi sejajar.',
      hint: 'Segitiga hanya punya 3 sisi, bukan segi empat berpasangan sisi sejajar.'
    },
    {
      id: `q${levelNumber}-5`,
      type: 'single-choice',
      categoryName: '5. Belah Ketupat',
      prompt: 'Bangun datar yang keempat sisinya sama panjang dengan diagonal saling tegak lurus adalah ...',
      illustrationEmoji: '🎋',
      options: [
        { id: 'opt-ketupat', label: 'Belah Ketupat', imageEmoji: '🎋', isCorrect: true },
        { id: 'opt-persegi-pjg', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false },
        { id: 'opt-lingkaran', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false },
        { id: 'opt-segitiga', label: 'Segitiga', imageEmoji: '🔺', isCorrect: false }
      ],
      explanation: 'Belah ketupat memiliki 4 sisi sama panjang dan kedua diagonalnya saling memotong tegak lurus 90°.',
      hint: 'Terinspirasi dari ketupat hari raya!'
    }
  ]

  // Questions for Island 3: Pegunungan Segitiga (Levels 7, 8, 9)
  const island3Questions: LevelFlowQuestion[] = [
    {
      id: `q${levelNumber}-1`,
      type: 'single-choice',
      categoryName: '1. Segitiga Sama Sisi',
      prompt: 'Segitiga yang ketiga sisinya sama panjang dan semua sudutnya 60° disebut ...',
      illustrationEmoji: '🔺',
      options: [
        { id: 'opt-ss', label: 'Segitiga Sama Sisi', imageEmoji: '🔺', isCorrect: true },
        { id: 'opt-sk', label: 'Segitiga Sama Kaki', imageEmoji: '⛺', isCorrect: false },
        { id: 'opt-ssiku', label: 'Segitiga Siku-siku', imageEmoji: '📐', isCorrect: false },
        { id: 'opt-sembrg', label: 'Segitiga Sembarang', imageEmoji: '🏔️', isCorrect: false }
      ],
      explanation: 'Segitiga sama sisi memiliki 3 sisi sama panjang dan ketiga sudutnya sama besar yaitu 60°.',
      hint: 'Semua sisinya sama persis satu sama lain!'
    },
    {
      id: `q${levelNumber}-2`,
      type: 'numeric',
      categoryName: '2. Jumlah Sudut Segitiga',
      prompt: 'Berapakah jumlah seluruh besar sudut dalam sebuah segitiga?',
      illustrationEmoji: '📐',
      options: [
        { id: 'deg-90', label: '90°', imageEmoji: '📐', isCorrect: false },
        { id: 'deg-180', label: '180°', imageEmoji: '🔺', isCorrect: true },
        { id: 'deg-270', label: '270°', imageEmoji: '📐', isCorrect: false },
        { id: 'deg-360', label: '360°', imageEmoji: '⭕', isCorrect: false }
      ],
      explanation: 'Jika ketiga sudut dalam segitiga manapun dijumlahkan, hasilnya selalu tepat 180°.',
      hint: 'Sama dengan sudut pada satu garis lurus!'
    },
    {
      id: `q${levelNumber}-3`,
      type: 'single-choice',
      categoryName: '3. Keliling Segitiga',
      prompt: 'Sebuah segitiga sama sisi memiliki panjang sisi 5 cm. Berapakah kelilingnya?',
      illustrationEmoji: '📏',
      options: [
        { id: 'k-10', label: '10 cm', imageEmoji: '📏', isCorrect: false },
        { id: 'k-15', label: '15 cm (5 + 5 + 5)', imageEmoji: '📏', isCorrect: true },
        { id: 'k-20', label: '20 cm', imageEmoji: '📏', isCorrect: false },
        { id: 'k-25', label: '25 cm', imageEmoji: '📏', isCorrect: false }
      ],
      explanation: 'Keliling segitiga adalah penjumlahan ketiga sisinya: K = 5 + 5 + 5 = 15 cm.',
      hint: 'Jumlahkan ketiga sisi segitiga sama sisi (3 × 5).'
    },
    {
      id: `q${levelNumber}-4`,
      type: 'single-choice',
      categoryName: '4. Segitiga Siku-siku',
      prompt: 'Segitiga yang memiliki satu sudut sebesar tepat 90 derajat disebut ...',
      illustrationEmoji: '📐',
      options: [
        { id: 'opt-siku', label: 'Segitiga Siku-siku', imageEmoji: '📐', isCorrect: true },
        { id: 'opt-lancip', label: 'Segitiga Lancip', imageEmoji: '🔺', isCorrect: false },
        { id: 'opt-tumpul', label: 'Segitiga Tumpul', imageEmoji: '⛺', isCorrect: false },
        { id: 'opt-lingk', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false }
      ],
      explanation: 'Segitiga siku-siku memiliki salah satu sudut tegak lurus bernilai 90°.',
      hint: 'Membentuk sudut seperti penggaris siku-siku!'
    },
    {
      id: `q${levelNumber}-5`,
      type: 'multi-select',
      categoryName: '5. Jenis-jenis Segitiga',
      prompt: 'Pilih semua nama jenis segitiga berdasarkan panjang sisinya!',
      options: [
        { id: 'opt-sama-sisi', label: 'Segitiga Sama Sisi', imageEmoji: '🔺', isCorrect: true },
        { id: 'opt-sama-kaki', label: 'Segitiga Sama Kaki', imageEmoji: '⛺', isCorrect: true },
        { id: 'opt-sembarang', label: 'Segitiga Sembarang', imageEmoji: '📐', isCorrect: true },
        { id: 'opt-trapesium', label: 'Trapesium', imageEmoji: '⛵', isCorrect: false }
      ],
      explanation: 'Berdasarkan panjang sisi, ada 3 jenis segitiga: sama sisi, sama kaki, dan sembarang.',
      hint: 'Trapesium adalah segi empat, bukan segitiga.'
    }
  ]

  // Questions for Island 4: Danau Lingkaran (Levels 10, 11, 12)
  const island4Questions: LevelFlowQuestion[] = [
    {
      id: `q${levelNumber}-1`,
      type: 'single-choice',
      categoryName: '1. Jari-jari & Diameter',
      prompt: 'Garis lurus yang menghubungkan titik tengah lingkaran ke tepi lingkaran disebut ...',
      illustrationEmoji: '🎯',
      options: [
        { id: 'opt-r', label: 'Jari-jari (r)', imageEmoji: '🎯', isCorrect: true },
        { id: 'opt-d', label: 'Diameter (d)', imageEmoji: '📏', isCorrect: false },
        { id: 'opt-t', label: 'Tinggi', imageEmoji: '📐', isCorrect: false },
        { id: 'opt-s', label: 'Sisi Miring', imageEmoji: '🔺', isCorrect: false }
      ],
      explanation: 'Jari-jari (r) adalah jarak dari titik pusat lingkaran ke garis lengkung tepi lingkaran.',
      hint: 'Panjangnya adalah setengah dari diameter!'
    },
    {
      id: `q${levelNumber}-2`,
      type: 'single-choice',
      categoryName: '2. Hubungan Diameter',
      prompt: 'Jika sebuah lingkaran memiliki jari-jari r = 7 cm, berapakah panjang diameternya?',
      illustrationEmoji: '⭕',
      options: [
        { id: 'd-7', label: '7 cm', imageEmoji: '⭕', isCorrect: false },
        { id: 'd-14', label: '14 cm (2 × 7)', imageEmoji: '⭕', isCorrect: true },
        { id: 'd-21', label: '21 cm', imageEmoji: '⭕', isCorrect: false },
        { id: 'd-28', label: '28 cm', imageEmoji: '⭕', isCorrect: false }
      ],
      explanation: 'Diameter adalah dua kali jari-jari: d = 2 × r = 2 × 7 = 14 cm.',
      hint: 'Diameter membentang penuh melewati titik pusat (2 × r).'
    },
    {
      id: `q${levelNumber}-3`,
      type: 'numeric',
      categoryName: '3. Titik Sudut Lingkaran',
      prompt: 'Berapakah jumlah titik sudut yang dimiliki oleh lingkaran?',
      illustrationEmoji: '🔴',
      options: [
        { id: 's-0', label: '0 (Tidak Punya)', imageEmoji: '🔴', isCorrect: true },
        { id: 's-1', label: '1', imageEmoji: '⭕', isCorrect: false },
        { id: 's-2', label: '2', imageEmoji: '⭕', isCorrect: false },
        { id: 's-3', label: '3', imageEmoji: '🔺', isCorrect: false }
      ],
      explanation: 'Lingkaran dibentuk oleh satu garis lengkung melingkar tertutup tanpa sudut (0 sudut).',
      hint: 'Lingkaran mulus melingkar seperti donat atau roda.'
    },
    {
      id: `q${levelNumber}-4`,
      type: 'single-choice',
      categoryName: '4. Nilai Pi (π)',
      prompt: 'Nilai konstanta π (pi) yang sering digunakan untuk lingkaran adalah ...',
      illustrationEmoji: '🥧',
      options: [
        { id: 'pi-22-7', label: '22/7 atau 3,14', imageEmoji: '🥧', isCorrect: true },
        { id: 'pi-20', label: '20/7', imageEmoji: '🥧', isCorrect: false },
        { id: 'pi-25', label: '25/7', imageEmoji: '🥧', isCorrect: false },
        { id: 'pi-1', label: '1,5', imageEmoji: '🥧', isCorrect: false }
      ],
      explanation: 'Konstanta pi (π) bernilai kira-kira 22/7 atau 3,14159...',
      hint: 'Angka 22 dibagi 7 yang terkenal dalam matematika!'
    },
    {
      id: `q${levelNumber}-5`,
      type: 'object-identify',
      categoryName: '5. Benda Berbentuk Lingkaran',
      prompt: 'Manakah benda di bawah ini yang paling tepat memanfaatkan bentuk lingkaran?',
      options: [
        { id: 'opt-wheel', label: 'Roda Sepeda', imageEmoji: '🚲', isCorrect: true, color: '#f8fafc' },
        { id: 'opt-box', label: 'Kardus Paket', imageEmoji: '📦', isCorrect: false, color: '#f8fafc' },
        { id: 'opt-door', label: 'Pintu Rumah', imageEmoji: '🚪', isCorrect: false, color: '#f8fafc' },
        { id: 'opt-blackboard', label: 'Papan Tulis', imageEmoji: '🏫', isCorrect: false, color: '#f8fafc' }
      ],
      explanation: 'Roda kendaraan dibuat lingkaran agar dapat berputar menggelinding dengan mulus!',
      hint: 'Benda yang berputar tanpa guncangan naik turun.'
    }
  ]

  // Questions for Island 5: Kastil Geometri (Levels 13, 14, 15)
  const island5Questions: LevelFlowQuestion[] = [
    {
      id: `q${levelNumber}-1`,
      type: 'single-choice',
      categoryName: '1. Atap Menara Kastil',
      prompt: 'Atap menara kastil yang berbentuk kerucut jika dilihat dari samping menyerupai bangun ...',
      illustrationEmoji: '🏰',
      options: [
        { id: 'opt-tri-c', label: 'Segitiga', imageEmoji: '🔺', isCorrect: true },
        { id: 'opt-sq-c', label: 'Persegi', imageEmoji: '🟦', isCorrect: false },
        { id: 'opt-circ-c', label: 'Lingkaran', imageEmoji: '⭕', isCorrect: false },
        { id: 'opt-trap-c', label: 'Trapesium', imageEmoji: '⛵', isCorrect: false }
      ],
      explanation: 'Dilihat dari samping 2 dimensi, atap menara runcing berbentuk segitiga dengan ujung lancip.',
      hint: 'Bentuk dengan 3 sisi garis lurus!'
    },
    {
      id: `q${levelNumber}-2`,
      type: 'single-choice',
      categoryName: '2. Luas Persegi',
      prompt: 'Lantai ruang istana berbentuk persegi dengan sisi 6 meter. Berapakah luasnya?',
      illustrationEmoji: '🔲',
      options: [
        { id: 'a-24', label: '24 m²', imageEmoji: '🔲', isCorrect: false },
        { id: 'a-36', label: '36 m² (6 × 6)', imageEmoji: '🔲', isCorrect: true },
        { id: 'a-12', label: '12 m²', imageEmoji: '🔲', isCorrect: false },
        { id: 'a-30', label: '30 m²', imageEmoji: '🔲', isCorrect: false }
      ],
      explanation: 'Luas Persegi = sisi × sisi = 6 × 6 = 36 m².',
      hint: 'Kalikan panjang sisi dengan dirinya sendiri (s²).'
    },
    {
      id: `q${levelNumber}-3`,
      type: 'single-choice',
      categoryName: '3. Gabungan Bangun Datar',
      prompt: 'Sebuah rumah kastil tersusun dari dinding persegi dan atap segitiga. Ini disebut bangun ...',
      illustrationEmoji: '🏠',
      options: [
        { id: 'opt-gabungan', label: 'Bangun Datar Gabungan', imageEmoji: '🏠', isCorrect: true },
        { id: 'opt-lingk', label: 'Lingkaran Sempurna', imageEmoji: '⭕', isCorrect: false },
        { id: 'opt-garis', label: 'Garis Lurus', imageEmoji: '📏', isCorrect: false },
        { id: 'opt-kubus', label: 'Bangun Titik Tunggal', imageEmoji: '🎯', isCorrect: false }
      ],
      explanation: 'Bentuk yang terbentuk dari dua atau lebih bangun datar disebut bangun datar gabungan.',
      hint: 'Dua bangun datar yang digabungkan menjadi satu kesatuan!'
    },
    {
      id: `q${levelNumber}-4`,
      type: 'multi-select',
      categoryName: '4. Poligon Beraturan',
      prompt: 'Pilih semua bangun datar yang semua sisinya dan semua sudutnya sama besar!',
      options: [
        { id: 'opt-p-sama-sisi', label: 'Segitiga Sama Sisi', imageEmoji: '🔺', isCorrect: true },
        { id: 'opt-p-persegi', label: 'Persegi', imageEmoji: '🟦', isCorrect: true },
        { id: 'opt-p-persegi-pjg', label: 'Persegi Panjang', imageEmoji: '🟩', isCorrect: false },
        { id: 'opt-p-jajar', label: 'Jajar Genjang', imageEmoji: '💠', isCorrect: false }
      ],
      explanation: 'Segitiga sama sisi dan persegi adalah poligon beraturan karena semua sisi dan sudutnya sama besar.',
      hint: 'Persegi panjang punya panjang dan lebar yang berbeda, bukan poligon beraturan sempurna.'
    },
    {
      id: `q${levelNumber}-5`,
      type: 'single-choice',
      categoryName: '5. Ujian Akhir Master',
      prompt: 'Selamat di Kastil Geometri! Berapakah jumlah sisi total jika kita menggabungkan 1 segitiga dan 1 persegi?',
      illustrationEmoji: '👑',
      options: [
        { id: 't-3', label: '3', imageEmoji: '🔺', isCorrect: false },
        { id: 't-4', label: '4', imageEmoji: '🟦', isCorrect: false },
        { id: 't-7', label: '7 (3 sisi + 4 sisi)', imageEmoji: '👑', isCorrect: true },
        { id: 't-8', label: '8', imageEmoji: '🛑', isCorrect: false }
      ],
      explanation: 'Segitiga (3 sisi) ditambah persegi (4 sisi) = total 7 sisi bangun datar!',
      hint: 'Jumlahkan 3 sisi segitiga dan 4 sisi persegi!'
    }
  ]

  let selectedQuestions = level1Questions
  let levelTitle = `Level ${levelNumber}: ${meta.name}`
  let subCategory = meta.subtitle
  let learningOutcome = `Kuasai materi bangun datar pada ${meta.name} dan kumpulkan 3 bintang emas!`
  let adventureMission = `Jelajahi pulau dan kumpulkan semua target bentuk sebelum menjawab tantangan!`
  let objective = `Kuasai materi bangun datar pada ${meta.name} dan selesaikan tantangan dengan sempurna!`
  let targetShapes = [
    { type: 'segitiga', icon: '🔺', name: 'Segitiga', color: '#f59e0b' },
    { type: 'persegi', icon: '🟦', name: 'Persegi', color: '#3b82f6' },
    { type: 'lingkaran', icon: '🔴', name: 'Lingkaran', color: '#ef4444' }
  ]
  let totalTargetShapes = 3

  // --- PULAU BENTUK (LEVEL 1, 2, 3) SESUAI SLIDE PPT ---
  if (levelNumber === 1) {
    selectedQuestions = level1Questions
    levelTitle = 'Gerbang Pulau Bentuk'
    subCategory = 'Pengenalan • Mengenali tiga bentuk dasar'
    learningOutcome = 'Siswa mampu mengenali segitiga, persegi, dan lingkaran dari tampilannya.'
    adventureMission = 'Temukan 1 segitiga, 1 persegi, dan 1 lingkaran yang tersebar di pulau.'
    objective = 'Mengenali segitiga, persegi, dan lingkaran dari tampilannya.'
    targetShapes = [
      { type: 'segitiga', icon: '🔺', name: 'Segitiga', color: '#f59e0b' },
      { type: 'persegi', icon: '🟦', name: 'Persegi', color: '#3b82f6' },
      { type: 'lingkaran', icon: '🔴', name: 'Lingkaran', color: '#ef4444' }
    ]
    totalTargetShapes = 3
  } else if (levelNumber === 2) {
    selectedQuestions = level2Questions
    levelTitle = 'Lembah Bentuk'
    subCategory = 'Pemahaman • Mengenali sisi dan titik sudut'
    learningOutcome = 'Siswa mampu menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.'
    adventureMission = 'Kumpulkan bentuk dengan ciri berbeda: sisi, sudut, dan bentuk tanpa sudut.'
    objective = 'Menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.'
    targetShapes = [
      { type: 'segitiga', icon: '🔺', name: '3 Sisi', color: '#f59e0b' },
      { type: 'persegi', icon: '🟦', name: '4 Sisi', color: '#3b82f6' },
      { type: 'lingkaran', icon: '⭕', name: 'Titik Sudut', color: '#ef4444' }
    ]
    totalTargetShapes = 3
  } else if (levelNumber === 3) {
    selectedQuestions = level3Questions
    levelTitle = 'Hutan Bentuk'
    subCategory = 'Penerapan • Menemukan bentuk di sekitar kita'
    learningOutcome = 'Siswa mampu mengidentifikasi bangun datar pada benda-benda sehari-hari.'
    adventureMission = 'Cari objek di hutan: jam, atap rumah, dan ubin dengan bentuk yang sesuai.'
    objective = 'Mengidentifikasi bangun datar pada benda-benda sehari-hari.'
    targetShapes = [
      { type: 'lingkaran', icon: '⏰', name: 'Jam', color: '#ea580c' },
      { type: 'segitiga', icon: '🏠', name: 'Atap rumah', color: '#f59e0b' },
      { type: 'persegi', icon: '🔲', name: 'Ubin', color: '#3b82f6' }
    ]
    totalTargetShapes = 3
  } else if (meta.islandNumber === 2) {
    selectedQuestions = island2Questions
  } else if (meta.islandNumber === 3) {
    selectedQuestions = island3Questions
  } else if (meta.islandNumber === 4) {
    selectedQuestions = island4Questions
  } else if (meta.islandNumber === 5) {
    selectedQuestions = island5Questions
  }

  return {
    levelNumber,
    worldName: meta.name,
    worldNumber: meta.islandNumber,
    levelTitle,
    subCategory,
    learningOutcome,
    adventureMission,
    objective,
    estimatedTime: '3-5 menit',
    challengesCount: selectedQuestions.length,
    starsEarned: levelNumber === 1 ? 3 : 0,
    initialLives: 3, // Each level starts with 3 lives / hearts!
    targetShapes,
    totalTargetShapes,
    questions: selectedQuestions,
    rewardBaseScore: 460,
    rewardCoins: 460,
    rewardXp: 100
  }
}

export const level1Data: LevelDetailData = getLevelData(1)
