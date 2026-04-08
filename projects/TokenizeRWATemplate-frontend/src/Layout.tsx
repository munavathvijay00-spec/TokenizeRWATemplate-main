import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import ThemeToggle from './components/ThemeToggle'
import { ellipseAddress } from './utils/ellipseAddress'

export default function Layout() {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const { activeAddress } = useWallet()
  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal)
  const isConnected = Boolean(activeAddress)
  const displayAddress = isConnected && activeAddress ? ellipseAddress(activeAddress, 4) : 'Connect'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#070b14' }}>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="glow-blob w-[600px] h-[600px] -top-32 -right-32 opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(0,255,213,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="glow-blob w-[500px] h-[500px] bottom-0 -left-32 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)', animationDelay: '3s' }}
        />
        <div
          className="glow-blob w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', animationDelay: '1.5s' }}
        />
      </div>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(7, 11, 20, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-dark-900"
              style={{ background: 'linear-gradient(135deg, #00ffd5, #06b6d4)' }}
            >
              T
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-xl font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #00ffd5, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                TokenizeRWA
              </span>
              <span
                className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(0,255,213,0.1)',
                  color: '#00ffd5',
                  border: '1px solid rgba(0,255,213,0.25)',
                }}
              >
                Algorand Hackseries 3.0
              </span>
              <span
                className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(168,85,247,0.1)',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.25)',
                }}
              >
                Web3 Devs-Team
              </span>
            </div>
          </NavLink>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { label: 'Home', to: '/' },
              { label: 'Tokenize', to: '/tokenize' },
              { label: 'Portfolio', to: '/portfolio' },
            ].map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#00ffd5] bg-[rgba(0,255,213,0.08)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              id="connect-wallet-btn"
              onClick={toggleWalletModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={
                isConnected
                  ? {
                      background: 'rgba(0,255,213,0.08)',
                      border: '1px solid rgba(0,255,213,0.3)',
                      color: '#00ffd5',
                    }
                  : {
                      background: 'linear-gradient(135deg, #00ffd5, #06b6d4)',
                      color: '#070b14',
                      boxShadow: '0 0 20px rgba(0,255,213,0.35)',
                    }
              }
            >
              {isConnected && (
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              )}
              {displayAddress}
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 border-t py-12 px-6"
        style={{
          background: 'rgba(7, 11, 20, 0.95)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, #00ffd5, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                TokenizeRWA
              </div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(0,255,213,0.1)',
                  color: '#00ffd5',
                  border: '1px solid rgba(0,255,213,0.25)',
                }}
              >
                Algorand Hackseries 3.0
              </span>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(168,85,247,0.1)',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.25)',
                }}
              >
                Web3 Devs-Team
              </span>
            </div>
            <p className="text-sm text-slate-500">
              POC template for tokenizing real-world assets on Algorand.
            </p>
          </div>
          <div className="text-sm">
            <span className="text-white font-semibold block mb-2">Explorer</span>
            <a
              href="https://lora.algokit.io"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-[#00ffd5] transition"
            >
              Lora Explorer →
            </a>
          </div>
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} TokenizeRWA. All rights reserved.
          </div>
        </div>
      </footer>

      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  )
}
