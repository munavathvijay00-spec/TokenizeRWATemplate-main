import { useCallback, useEffect, useRef } from 'react'

export interface MintedAssetInfo {
  assetId: string
  assetName: string
  unitName: string
  total: string
  isNft?: boolean
  metadataUrl?: string
}

interface Props {
  asset: MintedAssetInfo | null
  onClose: () => void
}

const LORA_BASE = 'https://lora.algokit.io/testnet'

const CONFETTI_COLORS = [
  '#00ffd5', '#a855f7', '#3b82f6', '#ec4899', '#f59e0b',
  '#10b981', '#f97316', '#e2e8f0', '#fff',
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function spawnConfetti(container: HTMLDivElement) {
  const count = 80
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    const size = lerp(6, 14, Math.random())
    const delay = Math.random() * 0.8
    const duration = lerp(2.2, 3.8, Math.random())
    const startX = lerp(10, 90, Math.random())
    const isRect = Math.random() > 0.5
    const rotation = Math.random() * 360

    el.style.cssText = `
      position: fixed;
      left: ${startX}vw;
      top: -${size * 2}px;
      width: ${isRect ? size : size / 2}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${isRect ? '3px' : '50%'};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transform: rotate(${rotation}deg);
      animation: confetti-fall ${duration}s ease-in ${delay}s forwards;
    `
    container.appendChild(el)
    // remove after animation
    setTimeout(() => el.remove(), (delay + duration + 0.2) * 1000)
  }
}

export default function MintSuccessModal({ asset, onClose }: Props) {
  const confettiRef = useRef<HTMLDivElement>(null)
  const copiedRef = useRef(false)

  const handleClose = useCallback(() => {
    copiedRef.current = false
    onClose()
  }, [onClose])

  useEffect(() => {
    if (asset && confettiRef.current) {
      spawnConfetti(confettiRef.current)
    }
  }, [asset])

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClose])

  if (!asset) return null

  const loraUrl = `${LORA_BASE}/asset/${asset.assetId}`
  const tweetText = encodeURIComponent(
    `🚀 Just ${asset.isNft ? 'minted an NFT' : 'tokenized a real-world asset'} on @Algorand!\n\n` +
    `📦 Asset: ${asset.assetName} (${asset.unitName})\n` +
    `🆔 ID: ${asset.assetId}\n` +
    `📊 Supply: ${Number(asset.total).toLocaleString()} tokens\n\n` +
    `Built with #TokenizeRWA 🔗`
  )
  const twitterUrl = `https://x.com/intent/tweet?text=${tweetText}`

  function copyAssetId() {
    navigator.clipboard.writeText(asset!.assetId).catch(() => {})
    copiedRef.current = true
    const btn = document.getElementById('copy-asset-id-btn')
    if (btn) {
      btn.textContent = '✅ Copied!'
      setTimeout(() => {
        if (btn) btn.textContent = '📋 Copy Asset ID'
      }, 2000)
    }
  }

  return (
    <>
      {/* Confetti container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-[9998]" />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
        onClick={handleClose}
      >
        {/* Modal card */}
        <div
          className="relative w-full max-w-md animate-scale-in"
          style={{
            background: 'linear-gradient(135deg, rgba(13,20,36,0.98) 0%, rgba(20,10,35,0.98) 100%)',
            border: '1px solid rgba(0,255,213,0.3)',
            borderRadius: '24px',
            boxShadow: '0 0 60px rgba(0,255,213,0.2), 0 0 120px rgba(168,85,247,0.1), 0 32px 64px rgba(0,0,0,0.8)',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top glow bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #00ffd5, #a855f7, #3b82f6)',
            }}
          />

          {/* Inner glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '160px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,213,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative p-8">
            {/* Close button */}
            <button
              id="mint-success-close"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              }}
            >
              ✕
            </button>

            {/* Success icon */}
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 text-4xl animate-float"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,213,0.15), rgba(168,85,247,0.15))',
                  border: '1px solid rgba(0,255,213,0.3)',
                  boxShadow: '0 0 30px rgba(0,255,213,0.25)',
                }}
              >
                {asset.isNft ? '🖼️' : '🪙'}
              </div>
              <div
                className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2"
                style={{
                  background: 'rgba(0,255,213,0.1)',
                  border: '1px solid rgba(0,255,213,0.3)',
                  color: '#00ffd5',
                }}
              >
                {asset.isNft ? 'NFT Minted' : 'ASA Created'} Successfully!
              </div>
              <h2 className="text-2xl font-black text-white mt-2">{asset.assetName}</h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Unit: <span style={{ color: '#a855f7' }}>{asset.unitName}</span>
              </p>
            </div>

            {/* Asset details */}
            <div
              className="rounded-2xl p-4 mb-6 space-y-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[
                { label: 'Asset ID', val: asset.assetId, highlight: true },
                { label: 'Supply', val: Number(asset.total).toLocaleString() + ' tokens', highlight: false },
                { label: 'Network', val: 'Algorand TestNet', highlight: false },
              ].map(({ label, val, highlight }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: highlight ? '#00ffd5' : 'rgba(255,255,255,0.85)' }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="copy-asset-id-btn"
                  onClick={copyAssetId}
                  className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(0,255,213,0.08)',
                    border: '1px solid rgba(0,255,213,0.3)',
                    color: '#00ffd5',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,213,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,213,0.08)'
                  }}
                >
                  📋 Copy Asset ID
                </button>
                <a
                  href={loraUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="view-on-lora-btn"
                  className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(168,85,247,0.08)',
                    border: '1px solid rgba(168,85,247,0.3)',
                    color: '#a855f7',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.08)'
                  }}
                >
                  🔍 View on Lora
                </a>
              </div>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noreferrer"
                id="share-on-twitter-btn"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.85), rgba(20,20,30,0.95))',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
