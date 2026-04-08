import { useWallet } from '@txnlab/use-wallet-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🔐',
    title: 'Manager Role',
    desc: 'Update asset settings and configuration after creation.',
    color: 'rgba(0,255,213,0.15)',
    border: 'rgba(0,255,213,0.3)',
  },
  {
    icon: '🧊',
    title: 'Freeze Account',
    desc: 'Restrict transfers for compliance and regulatory control.',
    color: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    icon: '↩️',
    title: 'Clawback Authority',
    desc: 'Recover tokens from any account when required by law.',
    color: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.3)',
  },
  {
    icon: '📄',
    title: 'Metadata Support',
    desc: 'Link off-chain documentation and IPFS metadata.',
    color: 'rgba(236,72,153,0.15)',
    border: 'rgba(236,72,153,0.3)',
  },
]

const steps = [
  {
    num: '01',
    title: 'Connect Wallet',
    desc: 'Use Pera, Defly, Lute, or sign in with Google via Web3Auth.',
    tag: 'Instant',
    color: '#00ffd5',
    glow: 'rgba(0,255,213,0.2)',
  },
  {
    num: '02',
    title: 'Create ASA',
    desc: 'Define asset properties: name, symbol, supply, and metadata URL.',
    tag: 'On-chain',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.2)',
  },
  {
    num: '03',
    title: 'Mint NFT',
    desc: 'Upload an image → pin to IPFS → mint a compliant NFT-ASA.',
    tag: 'IPFS + Chain',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.2)',
  },
  {
    num: '04',
    title: 'Transfer Assets',
    desc: 'Send ALGO, TestNet USDC, or any ASA to any Algorand address.',
    tag: 'All-in-one',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.2)',
  },
]

export default function Home() {
  const { activeAddress } = useWallet()

  return (
    <div style={{ color: '#e2e8f0' }}>

      {/* ===== HERO ===== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center overflow-hidden">

        {/* Animated badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold animate-fade-in-up"
          style={{
            background: 'rgba(0,255,213,0.08)',
            border: '1px solid rgba(0,255,213,0.25)',
            color: '#00ffd5',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live on Algorand TestNet
        </div>

        {/* Headline */}
        <h1
          className="mt-2 text-5xl sm:text-7xl font-black leading-tight tracking-tight animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span style={{ color: '#fff' }}>Tokenize</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00ffd5 0%, #a855f7 50%, #3b82f6 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 5s ease-in-out infinite',
            }}
          >
            Real-World Assets
          </span>
        </h1>

        <p
          className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ color: 'rgba(255,255,255,0.55)', animationDelay: '0.2s' }}
        >
          Create Algorand Standard Assets with built-in compliance features.
          Perfect for founders prototyping RWA solutions on-chain.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <Link
            to="/tokenize"
            id="hero-start-tokenizing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
            style={{
              background: activeAddress
                ? 'linear-gradient(135deg, #00ffd5, #06b6d4)'
                : 'rgba(255,255,255,0.08)',
              color: activeAddress ? '#070b14' : 'rgba(255,255,255,0.35)',
              boxShadow: activeAddress ? '0 0 30px rgba(0,255,213,0.4)' : 'none',
              cursor: activeAddress ? 'pointer' : 'not-allowed',
            }}
          >
            🚀 Start Tokenizing
          </Link>

          <a
            href="https://dev.algorand.co/concepts/assets/overview/"
            target="_blank"
            rel="noreferrer"
            id="hero-learn-asas"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Learn about ASAs ↗
          </a>
        </div>

        {!activeAddress && (
          <p className="mt-5 text-sm animate-fade-in-up" style={{ color: 'rgba(255,255,255,0.35)', animationDelay: '0.4s' }}>
            Connect your wallet using the button in the top-right to get started.
          </p>
        )}

        {/* Hero floating stats */}
        <div
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { label: 'Network', val: 'TestNet' },
            { label: 'Protocol', val: 'ARC-3' },
            { label: 'Powered by', val: 'Algorand' },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="rounded-2xl px-4 py-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
              <div className="text-sm font-bold mt-0.5" style={{ color: '#00ffd5' }}>{val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <div
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}
          >
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From wallet to blockchain in minutes
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            A clean, end-to-end flow: connect → mint → track → transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${step.color}40`
                e.currentTarget.style.background = step.glow
                  ? `rgba(255,255,255,0.06)`
                  : 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 0 30px ${step.glow}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
                  style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}40` }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span
                  className="ml-4 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${step.color}15`, color: step.color }}
                >
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <div
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,255,213,0.1)', border: '1px solid rgba(0,255,213,0.3)', color: '#00ffd5' }}
          >
            Compliance Ready
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Enterprise-grade controls
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Built-in Algorand features that satisfy regulatory requirements out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = f.color
                e.currentTarget.style.borderColor = f.border
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,213,0.12) 0%, rgba(168,85,247,0.12) 50%, rgba(59,130,246,0.12) 100%)',
            border: '1px solid rgba(0,255,213,0.2)',
            boxShadow: '0 0 80px rgba(0,255,213,0.08), 0 0 80px rgba(168,85,247,0.08)',
          }}
        >
          {/* inner glow orb */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,213,0.15) 0%, transparent 60%)',
            }}
          />
          <h2 className="relative text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to build the future?
          </h2>
          <p className="relative text-base mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Launch your first RWA token in minutes. No complicated setup, no hidden fees.
          </p>
          <Link
            to="/tokenize"
            id="cta-create-asset"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
            style={
              activeAddress
                ? {
                    background: 'linear-gradient(135deg, #00ffd5, #06b6d4)',
                    color: '#070b14',
                    boxShadow: '0 0 30px rgba(0,255,213,0.5)',
                  }
                : {
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                    cursor: 'not-allowed',
                  }
            }
          >
            ✨ Create Your First Asset
          </Link>
        </div>
      </section>
    </div>
  )
}
