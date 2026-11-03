export interface QuestionItem {
  id: string
  level: number
  levelTitle: string
  islandName: string
  prompt: string
  shapeVisual: {
    type: 'segitiga' | 'persegi' | 'lingkaran' | 'persegi-panjang' | 'trapesium' | 'belah-ketupat' | 'jajar-genjang'
    color: string
    icon: string
  }
  options: string[]
  correctAnswer: string
  explanation: string
  hint: string
}

export interface MapLevelInfo {
  level: number
  islandId: number
  islandName: string
  islandSubtitle: string
  title: string
  description: string
  minStars: number
  unlocked: boolean
  starsEarned: number // 0, 1, 2, 3
  rewardStars: number
  rewardGems: number
}

export const mapIslands = [
  {
    id: 1,
    name: 'Pulau Bentuk',
    subtitle: 'Mengenal bentuk dasar',
    badgeColor: '#16a34a',
    levels: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Hutan Segi Empat',
    subtitle: 'Sisi, sudut dan jenis-jenisnya',
    badgeColor: '#9333ea',
    levels: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 3,
    name: 'Pegunungan Segitiga',
    subtitle: 'Jenis segitiga dan keliling',
    badgeColor: '#0284c7',
    levels: [13, 14, 15, 16, 17, 18]
  },
  {
    id: 4,
    name: 'Danau Lingkaran',
    subtitle: 'Jari-jari, diameter dan luas',
    badgeColor: '#ea580c',
    levels: [19, 20, 21, 22, 23, 24]
  },
  {
    id: 5,
    name: 'Kastil Geometri',
    subtitle: 'Gabungan bentuk dan luas',
    badgeColor: '#dc2626',
    levels: [25, 26, 27, 28, 29, 30]
  }
]

export const gameLevels: MapLevelInfo[] = [
  // Pulau Bentuk
  {
    level: 1,
    islandId: 1,
    islandName: 'Pulau Bentuk',
    islandSubtitle: 'Mengenal bentuk dasar',
    title: 'Mengenal Segitiga & Lingkaran',
    description: 'Pelajari sisi, sudut, dan ciri khas bangun datar dasar pertama.',
    minStars: 0,
    unlocked: true,
    starsEarned: 3,
    rewardStars: 30,
    rewardGems: 10
  },
  {
    level: 2,
    islandId: 1,
    islandName: 'Pulau Bentuk',
    islandSubtitle: 'Mengenal bentuk dasar',
    title: 'Persegi & Persegi Panjang',
    description: 'Temukan perbedaan sudut siku-siku dan kesamaan panjang sisi.',
    minStars: 0,
    unlocked: true,
    starsEarned: 0,
    rewardStars: 40,
    rewardGems: 15
  },
  {
    level: 3,
    islandId: 1,
    islandName: 'Pulau Bentuk',
    islandSubtitle: 'Mengenal bentuk dasar',
    title: 'Tantangan Tebak Bentuk',
    description: 'Uji ketangkasanmu mengenali berbagai bentuk benda di sekitar kita.',
    minStars: 60,
    unlocked: true,
    starsEarned: 0,
    rewardStars: 50,
    rewardGems: 20
  },

  // Hutan Segi Empat
  {
    level: 7,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Rahasia Trapesium & Jajar Genjang',
    description: 'Kenali sepasang sisi sejajar dan sudut yang berhadapan.',
    minStars: 90,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 50,
    rewardGems: 20
  },
  {
    level: 8,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Belah Ketupat & Layang-layang',
    description: 'Pelajari diagonal yang saling memotong tegak lurus.',
    minStars: 110,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 55,
    rewardGems: 25
  },
  {
    level: 9,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Labirin Segi Empat Hutan',
    description: 'Selesaikan teka-teki sudut dan sifat istimewa segi empat.',
    minStars: 130,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 60,
    rewardGems: 25
  },
  {
    level: 12,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Puncak Hutan Segi Empat',
    description: 'Tantangan akhir Hutan Segi Empat sebelum menyeberang danau.',
    minStars: 150,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 65,
    rewardGems: 30
  },

  // Pegunungan Segitiga
  {
    level: 13,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Segitiga Sama Kaki & Sama Sisi',
    description: 'Pelajari sifat simetri dan sudut dalam segitiga di lereng gunung.',
    minStars: 170,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 70,
    rewardGems: 30
  },
  {
    level: 14,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Segitiga Siku-siku & Sembarang',
    description: 'Pahami sudut 90° dan perbedaan panjang ketiga sisinya.',
    minStars: 185,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 75,
    rewardGems: 35
  },
  {
    level: 15,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Keliling Puncak Segitiga',
    description: 'Menghitung keliling segitiga dengan menjumlahkan ketiga sisinya.',
    minStars: 200,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 80,
    rewardGems: 35
  },

  // Danau Lingkaran
  {
    level: 19,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Misteri Titik Pusat & Jari-jari',
    description: 'Kenali bagian-bagian lingkaran dan hubungan r dengan diameter (d = 2r).',
    minStars: 220,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 85,
    rewardGems: 40
  },
  {
    level: 20,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Keliling Danau Donat',
    description: 'Rumus keliling lingkaran K = 2 × π × r melintasi cincin ungu danau.',
    minStars: 240,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 90,
    rewardGems: 45
  },
  {
    level: 21,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Luas Lingkaran & Setengah Lingkaran',
    description: 'Hitung luas permukaan lingkaran air danau yang jernih.',
    minStars: 260,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 95,
    rewardGems: 50
  },

  // Kastil Geometri
  {
    level: 25,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Gerbang Gabungan Bentuk',
    description: 'Analisis menara kastil yang tersusun dari segitiga dan persegi.',
    minStars: 280,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 100,
    rewardGems: 50
  },
  {
    level: 26,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Menara Poligon Agung',
    description: 'Hitung total luas gabungan bentuk datar di istana utama.',
    minStars: 300,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 120,
    rewardGems: 60
  },
  {
    level: 30,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Takhta Raja Geometri',
    description: 'Pertarungan teka-teki pamungkas untuk menjadi Master Bangun Datar sejati!',
    minStars: 350,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 150,
    rewardGems: 100
  }
]

export const quizQuestions: QuestionItem[] = [
  // Level 1: Pulau Bentuk (Mengenal Bentuk Dasar)
  {
    id: 'q1-1',
    level: 1,
    levelTitle: 'Pulau Bentuk · Level 1',
    islandName: 'Pulau Bentuk',
    prompt: 'Aku memiliki 3 sisi garis lurus dan 3 buah titik sudut. Siapakah aku?',
    shapeVisual: { type: 'segitiga', color: '#facc15', icon: '🔺' },
    options: ['Lingkaran', 'Segitiga', 'Persegi', 'Trapesium'],
    correctAnswer: 'Segitiga',
    explanation: 'Segitiga selalu dibatasi oleh 3 sisi dan memiliki 3 buah titik sudut lancip, tumpul, atau siku-siku.',
    hint: 'Hitung jumlah sisi pada atap rumah atau potongan pizza!'
  },
  {
    id: 'q1-2',
    level: 1,
    levelTitle: 'Pulau Bentuk · Level 1',
    islandName: 'Pulau Bentuk',
    prompt: 'Bentuk bangun datar apakah yang tidak memiliki titik sudut sama sekali (0 sudut)?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '⭕' },
    options: ['Persegi', 'Segitiga', 'Lingkaran', 'Jajar Genjang'],
    correctAnswer: 'Lingkaran',
    explanation: 'Lingkaran dibentuk oleh satu garis lengkung tertutup tanpa titik sudut sama sekali.',
    hint: 'Bentuk seperti koin uang atau roda sepeda.'
  },
  {
    id: 'q1-3',
    level: 1,
    levelTitle: 'Pulau Bentuk · Level 1',
    islandName: 'Pulau Bentuk',
    prompt: 'Berapakah jumlah sisi pada sebuah Persegi yang sama panjang?',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🟦' },
    options: ['3 sisi', '4 sisi sama panjang', '5 sisi', 'Tidak punya sisi'],
    correctAnswer: '4 sisi sama panjang',
    explanation: 'Persegi memiliki tepat 4 sisi yang semua panjangnya sama persis dan 4 sudut siku-siku 90°.',
    hint: 'Bentuk ubin lantai atau papan catur memiliki sisi yang sama.'
  },

  // Level 2: Pulau Bentuk (Sifat & Perbedaan)
  {
    id: 'q2-1',
    level: 2,
    levelTitle: 'Pulau Bentuk · Level 2',
    islandName: 'Pulau Bentuk',
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
    levelTitle: 'Pulau Bentuk · Level 2',
    islandName: 'Pulau Bentuk',
    prompt: 'Besar masing-masing sudut siku-siku pada persegi dan persegi panjang adalah ...',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '📐' },
    options: ['45°', '60°', '90°', '180°'],
    correctAnswer: '90°',
    explanation: 'Sudut siku-siku selalu memiliki besar tepat 90 derajat tegak lurus sempurna.',
    hint: 'Sudut yang membentuk huruf L tegak sempurna.'
  },
  {
    id: 'q2-3',
    level: 2,
    levelTitle: 'Pulau Bentuk · Level 2',
    islandName: 'Pulau Bentuk',
    prompt: 'Garis lurus yang menghubungkan titik pusat lingkaran dengan tepi lingkaran disebut ...',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '🎯' },
    options: ['Diameter', 'Jari-jari (r)', 'Sisi Miring', 'Tinggi'],
    correctAnswer: 'Jari-jari (r)',
    explanation: 'Jari-jari adalah jarak dari titik pusat ke tepi lingkaran (panjangnya tepat setengah diameter).',
    hint: 'Simbolnya adalah huruf r (radius).'
  },

  // Level 3: Pulau Bentuk (Tebak Bangun Lanjut)
  {
    id: 'q3-1',
    level: 3,
    levelTitle: 'Pulau Bentuk · Level 3',
    islandName: 'Pulau Bentuk',
    prompt: 'Bangun datar segi empat yang memiliki sepasang sisi sejajar tetapi tidak sama panjang adalah ...',
    shapeVisual: { type: 'trapesium', color: '#8b5cf6', icon: '⛵' },
    options: ['Trapesium', 'Persegi', 'Segitiga', 'Lingkaran'],
    correctAnswer: 'Trapesium',
    explanation: 'Trapesium ciri utamanya adalah memiliki sepasang sisi berhadapan yang sejajar dengan panjang berbeda.',
    hint: 'Bentuknya menyerupai perahu atau atap rumah joglo.'
  },
  {
    id: 'q3-2',
    level: 3,
    levelTitle: 'Pulau Bentuk · Level 3',
    islandName: 'Pulau Bentuk',
    prompt: 'Makanan tradisional ketupat saat lebaran menyerupai bentuk bangun datar ...',
    shapeVisual: { type: 'belah-ketupat', color: '#ec4899', icon: '🎋' },
    options: ['Belah Ketupat', 'Persegi Panjang', 'Lingkaran', 'Segitiga Siku-siku'],
    correctAnswer: 'Belah Ketupat',
    explanation: 'Bentuk anyaman ketupat memiliki 4 sisi sama panjang dengan diagonal tegak lurus berpotongan.',
    hint: 'Namanya sama persis dengan makanan tersebut!'
  },
  {
    id: 'q3-3',
    level: 3,
    levelTitle: 'Pulau Bentuk · Level 3',
    islandName: 'Pulau Bentuk',
    prompt: 'Berapakah jumlah seluruh besar sudut dalam sebuah segitiga?',
    shapeVisual: { type: 'segitiga', color: '#facc15', icon: '🔺' },
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '180°',
    explanation: 'Jika ketiga sudut dalam segitiga dijumlahkan bersama, hasilnya selalu tepat 180°.',
    hint: 'Sama dengan sudut garis lurus.'
  },

  // Level 7: Hutan Segi Empat (Sisi, Sudut & Jenis)
  {
    id: 'q7-1',
    level: 7,
    levelTitle: 'Hutan Segi Empat · Level 7',
    islandName: 'Hutan Segi Empat',
    prompt: 'Bangun segi empat dengan 2 pasang sisi berhadapan sejajar dan sudut berhadapan sama besar adalah ...',
    shapeVisual: { type: 'jajar-genjang', color: '#06b6d4', icon: '💠' },
    options: ['Jajar Genjang', 'Segitiga', 'Lingkaran', 'Trapesium'],
    correctAnswer: 'Jajar Genjang',
    explanation: 'Jajar genjang memiliki 2 pasang sisi sejajar sama panjang dan sudut yang berhadapan sama besar.',
    hint: 'Bentuk persegi panjang yang dimiringkan.'
  },

  // Level 13: Pegunungan Segitiga
  {
    id: 'q13-1',
    level: 13,
    levelTitle: 'Pegunungan Segitiga · Level 13',
    islandName: 'Pegunungan Segitiga',
    prompt: 'Segitiga yang mempunyai ketiga sisi sama panjang dan ketiga sudut 60° adalah ...',
    shapeVisual: { type: 'segitiga', color: '#f59e0b', icon: '📐' },
    options: ['Segitiga Sama Sisi', 'Segitiga Siku-siku', 'Segitiga Sembarang', 'Segitiga Tumpul'],
    correctAnswer: 'Segitiga Sama Sisi',
    explanation: 'Segitiga sama sisi memiliki 3 sisi sama panjang dan semua sudutnya 60°.',
    hint: 'Sisi-sisinya sama persis satu sama lain.'
  },

  // Level 19: Danau Lingkaran
  {
    id: 'q19-1',
    level: 19,
    levelTitle: 'Danau Lingkaran · Level 19',
    islandName: 'Danau Lingkaran',
    prompt: 'Jika sebuah lingkaran memiliki jari-jari r = 7 cm, berapakah diameternya?',
    shapeVisual: { type: 'lingkaran', color: '#38bdf8', icon: '⭕' },
    options: ['14 cm', '21 cm', '7 cm', '28 cm'],
    correctAnswer: '14 cm',
    explanation: 'Diameter adalah dua kali jari-jari (d = 2 × r), sehingga 2 × 7 cm = 14 cm.',
    hint: 'Diameter membentang penuh melewati titik tengah.'
  },

  // Level 25: Kastil Geometri
  {
    id: 'q25-1',
    level: 25,
    levelTitle: 'Kastil Geometri · Level 25',
    islandName: 'Kastil Geometri',
    prompt: 'Sebuah atap menara kastil berbentuk segitiga beralas 6 m dan tinggi 4 m. Berapakah luasnya?',
    shapeVisual: { type: 'segitiga', color: '#dc2626', icon: '🏰' },
    options: ['12 m²', '24 m²', '10 m²', '18 m²'],
    correctAnswer: '12 m²',
    explanation: 'Luas segitiga = ½ × alas × tinggi = ½ × 6 × 4 = 12 m².',
    hint: 'Gunakan rumus Luas Segitiga: ½ × alas × tinggi.'
  }
]
