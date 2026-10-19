import React, { useState } from 'react'
import { sounds } from '../utils/sound'
import { shapesList, type ShapeItem } from '../data/shapesData'

interface MateriViewProps {
  stars: number
  gems: number
  onBackToHome: () => void
}

export const MateriView: React.FC<MateriViewProps> = ({ stars, gems, onBackToHome }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(shapesList[0])
  const [filterCategory, setFilterCategory] = useState<'Semua' | 'Segibanyak' | 'Lengkung'>('Semua')

  const filteredShapes = shapesList.filter((s) => {
    if (filterCategory === 'Semua') return true
    return s.category === filterCategory
  })

  // Render SVG representation for each shape
  const renderShapeSvg = (shape: ShapeItem) => {
    switch (shape.id) {
      case 'segitiga':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <polygon points="50,15 88,85 12,85" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
            <circle cx="50" cy="15" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="88" cy="85" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="12" cy="85" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          </svg>
        )
      case 'persegi':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <rect x="20" y="20" width="60" height="60" rx="4" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
            <circle cx="20" cy="20" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="80" cy="20" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="80" cy="80" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="20" cy="80" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          </svg>
        )
      case 'persegi-panjang':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <rect x="12" y="28" width="76" height="44" rx="4" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
            <circle cx="12" cy="28" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="88" cy="28" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="88" cy="72" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="12" cy="72" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          </svg>
        )
      case 'lingkaran':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <circle cx="50" cy="50" r="38" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
            <circle cx="50" cy="50" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <line x1="50" y1="50" x2="88" y2="50" stroke="#ffffff" strokeWidth="3" strokeDasharray="4,2" />
          </svg>
        )
      case 'trapesium':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <polygon points="30,25 70,25 88,75 12,75" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
            <circle cx="30" cy="25" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="70" cy="25" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="88" cy="75" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="12" cy="75" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          </svg>
        )
      case 'jajar-genjang':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <polygon points="32,25 88,25 68,75 12,75" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
          </svg>
        )
      case 'belah-ketupat':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <polygon points="50,15 85,50 50,85 15,50" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
          </svg>
        )
      case 'layang-layang':
        return (
          <svg viewBox="0 0 100 100" className="shape-svg-interactive">
            <polygon points="50,12 82,42 50,88 18,42" fill={shape.color} stroke="#1e293b" strokeWidth="4" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="sub-view-screen materi-screen">
      {/* Header Bar */}
      <div className="sub-view-header">
        <button
          type="button"
          className="sub-back-btn"
          onClick={() => { sounds.playClick(); onBackToHome(); }}
          aria-label="Kembali ke Beranda"
        >
          ← Beranda
        </button>
        <h2 className="sub-view-title">📖 Buku Bangun Datar</h2>
        <div className="sub-header-currencies">
          <span className="sub-pill">⭐ {stars}</span>
          <span className="sub-pill">💎 {gems}</span>
        </div>
      </div>

      <div className="materi-content-scroll">
        {/* Category Pills */}
        <div className="materi-category-tabs">
          {(['Semua', 'Segibanyak', 'Lengkung'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`materi-cat-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilterCategory(cat); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Shape Horizontal Selector */}
        <div className="shapes-horizontal-chips">
          {filteredShapes.map((shape) => {
            const isSelected = selectedShape.id === shape.id
            return (
              <button
                key={shape.id}
                type="button"
                className={`shape-chip-btn ${isSelected ? 'selected' : ''}`}
                style={{ borderColor: isSelected ? shape.color : undefined }}
                onClick={() => { sounds.playClick(); setSelectedShape(shape); }}
              >
                <span className="shape-chip-dot" style={{ backgroundColor: shape.color }} />
                <span>{shape.name}</span>
              </button>
            )
          })}
        </div>

        {/* Featured Shape Spotlight Card */}
        <div className="shape-spotlight-card" style={{ borderColor: selectedShape.color }}>
          <div className="spotlight-visual-area" style={{ backgroundColor: selectedShape.bgSoft }}>
            {renderShapeSvg(selectedShape)}
            <div className="shape-meta-tags">
              <span className="tag-pill">{selectedShape.sides} Sisi</span>
              <span className="tag-pill">{selectedShape.vertices} Titik Sudut</span>
            </div>
          </div>

          <div className="spotlight-details">
            <div className="spotlight-header">
              <h3>{selectedShape.name}</h3>
              <span className="spotlight-alias">{selectedShape.alias}</span>
            </div>

            <p className="spotlight-desc">{selectedShape.description}</p>

            {/* Properties List */}
            <div className="spotlight-section">
              <h4>🔍 Ciri-ciri & Sifat Utama:</h4>
              <ul className="properties-checklist">
                {selectedShape.properties.map((prop, idx) => (
                  <li key={idx}>
                    <span className="check-bullet">✓</span>
                    <span>{prop}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulas Card */}
            <div className="formula-box">
              <div className="formula-item">
                <span className="formula-label">Keliling</span>
                <strong>{selectedShape.formula.perimeter}</strong>
              </div>
              <div className="formula-divider" />
              <div className="formula-item">
                <span className="formula-label">Luas</span>
                <strong>{selectedShape.formula.area}</strong>
              </div>
            </div>

            {/* Real World Examples */}
            <div className="spotlight-section">
              <h4>🌍 Benda di Sekitar Kita:</h4>
              <div className="examples-grid">
                {selectedShape.examples.map((ex, idx) => (
                  <div key={idx} className="example-item-pill">
                    <span className="ex-emoji">{ex.emoji}</span>
                    <span className="ex-name">{ex.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="fun-fact-card">
              <span className="fun-icon">💡</span>
              <div className="fun-copy">
                <strong>Tahukah Kamu?</strong>
                <p>{selectedShape.funFact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
