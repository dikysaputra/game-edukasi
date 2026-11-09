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

// Exactly 3 levels per island, 5 islands = 15 levels total
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
    levels: [4, 5, 6]
  },
  {
    id: 3,
    name: 'Pegunungan Segitiga',
    subtitle: 'Jenis segitiga dan keliling',
    badgeColor: '#0284c7',
    levels: [7, 8, 9]
  },
  {
    id: 4,
    name: 'Danau Lingkaran',
    subtitle: 'Jari-jari, diameter dan luas',
    badgeColor: '#ea580c',
    levels: [10, 11, 12]
  },
  {
    id: 5,
    name: 'Kastil Geometri',
    subtitle: 'Gabungan bentuk dan luas',
    badgeColor: '#dc2626',
    levels: [13, 14, 15]
  }
]

export const gameLevels: MapLevelInfo[] = [
  // Pulau 1: Pulau Bentuk (Levels 1, 2, 3 - Sesuai Slide PPT)
  {
    level: 1,
    islandId: 1,
    islandName: 'Pulau Bentuk',
    islandSubtitle: 'Pengenalan • Mengenali tiga bentuk dasar',
    title: 'Gerbang Pulau Bentuk',
    description: 'Siswa mampu mengenali segitiga, persegi, dan lingkaran dari tampilannya.',
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
    islandSubtitle: 'Pemahaman • Mengenali sisi dan titik sudut',
    title: 'Lembah Bentuk',
    description: 'Siswa mampu menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.',
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
    islandSubtitle: 'Penerapan • Menemukan bentuk di sekitar kita',
    title: 'Hutan Bentuk',
    description: 'Siswa mampu mengidentifikasi bangun datar pada benda-benda sehari-hari.',
    minStars: 60,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 50,
    rewardGems: 20
  },

  // Pulau 2: Hutan Segi Empat (Levels 4, 5, 6)
  {
    level: 4,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Sudut Siku-Siku & Persegi Panjang',
    description: 'Pelajari sudut 90 derajat dan dua pasang sisi sejajar yang anggun.',
    minStars: 90,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 50,
    rewardGems: 20
  },
  {
    level: 5,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Rahasia Trapesium & Jajar Genjang',
    description: 'Kenali sepasang sisi sejajar dan sudut yang berhadapan.',
    minStars: 110,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 55,
    rewardGems: 25
  },
  {
    level: 6,
    islandId: 2,
    islandName: 'Hutan Segi Empat',
    islandSubtitle: 'Sisi, sudut dan jenis-jenisnya',
    title: 'Belah Ketupat & Layang-layang',
    description: 'Pelajari diagonal yang saling memotong tegak lurus.',
    minStars: 130,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 60,
    rewardGems: 25
  },

  // Pulau 3: Pegunungan Segitiga (Levels 7, 8, 9)
  {
    level: 7,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Segitiga Sama Sisi & Sama Kaki',
    description: 'Pelajari sifat simetri dan sudut dalam segitiga di lereng gunung.',
    minStars: 150,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 65,
    rewardGems: 30
  },
  {
    level: 8,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Segitiga Siku-siku & Sudut 90°',
    description: 'Pahami sudut siku-siku 90° dan perbedaan panjang ketiga sisinya.',
    minStars: 170,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 70,
    rewardGems: 30
  },
  {
    level: 9,
    islandId: 3,
    islandName: 'Pegunungan Segitiga',
    islandSubtitle: 'Jenis segitiga dan keliling',
    title: 'Puncak Keliling Segitiga',
    description: 'Menghitung keliling segitiga dengan menjumlahkan ketiga sisinya.',
    minStars: 190,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 75,
    rewardGems: 35
  },

  // Pulau 4: Danau Lingkaran (Levels 10, 11, 12)
  {
    level: 10,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Misteri Titik Pusat & Jari-jari',
    description: 'Kenali bagian-bagian lingkaran dan hubungan r dengan diameter (d = 2r).',
    minStars: 210,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 80,
    rewardGems: 35
  },
  {
    level: 11,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Keliling Danau Donat',
    description: 'Rumus keliling lingkaran K = 2 × π × r melintasi cincin ungu danau.',
    minStars: 230,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 85,
    rewardGems: 40
  },
  {
    level: 12,
    islandId: 4,
    islandName: 'Danau Lingkaran',
    islandSubtitle: 'Jari-jari, diameter dan luas',
    title: 'Luas Lingkaran Air',
    description: 'Hitung luas permukaan lingkaran air danau yang jernih.',
    minStars: 250,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 90,
    rewardGems: 45
  },

  // Pulau 5: Kastil Geometri (Levels 13, 14, 15)
  {
    level: 13,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Gerbang Gabungan Bentuk',
    description: 'Analisis menara kastil yang tersusun dari segitiga dan persegi.',
    minStars: 270,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 100,
    rewardGems: 50
  },
  {
    level: 14,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Menara Poligon Agung',
    description: 'Hitung total luas gabungan bentuk datar di istana utama.',
    minStars: 290,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 120,
    rewardGems: 60
  },
  {
    level: 15,
    islandId: 5,
    islandName: 'Kastil Geometri',
    islandSubtitle: 'Gabungan bentuk dan luas',
    title: 'Takhta Raja Geometri',
    description: 'Pertarungan teka-teki pamungkas untuk menjadi Master Bangun Datar sejati!',
    minStars: 320,
    unlocked: false,
    starsEarned: 0,
    rewardStars: 150,
    rewardGems: 100
  }
]

export const quizQuestions: QuestionItem[] = [
  // Level 1: Gerbang Pulau Bentuk (Slide 3 PPT)
  {
    id: 'q1-1',
    level: 1,
    levelTitle: 'Gerbang Pulau Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Manakah gambar yang berbentuk segitiga?',
    shapeVisual: { type: 'segitiga', color: '#facc15', icon: '🔺' },
    options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
    correctAnswer: 'Segitiga',
    explanation: 'Segitiga selalu dibatasi oleh 3 sisi dan memiliki 3 buah titik sudut.',
    hint: 'Hitung jumlah sisi pada atap rumah atau potongan pizza!'
  },
  {
    id: 'q1-2',
    level: 1,
    levelTitle: 'Gerbang Pulau Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Bangun datar manakah yang berbentuk bulat?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '⭕' },
    options: ['Lingkaran', 'Segitiga', 'Persegi', 'Trapesium'],
    correctAnswer: 'Lingkaran',
    explanation: 'Lingkaran dibentuk oleh satu garis lengkung tertutup tanpa titik sudut (0 sudut).',
    hint: 'Bentuk seperti koin uang atau roda sepeda.'
  },
  {
    id: 'q1-3',
    level: 1,
    levelTitle: 'Gerbang Pulau Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Pilih gambar yang merupakan persegi.',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🟦' },
    options: ['Persegi', 'Segitiga', 'Lingkaran', 'Persegi Panjang'],
    correctAnswer: 'Persegi',
    explanation: 'Persegi memiliki tepat 4 sisi yang semua panjangnya sama persis.',
    hint: 'Bentuk ubin lantai atau papan catur memiliki sisi yang sama.'
  },
  {
    id: 'q1-4',
    level: 1,
    levelTitle: 'Gerbang Pulau Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Bentuk apa yang memiliki tiga sisi?',
    shapeVisual: { type: 'segitiga', color: '#f59e0b', icon: '🔺' },
    options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
    correctAnswer: 'Segitiga',
    explanation: 'Segitiga berasal dari kata tiga, dibatasi oleh 3 sisi garis lurus.',
    hint: 'Hitung garis pembatas: 1, 2, 3!'
  },
  {
    id: 'q1-5',
    level: 1,
    levelTitle: 'Gerbang Pulau Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Bangun datar apa yang memiliki empat sisi sama panjang?',
    shapeVisual: { type: 'persegi', color: '#2563eb', icon: '🟦' },
    options: ['Persegi', 'Segitiga', 'Lingkaran', 'Trapesium'],
    correctAnswer: 'Persegi',
    explanation: 'Persegi memiliki empat sisi yang sama panjang dan empat sudut siku-siku.',
    hint: 'Kotak sempurna dengan panjang dan lebar sama.'
  },

  // Level 2: Lembah Bentuk (Slide 4 PPT)
  {
    id: 'q2-1',
    level: 2,
    levelTitle: 'Lembah Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Berapa jumlah sisi pada segitiga?',
    shapeVisual: { type: 'segitiga', color: '#f59e0b', icon: '🔺' },
    options: ['3 sisi', '4 sisi', '5 sisi', '0 sisi'],
    correctAnswer: '3 sisi',
    explanation: 'Segitiga selalu dibatasi oleh tepat 3 sisi garis lurus.',
    hint: 'Kata segitiga menunjukkan bahwa bangun ini punya 3 sisi.'
  },
  {
    id: 'q2-2',
    level: 2,
    levelTitle: 'Lembah Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Berapa jumlah titik sudut pada persegi?',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🟦' },
    options: ['4 titik sudut', '3 titik sudut', '5 titik sudut', '0 titik sudut'],
    correctAnswer: '4 titik sudut',
    explanation: 'Persegi memiliki 4 buah titik sudut siku-siku 90°.',
    hint: 'Hitung setiap pojokan pada bentuk persegi kotak.'
  },
  {
    id: 'q2-3',
    level: 2,
    levelTitle: 'Lembah Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Berapa jumlah titik sudut pada lingkaran?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '⭕' },
    options: ['0 titik sudut', '1 titik sudut', '3 titik sudut', '4 titik sudut'],
    correctAnswer: '0 titik sudut',
    explanation: 'Lingkaran adalah garis lengkung mulus tanpa pojokan, jadi mempunyai 0 titik sudut.',
    hint: 'Lingkaran membulat sempurna dan tidak memiliki pojok lancip.'
  },
  {
    id: 'q2-4',
    level: 2,
    levelTitle: 'Lembah Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Bangun datar apa yang memiliki empat sisi?',
    shapeVisual: { type: 'persegi', color: '#10b981', icon: '🟦' },
    options: ['Persegi', 'Segitiga', 'Lingkaran', 'Bintang'],
    correctAnswer: 'Persegi',
    explanation: 'Persegi adalah bangun datar segi empat dengan 4 sisi garis lurus.',
    hint: 'Bangun datar berbentuk kotak seperti buku atau jendela.'
  },
  {
    id: 'q2-5',
    level: 2,
    levelTitle: 'Lembah Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Bangun datar apa yang tidak memiliki titik sudut?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '⭕' },
    options: ['Lingkaran', 'Segitiga', 'Persegi', 'Persegi Panjang'],
    correctAnswer: 'Lingkaran',
    explanation: 'Lingkaran melengkung bulat utuh tanpa titik sudut (0 titik sudut).',
    hint: 'Bentuk seperti koin atau roda ban sepeda.'
  },

  // Level 3: Hutan Bentuk (Slide 5 PPT)
  {
    id: 'q3-1',
    level: 3,
    levelTitle: 'Hutan Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
    shapeVisual: { type: 'lingkaran', color: '#ea580c', icon: '⏰' },
    options: ['Lingkaran', 'Persegi', 'Segitiga', 'Trapesium'],
    correctAnswer: 'Lingkaran',
    explanation: 'Jam dinding berbentuk bulat menyerupai bentuk bangun datar lingkaran.',
    hint: 'Benda bulat bundar tanpa sudut yang ada di dinding rumah.'
  },
  {
    id: 'q3-2',
    level: 3,
    levelTitle: 'Hutan Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Atap rumah pada gambar menyerupai bentuk apa?',
    shapeVisual: { type: 'segitiga', color: '#f59e0b', icon: '🏠' },
    options: ['Segitiga', 'Lingkaran', 'Persegi', 'Persegi Panjang'],
    correctAnswer: 'Segitiga',
    explanation: 'Atap rumah memiliki bentuk segitiga untuk mengalirkan air hujan.',
    hint: 'Bentuk runcing segitiga di bagian paling atas rumah.'
  },
  {
    id: 'q3-3',
    level: 3,
    levelTitle: 'Hutan Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Ubin dengan empat sisi sama panjang menyerupai apa?',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🔲' },
    options: ['Persegi', 'Lingkaran', 'Segitiga', 'Belah Ketupat'],
    correctAnswer: 'Persegi',
    explanation: 'Ubin keramik lantai dengan 4 sisi sama panjang menyerupai bentuk persegi.',
    hint: 'Ubin kotak yang ada di lantai rumah.'
  },
  {
    id: 'q3-4',
    level: 3,
    levelTitle: 'Hutan Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
    shapeVisual: { type: 'persegi-panjang', color: '#10b981', icon: '🚪' },
    options: ['4 sisi', '3 sisi', '5 sisi', '2 sisi'],
    correctAnswer: '4 sisi',
    explanation: 'Pintu rumah memiliki 2 sisi tegak dan 2 sisi mendatar, totalnya 4 sisi.',
    hint: 'Hitung tepi atas, bawah, kanan, dan kiri pintu.'
  },
  {
    id: 'q3-5',
    level: 3,
    levelTitle: 'Hutan Bentuk',
    islandName: 'Pulau Bentuk',
    prompt: 'Roda sepeda jika dilihat dari samping berbentuk apa?',
    shapeVisual: { type: 'lingkaran', color: '#ef4444', icon: '🚲' },
    options: ['Lingkaran', 'Segitiga', 'Persegi', 'Bujur Sangkar'],
    correctAnswer: 'Lingkaran',
    explanation: 'Roda sepeda berbentuk lingkaran bundar agar dapat menggelinding mulus.',
    hint: 'Bentuk bulat bundar yang berputar saat bersepeda.'
  },

  // Level 4: Hutan Segi Empat
  {
    id: 'q4-1',
    level: 4,
    levelTitle: 'Sisi & Sudut Segi Empat',
    islandName: 'Hutan Segi Empat',
    prompt: 'Jumlah seluruh sudut pada setiap segi empat selalu sama dengan ...',
    shapeVisual: { type: 'persegi', color: '#8b5cf6', icon: '🔲' },
    options: ['180°', '270°', '360°', '400°'],
    correctAnswer: '360°',
    explanation: 'Total sudut dalam segi empat adalah 4 × 90° = 360°.',
    hint: 'Dua kali lipat total sudut pada segitiga (180° × 2).'
  },

  // Level 5: Hutan Segi Empat
  {
    id: 'q5-1',
    level: 5,
    levelTitle: 'Macam-macam Segi Empat',
    islandName: 'Hutan Segi Empat',
    prompt: 'Segi empat yang memiliki sepasang sisi sejajar tetapi tidak sama panjang disebut ...',
    shapeVisual: { type: 'trapesium', color: '#a855f7', icon: '⛵' },
    options: ['Trapesium', 'Persegi', 'Segitiga', 'Lingkaran'],
    correctAnswer: 'Trapesium',
    explanation: 'Trapesium ditandai dengan sepasang sisi berhadapan yang saling sejajar.',
    hint: 'Bentuknya menyerupai perahu atau atap rumah joglo.'
  },

  // Level 6: Hutan Segi Empat
  {
    id: 'q6-1',
    level: 6,
    levelTitle: 'Keliling Segi Empat',
    islandName: 'Hutan Segi Empat',
    prompt: 'Sebuah persegi memiliki sisi 5 cm. Berapakah kelilingnya?',
    shapeVisual: { type: 'persegi', color: '#3b82f6', icon: '🟦' },
    options: ['10 cm', '15 cm', '20 cm (4 × 5)', '25 cm'],
    correctAnswer: '20 cm (4 × 5)',
    explanation: 'Keliling persegi = 4 × sisi = 4 × 5 cm = 20 cm.',
    hint: 'Jumlahkan keempat sisinya (5 + 5 + 5 + 5).'
  },

  // Level 7: Pegunungan Segitiga
  {
    id: 'q7-1',
    level: 7,
    levelTitle: 'Segitiga Sama Sisi & Kaki',
    islandName: 'Pegunungan Segitiga',
    prompt: 'Segitiga yang ketiga sisinya sama panjang disebut segitiga ...',
    shapeVisual: { type: 'segitiga', color: '#0284c7', icon: '🔺' },
    options: ['Sama sisi', 'Sama kaki', 'Siku-siku', 'Sembarang'],
    correctAnswer: 'Sama sisi',
    explanation: 'Segitiga sama sisi memiliki 3 sisi sama panjang dan 3 sudut sama besar (60°).',
    hint: 'Semua sisinya kembar persis.'
  },

  // Level 8: Pegunungan Segitiga
  {
    id: 'q8-1',
    level: 8,
    levelTitle: 'Segitiga Siku-siku',
    islandName: 'Pegunungan Segitiga',
    prompt: 'Salah satu sudut pada segitiga siku-siku bernilai tepat ...',
    shapeVisual: { type: 'segitiga', color: '#0ea5e9', icon: '📐' },
    options: ['45°', '60°', '90°', '180°'],
    correctAnswer: '90°',
    explanation: 'Segitiga siku-siku memiliki tepat satu sudut siku-siku berukuran 90°.',
    hint: 'Sudut tegak lurus seperti pojok penggaris siku.'
  },

  // Level 9: Pegunungan Segitiga
  {
    id: 'q9-1',
    level: 9,
    levelTitle: 'Keliling Segitiga',
    islandName: 'Pegunungan Segitiga',
    prompt: 'Keliling segitiga dengan panjang sisi 6 cm, 8 cm, dan 10 cm adalah ...',
    shapeVisual: { type: 'segitiga', color: '#38bdf8', icon: '🔺' },
    options: ['20 cm', '24 cm (6+8+10)', '28 cm', '30 cm'],
    correctAnswer: '24 cm (6+8+10)',
    explanation: 'Keliling segitiga = sisi1 + sisi2 + sisi3 = 6 + 8 + 10 = 24 cm.',
    hint: 'Jumlahkan panjang ketiga sisinya.'
  },

  // Level 10: Danau Lingkaran
  {
    id: 'q10-1',
    level: 10,
    levelTitle: 'Jari-jari Lingkaran',
    islandName: 'Danau Lingkaran',
    prompt: 'Garis lurus dari titik pusat ke tepi lingkaran disebut ...',
    shapeVisual: { type: 'lingkaran', color: '#ea580c', icon: '⭕' },
    options: ['Jari-jari (r)', 'Diameter (d)', 'Tali busur', 'Keliling'],
    correctAnswer: 'Jari-jari (r)',
    explanation: 'Jari-jari adalah jarak dari pusat lingkaran menuju garis lengkung tepi luar.',
    hint: 'Setengah dari garis tengah diameter.'
  },

  // Level 11: Danau Lingkaran
  {
    id: 'q11-1',
    level: 11,
    levelTitle: 'Diameter Lingkaran',
    islandName: 'Danau Lingkaran',
    prompt: 'Jika sebuah lingkaran memiliki jari-jari 7 cm, berapa diameternya?',
    shapeVisual: { type: 'lingkaran', color: '#f97316', icon: '⭕' },
    options: ['7 cm', '14 cm (2 × 7)', '21 cm', '28 cm'],
    correctAnswer: '14 cm (2 × 7)',
    explanation: 'Diameter = 2 × jari-jari = 2 × 7 cm = 14 cm.',
    hint: 'Diameter besarnya dua kali lipat jari-jari.'
  },

  // Level 12: Danau Lingkaran
  {
    id: 'q12-1',
    level: 12,
    levelTitle: 'Keliling Lingkaran',
    islandName: 'Danau Lingkaran',
    prompt: 'Berapakah keliling lingkaran jika diameternya 14 cm? (π = 22/7)',
    shapeVisual: { type: 'lingkaran', color: '#fb923c', icon: '🍩' },
    options: ['22 cm', '44 cm (22/7 × 14)', '88 cm', '154 cm'],
    correctAnswer: '44 cm (22/7 × 14)',
    explanation: 'Keliling = π × d = 22/7 × 14 = 44 cm.',
    hint: 'Gunakan rumus K = π × d.'
  },

  // Level 13: Kastil Geometri
  {
    id: 'q13-1',
    level: 13,
    levelTitle: 'Gabungan Bentuk Datar',
    islandName: 'Kastil Geometri',
    prompt: 'Menara kastil tersusun dari dinding persegi dan atap segitiga. Ini disebut bangun ...',
    shapeVisual: { type: 'persegi', color: '#dc2626', icon: '🏰' },
    options: ['Bangun Datar Gabungan', 'Bangun Ruang', 'Garis Lurus', 'Titik'],
    correctAnswer: 'Bangun Datar Gabungan',
    explanation: 'Bangun datar gabungan terdiri atas gabungan dua atau lebih bentuk dasar.',
    hint: 'Terdiri dari beberapa bentuk datar yang bersatu.'
  },

  // Level 14: Kastil Geometri
  {
    id: 'q14-1',
    level: 14,
    levelTitle: 'Luas Gabungan Bentuk',
    islandName: 'Kastil Geometri',
    prompt: 'Dua persegi dengan sisi 4 cm dijejerkan berdampingan. Berapakah luas totalnya?',
    shapeVisual: { type: 'persegi', color: '#ef4444', icon: '🟦' },
    options: ['16 cm²', '32 cm² (16 + 16)', '24 cm²', '64 cm²'],
    correctAnswer: '32 cm² (16 + 16)',
    explanation: 'Luas satu persegi = 4 × 4 = 16 cm². Dua persegi = 16 + 16 = 32 cm².',
    hint: 'Hitung luas masing-masing persegi lalu jumlahkan.'
  },

  // Level 15: Kastil Geometri
  {
    id: 'q15-1',
    level: 15,
    levelTitle: 'Ujian Geometri Pamungkas',
    islandName: 'Kastil Geometri',
    prompt: 'Berapa banyak sisi total jika kita menggabungkan 1 segitiga (3) dan 1 segi empat (4)?',
    shapeVisual: { type: 'segitiga', color: '#b91c1c', icon: '👑' },
    options: ['5 sisi', '6 sisi', '7 sisi', '8 sisi'],
    correctAnswer: '7 sisi',
    explanation: 'Segitiga (3 sisi) + Segi empat (4 sisi) = 7 sisi bangun datar total!',
    hint: 'Jumlahkan 3 ditambah 4.'
  }
]
