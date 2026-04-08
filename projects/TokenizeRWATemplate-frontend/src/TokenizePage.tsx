import TokenizeAsset from './components/TokenizeAsset'

export default function TokenizePage() {
  return (
    <div className="min-h-screen py-12" style={{ color: '#e2e8f0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 text-center">
          <div
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,255,213,0.1)', border: '1px solid rgba(0,255,213,0.3)', color: '#00ffd5' }}
          >
            Tokenize Assets
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Create & Mint on Algorand
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Create ASAs, mint NFTs, and transfer assets — all in one place.
          </p>
        </div>
        <TokenizeAsset />
      </div>
    </div>
  )
}
