import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const LORA_BASE = 'https://lora.algokit.io/testnet'
const STORAGE_KEY = 'tokenize_assets'

interface CreatedAsset {
  assetId: string
  assetName: string
  unitName: string
  total: string
  decimals: string
  url?: string
  manager?: string
  reserve?: string
  freeze?: string
  clawback?: string
  createdAt: string
}

function loadAssets(): CreatedAsset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CreatedAsset[]) : []
  } catch {
    return []
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function isNFT(asset: CreatedAsset) {
  return asset.total === '1' && asset.decimals === '0'
}

export default function PortfolioPage() {
  const assets = useMemo(() => loadAssets(), [])

  const totalAssets = assets.length
  const nftCount = assets.filter(isNFT).length
  const asaCount = totalAssets - nftCount
  const totalSupply = assets.reduce((sum, a) => sum + Number(a.total), 0)

  return (
    <div className="min-h-screen py-12" style={{ color: '#e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <div
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}
          >
            Your Portfolio
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Asset Dashboard</h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            All your minted ASAs and NFTs in one place.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Assets', val: totalAssets, icon: '📦', color: '#00ffd5' },
            { label: 'NFTs', val: nftCount, icon: '🖼️', color: '#a855f7' },
            { label: 'ASAs', val: asaCount, icon: '🪙', color: '#3b82f6' },
            { label: 'Total Supply', val: totalSupply.toLocaleString(), icon: '📊', color: '#ec4899' },
          ].map(({ label, val, icon, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}50`
                e.currentTarget.style.boxShadow = `0 0 20px ${color}15`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-2xl font-black" style={{ color }}>{val}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Assets Grid or Empty State */}
        {assets.length === 0 ? (
          <div
            className="rounded-3xl p-16 text-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          >
            <div className="text-6xl mb-4">🪙</div>
            <h3 className="text-xl font-bold text-white mb-2">No assets yet</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Create your first ASA or mint an NFT to see it here.
            </p>
            <Link
              to="/tokenize"
              id="portfolio-create-first"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #00ffd5, #06b6d4)',
                color: '#070b14',
                boxShadow: '0 0 20px rgba(0,255,213,0.3)',
              }}
            >
              🚀 Create First Asset
            </Link>
          </div>
        ) : (
          <>
            {/* Section title */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                Mint History
                <span
                  className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(0,255,213,0.1)', color: '#00ffd5' }}
                >
                  {totalAssets}
                </span>
              </h2>
              <Link
                to="/tokenize"
                id="portfolio-add-more"
                className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: 'rgba(0,255,213,0.08)',
                  border: '1px solid rgba(0,255,213,0.25)',
                  color: '#00ffd5',
                }}
              >
                + Mint More
              </Link>
            </div>

            {/* Asset cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {assets.map((asset, idx) => {
                const nft = isNFT(asset)
                const color = nft ? '#a855f7' : '#00ffd5'
                const glow = nft ? 'rgba(168,85,247,0.2)' : 'rgba(0,255,213,0.2)'

                return (
                  <div
                    key={asset.assetId + idx}
                    id={`asset-card-${asset.assetId}`}
                    className="group rounded-2xl p-5 transition-all duration-300 cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(16px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${color}40`
                      e.currentTarget.style.boxShadow = `0 0 30px ${glow}`
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{
                          background: `${color}15`,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {nft ? '🖼️' : '🪙'}
                      </div>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: `${color}10`,
                          border: `1px solid ${color}30`,
                          color,
                        }}
                      >
                        {nft ? 'NFT' : 'ASA'}
                      </span>
                    </div>

                    {/* Asset Name */}
                    <h3 className="text-base font-bold text-white truncate mb-0.5" title={asset.assetName}>
                      {asset.assetName}
                    </h3>
                    <p className="text-xs mb-4" style={{ color }}>
                      {asset.unitName}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Asset ID</span>
                        <span className="font-mono font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>
                          {asset.assetId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Supply</span>
                        <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>
                          {Number(asset.total).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Created</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {formatDate(asset.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Footer with Lora link */}
                    <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <a
                        href={`${LORA_BASE}/asset/${asset.assetId}`}
                        target="_blank"
                        rel="noreferrer"
                        id={`lora-link-${asset.assetId}`}
                        className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
                        style={{ color: color }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                      >
                        View on Lora ↗
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Timeline section */}
            <div className="mt-14">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span>📅</span> Activity Timeline
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-5 top-0 bottom-0 w-px"
                  style={{ background: 'linear-gradient(180deg, rgba(0,255,213,0.4) 0%, rgba(168,85,247,0.4) 100%)' }}
                />
                <div className="space-y-4 pl-14">
                  {assets.map((asset, idx) => {
                    const nft = isNFT(asset)
                    const color = nft ? '#a855f7' : '#00ffd5'
                    return (
                      <div
                        key={asset.assetId + 'tl' + idx}
                        className="relative rounded-xl p-4 transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {/* dot */}
                        <div
                          className="absolute -left-9 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
                          style={{
                            background: color,
                            borderColor: '#070b14',
                            boxShadow: `0 0 8px ${color}`,
                          }}
                        />
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-base">{nft ? '🖼️' : '🪙'}</span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{asset.assetName}</p>
                              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {nft ? 'NFT minted' : 'ASA created'} · ID {asset.assetId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                              {formatDate(asset.createdAt)}
                            </p>
                            <a
                              href={`${LORA_BASE}/asset/${asset.assetId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold"
                              style={{ color }}
                            >
                              Lora ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
