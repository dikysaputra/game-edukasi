export interface ShapeCollectionItem {
  id: string
  number: number
  name: string
  island: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  icon: string
  color: string
  unlocked: boolean
  description: string
  funFact: string
}

export const initialShapeCollection: ShapeCollectionItem[] = [
  {
    id: 'c1',
    number: 1,
    name: 'Segitiga Emas',
    island: 'Pulau Bentuk',
    rarity: 'Common',
    icon: '🔺',
    color: '#eab308',
    unlocked: true,
    description: 'Batu kristal berbentuk segitiga sama sisi yang memancarkan cahaya hangat.',
    funFact: 'Memiliki 3 sisi sama panjang dan masing-masing sudutnya 60°.'
  },
  {
    id: 'c2',
    number: 2,
    name: 'Persegi Safir',
    island: 'Pulau Bentuk',
    rarity: 'Common',
    icon: '🟦',
    color: '#3b82f6',
    unlocked: true,
    description: 'Kubus safir dengan empat sisi simetris yang sangat seimbang.',
    funFact: 'Semua sudutnya tepat 90° dan kedua diagonalnya saling memotong tegak lurus.'
  },
  {
    id: 'c3',
    number: 3,
    name: 'Lingkaran Ruby',
    island: 'Pulau Bentuk',
    rarity: 'Common',
    icon: '⭕',
    color: '#ef4444',
    unlocked: true,
    description: 'Piringan merah bundar sempurna tanpa sudut sedikit pun.',
    funFact: 'Semua titik di tepinya berjarak sama persis ke pusat lingkaran (jari-jari r).'
  },
  {
    id: 'c4',
    number: 4,
    name: 'Persegi Panjang Giok',
    island: 'Hutan Segi Empat',
    rarity: 'Common',
    icon: '📗',
    color: '#10b981',
    unlocked: true,
    description: 'Batu giok hijau dengan dua pasang sisi sejajar yang anggun.',
    funFact: 'Bentuk paling banyak digunakan untuk pintu, meja, dan layar smartphone.'
  },
  {
    id: 'c5',
    number: 5,
    name: 'Trapesium Ametis',
    island: 'Hutan Segi Empat',
    rarity: 'Rare',
    icon: '⛵',
    color: '#8b5cf6',
    unlocked: true,
    description: 'Kristal ungu dengan sepasang sisi sejajar berbentuk mirip perahu laut.',
    funFact: 'Sering dipakai dalam arsitektur atap rumah adat di nusantara.'
  },
  {
    id: 'c6',
    number: 6,
    name: 'Jajar Genjang Zamrud',
    island: 'Hutan Segi Empat',
    rarity: 'Rare',
    icon: '💠',
    color: '#06b6d4',
    unlocked: true,
    description: 'Permata zamrud dengan sudut miring berhadapan yang sama besar.',
    funFact: 'Luasnya dapat dihitung sederhana dengan rumus alas dikalikan tinggi.'
  },
  {
    id: 'c7',
    number: 7,
    name: 'Belah Ketupat Berlian',
    island: 'Hutan Segi Empat',
    rarity: 'Rare',
    icon: '💎',
    color: '#ec4899',
    unlocked: true,
    description: 'Berlian berkilauan dengan empat sisi yang sama panjang.',
    funFact: 'Terinspirasi dari motif anyaman daun kelapa khas hari raya Idul Fitri.'
  },
  {
    id: 'c8',
    number: 8,
    name: 'Layang-layang Topaz',
    island: 'Pegunungan Segitiga',
    rarity: 'Rare',
    icon: '🪁',
    color: '#f97316',
    unlocked: true,
    description: 'Batu topaz oranye dengan bentuk aerodinamis yang suka terbang tinggi.',
    funFact: 'Memiliki sepasang sudut berhadapan yang sama besar.'
  },
  {
    id: 'c9',
    number: 9,
    name: 'Segitiga Siku-siku',
    island: 'Pegunungan Segitiga',
    rarity: 'Rare',
    icon: '📐',
    color: '#f59e0b',
    unlocked: false,
    description: 'Segitiga legendaris dengan satu sudut siku-siku 90° pelindung Pythagoras.',
    funFact: 'Berlaku rumus a² + b² = c² untuk menghitung sisi miringnya!'
  },
  {
    id: 'c10',
    number: 10,
    name: 'Segitiga Sama Kaki',
    island: 'Pegunungan Segitiga',
    rarity: 'Common',
    icon: '⛺',
    color: '#eab308',
    unlocked: false,
    description: 'Segitiga dengan dua sisi kembar yang kokoh seperti tenda petualang.',
    funFact: 'Kedua sudut di bagian alasnya memiliki ukuran yang sama persis.'
  },
  {
    id: 'c11',
    number: 11,
    name: 'Segilima Mutiara',
    island: 'Danau Lingkaran',
    rarity: 'Epic',
    icon: '⭐',
    color: '#a855f7',
    unlocked: false,
    description: 'Mutiara Pentagon berpenampang lima sisi teratur yang mistis.',
    funFact: 'Jumlah total seluruh sudut dalam segilima beraturan adalah 540°.'
  },
  {
    id: 'c12',
    number: 12,
    name: 'Segienam Sarang Lebah',
    island: 'Danau Lingkaran',
    rarity: 'Epic',
    icon: '🛑',
    color: '#f43f5e',
    unlocked: false,
    description: 'Heksagon alami yang sangat efisien menampung madu lebah hutan.',
    funFact: 'Struktur sarang lebah memakai heksagon karena paling hemat ruang dan bahan.'
  },
  {
    id: 'c13',
    number: 13,
    name: 'Cincin Lingkaran Luar',
    island: 'Danau Lingkaran',
    rarity: 'Epic',
    icon: '🍩',
    color: '#c084fc',
    unlocked: false,
    description: 'Cincin donat raksasa berwarna ungu yang mengambang di Danau Lingkaran.',
    funFact: 'Luas cincin dihitung dari selisih luas lingkaran besar dan lingkaran kecil.'
  },
  {
    id: 'c14',
    number: 14,
    name: 'Busur Derajat Kristal',
    island: 'Danau Lingkaran',
    rarity: 'Rare',
    icon: '📏',
    color: '#38bdf8',
    unlocked: false,
    description: 'Busur setengah lingkaran yang mampu mengukur sudut hingga 180°.',
    funFact: 'Setengah lingkaran memiliki sudut pusat tepat 180 derajat.'
  },
  {
    id: 'c15',
    number: 15,
    name: 'Kubah Menara Geometri',
    island: 'Kastil Geometri',
    rarity: 'Epic',
    icon: '🕌',
    color: '#eab308',
    unlocked: false,
    description: 'Kubah setengah bola emas yang menghiasi menara puncak kastil.',
    funFact: 'Kubah merupakan bentuk revolusi dari lingkaran penuh.'
  },
  {
    id: 'c16',
    number: 16,
    name: 'Mahkota Poligon Agung',
    island: 'Kastil Geometri',
    rarity: 'Legendary',
    icon: '👑',
    color: '#fbbf24',
    unlocked: false,
    description: 'Mahkota raja matematika berhiaskan gabungan bangun datar terlengkap.',
    funFact: 'Hanya bisa dipakai oleh penjelajah yang berhasil menuntaskan semua level.'
  },
  {
    id: 'c17',
    number: 17,
    name: 'Gerbang Bentuk Rahasia',
    island: 'Kastil Geometri',
    rarity: 'Legendary',
    icon: '🏰',
    color: '#f97316',
    unlocked: false,
    description: 'Kunci pembuka ruang harta karun di bawah tanah Kastil Geometri.',
    funFact: 'Pintu gerbangnya tersusun dari kombinasi persegi, segitiga, dan setengah lingkaran.'
  },
  {
    id: 'c18',
    number: 18,
    name: 'Segidelapan Perisai',
    island: 'Kastil Geometri',
    rarity: 'Epic',
    icon: '🛡️',
    color: '#6366f1',
    unlocked: false,
    description: 'Oktagon perisai pelindung yang sering digunakan untuk rambu STOP internasional.',
    funFact: 'Total sudut dalam segidelapan beraturan adalah 1080°.'
  },
  {
    id: 'c19',
    number: 19,
    name: 'Bintang Emas Kejora',
    island: 'Pulau Bentuk',
    rarity: 'Rare',
    icon: '🌟',
    color: '#facc15',
    unlocked: false,
    description: 'Bintang bersudut lima yang bersinar terang memandu di malam hari.',
    funFact: 'Bintang lima memiliki rasio proporsi emas (Golden Ratio) di dalamnya!'
  },
  {
    id: 'c20',
    number: 20,
    name: 'Komet Oval',
    island: 'Danau Lingkaran',
    rarity: 'Rare',
    icon: '🥚',
    color: '#67e8f9',
    unlocked: false,
    description: 'Bentuk elips yang menyerupai orbit planet mengelilingi matahari.',
    funFact: 'Orbit bumi dan planet mengelilingi matahari berbentuk elips, bukan lingkaran murni.'
  },
  {
    id: 'c21',
    number: 21,
    name: 'Prisma Pelangi',
    island: 'Pegunungan Segitiga',
    rarity: 'Legendary',
    icon: '🌈',
    color: '#ec4899',
    unlocked: false,
    description: 'Prisma segitiga kaca yang membiaskan cahaya putih menjadi pelangi 7 warna.',
    funFact: 'Ditemukan oleh Sir Isaac Newton saat meneliti sifat cahaya dan warna.'
  },
  {
    id: 'c22',
    number: 22,
    name: 'Piramida Emas Mini',
    island: 'Pegunungan Segitiga',
    rarity: 'Legendary',
    icon: '🏛️',
    color: '#ca8a04',
    unlocked: false,
    description: 'Miniatur piramida dengan 4 sisi segitiga dan alas persegi.',
    funFact: 'Piramida adalah gabungan bangun datar segitiga yang membentuk bangun ruang megah.'
  },
  {
    id: 'c23',
    number: 23,
    name: 'Jantung Geometri',
    island: 'Kastil Geometri',
    rarity: 'Legendary',
    icon: '💖',
    color: '#f43f5e',
    unlocked: false,
    description: 'Artefak berbentuk hati yang dibentuk dari satu persegi dan dua setengah lingkaran.',
    funFact: 'Bentuk hati matematis bisa digambar dengan menggabungkan persegi dan dua kubah lingkaran!'
  },
  {
    id: 'c24',
    number: 24,
    name: 'Piala Master Geometri',
    island: 'Kastil Geometri',
    rarity: 'Legendary',
    icon: '🏆',
    color: '#f59e0b',
    unlocked: false,
    description: 'Penghargaan tertinggi bagi penjelajah yang berhasil menguasai seluruh dunia bangun datar.',
    funFact: 'Menandakan kamu telah menjadi Master Geometri sejati!'
  }
]
