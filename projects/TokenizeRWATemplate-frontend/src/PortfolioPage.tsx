import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const LORA_BASE = 'https://lora.algokit.io/testnet'
const STORAGE_KEY = 'tokenize_assets'

interface CreatedAsset {
  assetId: string
  assetName: string
  unitName: string
  total: string
  decimals: string
  createdAt: string
}

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 8500 },
  { name: 'May', value: 7200 },
  { name: 'Jun', value: 12500 },
]

function loadAssets(): CreatedAsset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CreatedAsset[]) : []
  } catch {
    return []
  }
}

function isNFT(asset: CreatedAsset) {
  return asset.total === '1' && asset.decimals === '0'
}

export default function PortfolioPage() {
  const assets = useMemo(() => loadAssets(), [])
  
  // Mock Yield Claim State (Phase 3 Prep)
  const [hasClaimed, setHasClaimed] = useState(false)
  const availableYield = 1250.50

  const totalAssets = assets.length
  const nftCount = assets.filter(isNFT).length
  const totalValue = 12500 // Mock value

  const handleClaim = () => {
    setHasClaimed(true)
    // Here we will eventually trigger confetti animation
  }

  return (
    <div className="min-h-screen py-12" style={{ color: '#e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- PAGE HEADER --- */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div
              className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(0,255,213,0.1)', border: '1px solid rgba(0,255,213,0.3)', color: '#00ffd5' }}
            >
              Investor Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Portfolio</h1>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Total Portfolio Value</p>
            <div className="text-4xl font-black" style={{ color: '#00ffd5' }}>
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-emerald-400 font-bold mt-1">+14.5% All Time</div>
          </div>
        </div>

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Chart Section (Spans 2 cols) */}
          <div className="lg:col-span-2 rounded-3xl p-6 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}>
            <h2 className="text-xl font-bold text-white mb-6">Performance</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffd5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ffd5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(7, 11, 20, 0.9)', border: '1px solid rgba(0,255,213,0.3)', borderRadius: '12px' }}
                    itemStyle={{ color: '#00ffd5', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00ffd5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yield Dashboard (Right Col) */}
          <div className="rounded-3xl p-8 relative flex flex-col justify-between"
             style={{
               background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)',
               border: '1px solid rgba(168,85,247,0.3)',
               boxShadow: '0 0 40px rgba(168,85,247,0.1) inset'
             }}>
             <div>
                <div className="flex items-center gap-2 mb-2 text-violet-400 font-bold">
                  <span>💸</span> Cash Yield Available
                </div>
                <h3 className="text-4xl font-black text-white mb-2">
                  ${hasClaimed ? '0.00' : availableYield.toFixed(2)}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Generated from Real Estate and T-Bill fractional holdings this month.
                </p>
             </div>
             
             <button
                onClick={handleClaim}
                disabled={hasClaimed}
                className="w-full mt-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-50"
                style={{
                  background: hasClaimed ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #a855f7, #3b82f6)',
                  color: hasClaimed ? 'rgba(255,255,255,0.4)' : '#fff',
                  boxShadow: hasClaimed ? 'none' : '0 10px 20px rgba(168,85,247,0.3)'
                }}
             >
               {hasClaimed ? 'Yield Claimed ✅' : 'Claim USDC Yield'}
             </button>
          </div>

        </div>

        {/* --- PORTFOLIO ASSETS --- */}
        <h2 className="text-2xl font-black text-white mb-6">Your Vault</h2>
        
        {assets.length === 0 ? (
           <div className="rounded-3xl p-16 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
             <div className="text-6xl mb-4">🪙</div>
             <h3 className="text-xl font-bold text-white mb-2">Vault Empty</h3>
             <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Head over to the Marketplace to buy fractional RWAs or create your own.</p>
             <Link to="/marketplace" className="inline-flex px-6 py-3 rounded-xl font-bold" style={{ background: 'linear-gradient(135deg, #00ffd5, #06b6d4)', color: '#000' }}>
                Explore Marketplace
             </Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {assets.map((asset, idx) => {
                const nft = isNFT(asset)
                const color = nft ? '#a855f7' : '#00ffd5'
                return (
                  <div key={asset.assetId + idx} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                         {nft ? '🖼️' : '🏙️'}
                       </div>
                       <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}10`, color }}>
                         {nft ? 'Fractional NFT' : 'RWA Asset'}
                       </span>
                    </div>
                    <h3 className="font-bold text-lg text-white">{asset.assetName}</h3>
                    <p className="text-xs mb-4" style={{ color }}>{asset.unitName}</p>
                    <div className="space-y-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                       <div className="flex justify-between">
                         <span>Units Owned</span>
                         <span className="text-white font-bold">{Number(asset.total).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between">
                         <span>Asset ID</span>
                         <span className="text-white font-mono">{asset.assetId}</span>
                       </div>
                    </div>
                    <a href={`${LORA_BASE}/asset/${asset.assetId}`} target="_blank" rel="noreferrer" className="text-xs font-semibold block pt-4 text-center hover:opacity-80 transition-opacity" style={{ color, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                       View on Explorer ↗
                    </a>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
