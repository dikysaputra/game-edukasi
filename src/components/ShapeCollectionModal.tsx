import React, { useState } from 'react'
import { sounds } from '../utils/sound'
import { initialShapeCollection, type ShapeCollectionItem } from '../data/shapeCollectionData'

interface ShapeCollectionModalProps {
  onClose: () => void
}

export const ShapeCollectionModal: React.FC<ShapeCollectionModalProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<ShapeCollectionItem | null>(initialShapeCollection[0])
  const [filterIsland, setFilterIsland] = useState<string>('Semua')

  const islands = ['Semua', 'Pulau Bentuk', 'Hutan Segi Empat', 'Pegunungan Segitiga', 'Danau Lingkaran', 'Kastil Geometri']

  const filtered = initialShapeCollection.filter((item) => {
    if (filterIsland === 'Semua') return true
    return item.island === filterIsland
  })

  const unlockedCount = initialShapeCollection.filter((i) => i.unlocked).length

  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet shape-collection-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-title-icon">🧰</span>
            <div>
              <h3>Koleksi Bentuk Petualang</h3>
              <span className="modal-sub-label">Temukan artefak bentuk di setiap level</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-x"
            onClick={() => { sounds.playClick(); onClose(); }}
          >
            ✕
          </button>
        </div>

        {/* Collection Progress Card */}
        <div className="collection-progress-banner">
          <div className="banner-chest-icon">🎁</div>
          <div className="banner-info">
            <div className="banner-stats">
              <strong>Koleksi Terbuka</strong>
              <span className="banner-ratio">{unlockedCount} / {initialShapeCollection.length}</span>
            </div>
            <div className="collection-bar-track">
              <div
                className="collection-bar-fill"
                style={{ width: `${(unlockedCount / initialShapeCollection.length) * 100}%` }}
              />
            </div>
            <span className="banner-hint">Selesaikan level-level baru untuk membuka semua artefak!</span>
          </div>
        </div>

        {/* Island Category Pills */}
        <div className="collection-filter-tabs">
          {islands.map((isl) => (
            <button
              key={isl}
              type="button"
              className={`collection-filter-chip ${filterIsland === isl ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilterIsland(isl); }}
            >
              {isl}
            </button>
          ))}
        </div>

        {/* Selected Item Spotlight (if any) */}
        {selectedItem && (
          <div className="collection-spotlight" style={{ borderColor: selectedItem.unlocked ? selectedItem.color : '#cbd5e1' }}>
            <div className="spotlight-avatar" style={{ backgroundColor: selectedItem.unlocked ? `${selectedItem.color}22` : '#f1f5f9' }}>
              <span className="spotlight-emoji">{selectedItem.unlocked ? selectedItem.icon : '🔒'}</span>
            </div>
            <div className="spotlight-body">
              <div className="spotlight-title-row">
                <h4>{selectedItem.unlocked ? selectedItem.name : 'Artefak Terkunci'}</h4>
                <span className={`rarity-tag ${selectedItem.rarity.toLowerCase()}`}>{selectedItem.rarity}</span>
              </div>
              <span className="spotlight-island">📍 {selectedItem.island}</span>
              <p className="spotlight-desc">
                {selectedItem.unlocked
                  ? selectedItem.description
                  : `Taklukkan tantangan di ${selectedItem.island} untuk mengungkap rahasia bangun datar ini.`}
              </p>
              {selectedItem.unlocked && (
                <div className="spotlight-fact">
                  <strong>💡 Fakta Menarik:</strong> {selectedItem.funFact}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grid of 24 Collectibles */}
        <div className="collection-items-grid">
          {filtered.map((item) => {
            const isSelected = selectedItem?.id === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`collection-grid-card ${item.unlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  if (item.unlocked) sounds.playStarCoin()
                  else sounds.playClick()
                  setSelectedItem(item)
                }}
              >
                <div className="grid-card-icon" style={{ backgroundColor: item.unlocked ? `${item.color}25` : '#e2e8f0' }}>
                  {item.unlocked ? item.icon : '🔒'}
                </div>
                <span className="grid-card-number">#{item.number}</span>
                <span className="grid-card-name">{item.unlocked ? item.name : '???'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
