export interface ShapeItem {
  id: string
  name: string
  alias: string
  category: 'Segibanyak' | 'Lengkung'
  sides: number
  vertices: number // sudut / titik sudut
  color: string
  bgSoft: string
  description: string
  properties: string[]
  formula: {
    perimeter: string
    area: string
  }
  examples: { name: string; emoji: string }[]
  funFact: string
}

export const shapesList: ShapeItem[] = [
  {
    id: 'segitiga',
    name: 'Segitiga',
    alias: 'Triangle',
    category: 'Segibanyak',
    sides: 3,
    vertices: 3,
    color: '#eab308',
    bgSoft: '#fef9c3',
    description: 'Bangun datar yang dibatasi oleh tiga buah sisi dan mempunyai tiga buah titik sudut. Jumlah seluruh sudutnya adalah 180°.',
    properties: [
      'Memiliki 3 sisi garis lurus',
      'Memiliki 3 titik sudut',
      'Total besar sudut dalam adalah 180°',
      'Ada segitiga sama sisi, sama kaki, dan siku-siku'
    ],
    formula: {
      perimeter: 'K = s₁ + s₂ + s₃',
      area: 'L = ½ × alas × tinggi'
    },
    examples: [
      { name: 'Potongan Pizza', emoji: '🍕' },
      { name: 'Atap Rumah', emoji: '🏠' },
      { name: 'Penggaris Segitiga', emoji: '📐' },
      { name: 'Rambu Bahaya', emoji: '⚠️' }
    ],
    funFact: 'Piramida di Mesir memiliki sisi berbentuk segitiga yang sangat kokoh menahan gempa bumi selama ribuan tahun!'
  },
  {
    id: 'persegi',
    name: 'Persegi',
    alias: 'Square',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#3b82f6',
    bgSoft: '#dbeafe',
    description: 'Bangun datar segi empat yang keempat sisinya sama panjang dan keempat sudutnya merupakan sudut siku-siku (90°).',
    properties: [
      'Memiliki 4 sisi yang sama panjang',
      'Memiliki 4 sudut siku-siku bernilai 90°',
      'Memiliki 4 sumbu simetri lipat dan putar',
      'Kedua diagonalnya sama panjang dan saling tegak lurus'
    ],
    formula: {
      perimeter: 'K = 4 × sisi',
      area: 'L = sisi × sisi (s²)'
    },
    examples: [
      { name: 'Ubin / Keramik', emoji: '🔲' },
      { name: 'Papan Catur', emoji: '♟️' },
      { name: 'Kertas Origami', emoji: '📄' },
      { name: 'Kado Kubus', emoji: '🎁' }
    ],
    funFact: 'Karena semua sisinya sama persis, jika kamu memutar persegi 90°, bentuknya akan terlihat sama seperti semula!'
  },
  {
    id: 'persegi-panjang',
    name: 'Persegi Panjang',
    alias: 'Rectangle',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#10b981',
    bgSoft: '#d1fae5',
    description: 'Bangun datar segi empat yang mempunyai dua pasang sisi sejajar sama panjang dan keempat sudutnya siku-siku.',
    properties: [
      'Memiliki 4 sisi (2 pasang sisi sejajar & sama panjang)',
      'Memiliki 4 sudut siku-siku bernilai 90°',
      'Memiliki 2 sumbu simetri lipat',
      'Panjang dan lebarnya memiliki ukuran yang berbeda'
    ],
    formula: {
      perimeter: 'K = 2 × (panjang + lebar)',
      area: 'L = panjang × lebar'
    },
    examples: [
      { name: 'Pintu Rumah', emoji: '🚪' },
      { name: 'Layar HP / Tablet', emoji: '📱' },
      { name: 'Buku Tulis', emoji: '📘' },
      { name: 'Papan Tulis', emoji: '🏫' }
    ],
    funFact: 'Hampir semua layar smartphone, laptop, dan TV yang kita gunakan setiap hari berbentuk persegi panjang!'
  },
  {
    id: 'lingkaran',
    name: 'Lingkaran',
    alias: 'Circle',
    category: 'Lengkung',
    sides: 1,
    vertices: 0,
    color: '#ef4444',
    bgSoft: '#fee2e2',
    description: 'Bangun datar yang dibentuk oleh sekumpulan titik yang berjarak sama terhadap sebuah titik pusat. Tidak memiliki sudut!',
    properties: [
      'Memiliki 1 sisi lengkung melingkar tertutup',
      'Tidak memiliki titik sudut sama sekali (0 sudut)',
      'Memiliki jari-jari (r) dan diameter (d = 2r)',
      'Memiliki sumbu simetri lipat dan putar tak terhingga'
    ],
    formula: {
      perimeter: 'K = 2 × π × r (atau π × d)',
      area: 'L = π × r² (π ≈ 22/7 atau 3.14)'
    },
    examples: [
      { name: 'Roda Sepeda', emoji: '🚲' },
      { name: 'Donat Lezat', emoji: '🍩' },
      { name: 'Jam Dinding', emoji: '⏰' },
      { name: 'Koin Uang', emoji: '🪙' }
    ],
    funFact: 'Roda kendaraan dibuat berbentuk lingkaran agar bisa berputar dengan sangat mulus tanpa goncangan naik-turun!'
  },
  {
    id: 'trapesium',
    name: 'Trapesium',
    alias: 'Trapezoid',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#8b5cf6',
    bgSoft: '#ede9fe',
    description: 'Bangun datar segi empat yang memiliki tepat satu pasang sisi sejajar yang panjangnya tidak sama.',
    properties: [
      'Memiliki 4 sisi dengan sepasang sisi sejajar',
      'Memiliki 4 sudut',
      'Ada trapesium sama kaki, siku-siku, dan sembarang',
      'Sudut yang berdekatan di antara dua sisi sejajar berjumlah 180°'
    ],
    formula: {
      perimeter: 'K = a + b + c + d',
      area: 'L = ½ × (sisi atas + sisi bawah) × tinggi'
    },
    examples: [
      { name: 'Perahu Kertas', emoji: '⛵' },
      { name: 'Atap Rumah Joglo', emoji: '🛖' },
      { name: 'Tas Jinjing', emoji: '👜' },
      { name: 'Kap Lampu Tidur', emoji: '🛋️' }
    ],
    funFact: 'Bentuk badan perahu dan wadah gerobak sering memakai trapesium agar bagian atasnya luas dan mudah diisi!'
  },
  {
    id: 'jajar-genjang',
    name: 'Jajar Genjang',
    alias: 'Parallelogram',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#06b6d4',
    bgSoft: '#cffafe',
    description: 'Bangun datar segi empat dengan dua pasang sisi berhadapan yang sejajar dan sama panjang, serta sudut berhadapan sama besar.',
    properties: [
      'Memiliki 4 sisi (2 pasang sejajar dan sama panjang)',
      'Sudut yang berhadapan berukuran sama besar',
      'Tidak memiliki sumbu simetri lipat',
      'Dua sudut yang berdekatan berjumlah 180°'
    ],
    formula: {
      perimeter: 'K = 2 × (alas + sisi miring)',
      area: 'L = alas × tinggi'
    },
    examples: [
      { name: 'Motif Kain Batik', emoji: '🎨' },
      { name: 'Penghapus Miring', emoji: '✏️' },
      { name: 'Tangga Eskalator', emoji: '🪜' }
    ],
    funFact: 'Jika kamu memiringkan persegi panjang perlahan-lahan ke samping, bentuknya akan berubah menjadi jajar genjang!'
  },
  {
    id: 'belah-ketupat',
    name: 'Belah Ketupat',
    alias: 'Rhombus',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#ec4899',
    bgSoft: '#fce7f3',
    description: 'Bangun datar segi empat yang keempat sisinya sama panjang, sudut berhadapan sama besar, dan diagonalnya saling membagi tegak lurus.',
    properties: [
      'Memiliki 4 sisi yang semuanya sama panjang',
      'Sudut-sudut yang berhadapan sama besar',
      'Kedua diagonalnya berpotongan tegak lurus (90°)',
      'Memiliki 2 sumbu simetri lipat'
    ],
    formula: {
      perimeter: 'K = 4 × sisi',
      area: 'L = ½ × d₁ × d₂'
    },
    examples: [
      { name: 'Ketupat Lebaran', emoji: '🎋' },
      { name: 'Lambang Berlian/Intan', emoji: '💎' },
      { name: 'Rambu Peringatan', emoji: '🔶' }
    ],
    funFact: 'Nama bangun datar ini di Indonesia terinspirasi dari kuliner tradisional anyaman janur: Ketupat!'
  },
  {
    id: 'layang-layang',
    name: 'Layang-layang',
    alias: 'Kite',
    category: 'Segibanyak',
    sides: 4,
    vertices: 4,
    color: '#f97316',
    bgSoft: '#ffedd5',
    description: 'Bangun datar segi empat yang dibentuk oleh dua pasang sisi sama panjang yang saling berdekatan.',
    properties: [
      'Memiliki 2 pasang sisi berdekatan sama panjang',
      'Memiliki sepasang sudut berhadapan yang sama besar',
      'Memiliki 1 sumbu simetri lipat',
      'Kedua diagonal saling tegak lurus'
    ],
    formula: {
      perimeter: 'K = 2 × (sisi pendek + sisi panjang)',
      area: 'L = ½ × d₁ × d₂'
    },
    examples: [
      { name: 'Layangan Terbang', emoji: '🪁' },
      { name: 'Mata Panah', emoji: '🏹' },
      { name: 'Anting Kristal', emoji: '✨' }
    ],
    funFact: 'Bentuk layang-layang dirancang aerodinamis agar hembusan angin bisa mengangkatnya tinggi terbang di angkasa!'
  }
]
