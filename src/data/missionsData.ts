export interface MissionItem {
  id: string
  title: string
  description: string
  progress: number
  target: number
  rewardType: 'stars' | 'gems'
  rewardAmount: number
  claimed: boolean
  icon: string
}

export const initialMissions: MissionItem[] = [
  {
    id: 'm1',
    title: 'Misi Hari Ini',
    description: 'Selesaikan 3 level dengan nilai sempurna',
    progress: 1,
    target: 3,
    rewardType: 'stars',
    rewardAmount: 30,
    claimed: false,
    icon: '📋'
  },
  {
    id: 'm2',
    title: 'Pembaca Rajin',
    description: 'Buka dan pelajari 3 bangun datar di Materi',
    progress: 2,
    target: 3,
    rewardType: 'stars',
    rewardAmount: 20,
    claimed: false,
    icon: '📖'
  },
  {
    id: 'm3',
    title: 'Kolektor Bintang',
    description: 'Dapatkan 30 bintang dari kuis',
    progress: 20,
    target: 30,
    rewardType: 'gems',
    rewardAmount: 10,
    claimed: false,
    icon: '⭐'
  },
  {
    id: 'm4',
    title: 'Penjelajah Sempurna',
    description: 'Jawab 5 soal berturut-turut tanpa salah',
    progress: 3,
    target: 5,
    rewardType: 'gems',
    rewardAmount: 15,
    claimed: false,
    icon: '🎯'
  }
]
