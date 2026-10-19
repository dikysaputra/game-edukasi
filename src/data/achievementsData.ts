export interface AchievementItem {
  id: string
  title: string
  description: string
  icon: string
  rewardType: 'stars' | 'gems'
  rewardAmount: number
  unlocked: boolean
  claimed: boolean
  progress: number
  maxProgress: number
}

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Penjelajah Pemula',
    description: 'Selesaikan tantangan kuis bangun datar pertamamu',
    icon: '🏆',
    rewardType: 'stars',
    rewardAmount: 25,
    unlocked: true,
    claimed: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'ach-2',
    title: 'Kolektor Bintang Cilik',
    description: 'Kumpulkan total 100 bintang petualangan',
    icon: '⭐',
    rewardType: 'gems',
    rewardAmount: 20,
    unlocked: true,
    claimed: false,
    progress: 120,
    maxProgress: 100
  },
  {
    id: 'ach-3',
    title: 'Pakar Segitiga & Lingkaran',
    description: 'Pelajari seluruh materi bangun datar di Buku Bentuk',
    icon: '📖',
    rewardType: 'stars',
    rewardAmount: 50,
    unlocked: false,
    claimed: false,
    progress: 4,
    maxProgress: 8
  },
  {
    id: 'ach-4',
    title: 'Penguasa Benteng',
    description: 'Selesaikan Level 3 tanpa kehilangan nyawa',
    icon: '🏰',
    rewardType: 'gems',
    rewardAmount: 30,
    unlocked: false,
    claimed: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach-5',
    title: 'Sultan Permata',
    description: 'Miliki 50 permata berkilau',
    icon: '💎',
    rewardType: 'stars',
    rewardAmount: 100,
    unlocked: false,
    claimed: false,
    progress: 45,
    maxProgress: 50
  },
  {
    id: 'ach-6',
    title: 'Bintang Kejora',
    description: 'Raih 3 bintang emas di semua level petualangan',
    icon: '🌟',
    rewardType: 'gems',
    rewardAmount: 50,
    unlocked: false,
    claimed: false,
    progress: 1,
    maxProgress: 5
  }
]
