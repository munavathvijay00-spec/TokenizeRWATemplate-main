import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

// Mock Data for the Marketplace and AI Oracle
const RWA_LISTINGS = [
  {
    id: 'rwa-01',
    title: 'Downtown Commercial Hub',
    category: 'Real Estate',
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1577903282218-19ebcc10636f?q=80&w=600&auto=format&fit=crop', // Office Building
    totalValue: 5000000,
    fractionPrice: 100, // $100 per fraction
    funded: 3500000, // 70% funded
    apy: 8.5,
    aiRiskScore: 'Low (12/100)',
    aiTrend: 'Rising',
    investors: 420
  },
  {
    id: 'rwa-02',
    title: 'Rolex Daytona "Paul Newman"',
    category: 'Luxury Watch',
    location: 'Vaulted - Geneva',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop', // luxury watch
    totalValue: 120000,
    fractionPrice: 50, // $50 per fraction
    funded: 110000, // 91% funded
    apy: 12.0,
    aiRiskScore: 'Medium (45/100)',
    aiTrend: 'Stable',
    investors: 85
  },
  {
    id: 'rwa-03',
    title: 'US Treasury Bill Token (T-Bill)',
    category: 'Government Debt',
    location: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1628156121752-9b2f27572718?q=80&w=600&auto=format&fit=crop', // Money/Treasury
    totalValue: 10000000,
    fractionPrice: 10,
    funded: 2500000, // 25%
    apy: 5.25,
    aiRiskScore: 'Ultra Low (1/100)',
    aiTrend: 'Rising',
    investors: 1250
  }
]

export default function Marketplace() {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [purchaseAmount, setPurchaseAmount] = useState<number>(10)
  const [isBuying, setIsBuying] = useState(false)

  const handleBuy = () => {
    setIsBuying(true)
    setTimeout(() => {
      setIsBuying(false)
      enqueueSnackbar(`Successfully purchased $${purchaseAmount} of ${selectedAsset.title}!`, { variant: 'success' })
      setSelectedAsset(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-12" style={{ color: '#e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="mb-12 text-center">
           <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Premium <span style={{ color: '#00ffd5' }}>RWA</span> Marketplace
           </h1>
           <p className="text-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
             Invest in high-yield Real World Assets for as little as $10.
           </p>
        </div>

        {/* --- MARKETPLACE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RWA_LISTINGS.map((asset) => {
             const progress = (asset.funded / asset.totalValue) * 100
             return (
               <div key={asset.id} 
                  className="rounded-3xl overflow-hidden group transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
               >
                 {/* Image Block */}
                 <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
                    <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold" 
                      style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                      {asset.category}
                    </span>
                    <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: 'rgba(0,255,213,0.2)', border: '1px solid #00ffd5', color: '#00ffd5', backdropFilter: 'blur(4px)' }}>
                      {asset.apy}% APY
                    </span>
                 </div>

                 {/* Content Block */}
                 <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-1">{asset.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>📍 {asset.location}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                       <div className="flex justify-between text-xs font-bold mb-2">
                         <span style={{ color: '#00ffd5' }}>${(asset.funded / 1000).toFixed(0)}k Funded</span>
                         <span style={{ color: 'rgba(255,255,255,0.5)' }}>${(asset.totalValue / 1000).toFixed(0)}k Goal</span>
                       </div>
                       <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                         <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00ffd5, #3b82f6)' }} />
                       </div>
                    </div>

                    {/* AI Oracle Data (Phase 4/5) */}
                    <div className="rounded-xl p-3 mb-6 flex items-center justify-between" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                       <div className="flex items-center gap-2">
                         <span>🤖</span>
                         <div>
                           <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI Risk Oracle</div>
                           <div className="text-xs text-white">{asset.aiRiskScore}</div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Trend</div>
                         <div className="text-xs text-white">{asset.aiTrend} ↗</div>
                       </div>
                    </div>

                    <button 
                      onClick={() => { setSelectedAsset(asset); setPurchaseAmount(asset.fractionPrice * 10) }}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                       Invest Now
                    </button>
                 </div>
               </div>
             )
          })}
        </div>

        {/* --- PURCHASE MODAL --- */}
        {selectedAsset && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !isBuying && setSelectedAsset(null)} />
              <div className="relative w-full max-w-md rounded-3xl p-8"
                 style={{
                    background: '#070b14',
                    border: '1px solid rgba(0,255,213,0.3)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,255,213,0.1)'
                 }}
              >
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white">{selectedAsset.title}</h3>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>${selectedAsset.fractionPrice} per fraction</p>
                    </div>
                    <button onClick={() => !isBuying && setSelectedAsset(null)} className="text-white/50 hover:text-white">✕</button>
                 </div>

                 <div className="mb-6 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Amount to Invest (USDC)
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black" style={{ color: '#00ffd5' }}>$</span>
                      <input 
                         type="number" 
                         value={purchaseAmount}
                         onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                         className="w-full bg-transparent text-3xl font-black text-white outline-none"
                         min={selectedAsset.fractionPrice}
                         step={selectedAsset.fractionPrice}
                      />
                    </div>
                 </div>

                 {/* AI Output Summary */}
                 <div className="mb-8 p-4 rounded-xl text-sm" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}>
                    <strong className="text-violet-400 block mb-1">🤖 AI Yield Projection</strong>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Projected annual return: <strong className="text-white">${((purchaseAmount * selectedAsset.apy) / 100).toFixed(2)}</strong>. Risk levels are dynamically monitored.
                    </p>
                 </div>

                 <button
                    onClick={handleBuy}
                    disabled={isBuying}
                    className="w-full py-4 rounded-xl font-black text-lg transition-all duration-300"
                    style={{
                      background: isBuying ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00ffd5, #06b6d4)',
                      color: isBuying ? 'rgba(255,255,255,0.4)' : '#070b14',
                      boxShadow: isBuying ? 'none' : '0 10px 30px rgba(0,255,213,0.3)'
                    }}
                 >
                    {isBuying ? 'Confirming via Smart Contract...' : `Invest $${purchaseAmount}`}
                 </button>
                 <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                   Algorand TestNet Transaction
                 </p>
              </div>
           </div>
        )}

      </div>
    </div>
  )
}
