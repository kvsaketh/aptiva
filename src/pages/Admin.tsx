import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-xs font-bold uppercase tracking-[0.07em] transition-all border-b-2 ${
        active
          ? 'border-red-600 text-white'
          : 'border-transparent text-white hover:text-white/85'
      }`}
    >
      {label}
    </button>
  )
}

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth()
  const [tab, setTab] = useState<'clients' | 'partners' | 'images'>('clients')

  // Client logos
  const { data: clientLogos, refetch: refetchClients } = trpc.media.clientLogo.listAll.useQuery(undefined, { enabled: tab === 'clients' })
  const createClient = trpc.media.clientLogo.create.useMutation({ onSuccess: () => refetchClients() })
  const updateClient = trpc.media.clientLogo.update.useMutation({ onSuccess: () => refetchClients() })
  const deleteClient = trpc.media.clientLogo.delete.useMutation({ onSuccess: () => refetchClients() })

  // Partner logos
  const { data: partnerLogos, refetch: refetchPartners } = trpc.media.partnerLogo.listAll.useQuery(undefined, { enabled: tab === 'partners' })
  const createPartner = trpc.media.partnerLogo.create.useMutation({ onSuccess: () => refetchPartners() })
  const updatePartner = trpc.media.partnerLogo.update.useMutation({ onSuccess: () => refetchPartners() })
  const deletePartner = trpc.media.partnerLogo.delete.useMutation({ onSuccess: () => refetchPartners() })

  // Site images
  const { data: siteImages, refetch: refetchImages } = trpc.media.siteImage.list.useQuery(undefined, { enabled: tab === 'images' })
  const createImage = trpc.media.siteImage.create.useMutation({ onSuccess: () => refetchImages() })
  const deleteImage = trpc.media.siteImage.delete.useMutation({ onSuccess: () => refetchImages() })

  if (authLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Please log in to access admin.</div>
  if (user.role !== 'admin') return <div className="min-h-screen bg-black flex items-center justify-center text-white">Admin access only.</div>

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-[88px]">
      <div className="max-w-[1280px] mx-auto" style={{ padding: 'clamp(24px, 5vw, 80px)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="label-red block mb-2">ADMIN PANEL</span>
            <h1 className="text-white font-bold text-3xl tracking-[-0.02em]">Media Manager</h1>
          </div>
          <span className="text-white text-sm">Logged in as {user.name}</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/[0.15]">
          <TabButton label="Client Logos" active={tab === 'clients'} onClick={() => setTab('clients')} />
          <TabButton label="Partner Logos" active={tab === 'partners'} onClick={() => setTab('partners')} />
          <TabButton label="Site Images" active={tab === 'images'} onClick={() => setTab('images')} />
        </div>

        {/* ─── CLIENT LOGOS TAB ─── */}
        {tab === 'clients' && (
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">Client Logos ({clientLogos?.length || 0})</h2>
            <div className="mb-6 p-6 bg-white/[0.06] border border-white/[0.18]">
              <h3 className="text-white text-sm mb-4">Add New Client Logo</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  createClient.mutate({
                    name: fd.get('name') as string,
                    imageUrl: fd.get('imageUrl') as string,
                    displayOrder: Number(fd.get('displayOrder')),
                  })
                  e.currentTarget.reset()
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <input name="name" placeholder="Client Name" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="imageUrl" placeholder="Image URL (e.g. /client-logos/name.svg)" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="displayOrder" type="number" placeholder="Display Order" defaultValue="0" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.07em] px-6 py-3 transition-all">
                  Add Client
                </button>
              </form>
            </div>

            <div className="space-y-2">
              {clientLogos?.map((logo) => (
                <div key={logo.id} className="flex items-center gap-4 p-4 bg-white/[0.06] border border-white/[0.15]">
                  <div className="w-12 h-12 bg-white/[0.05] flex items-center justify-center overflow-hidden">
                    {logo.imageUrl ? (
                      <img src={logo.imageUrl} alt={logo.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-white text-xs">No img</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{logo.name}</p>
                    <p className="text-white text-xs">{logo.imageUrl}</p>
                  </div>
                  <span className={`text-xs uppercase tracking-[0.1em] font-bold px-2 py-1 ${logo.isActive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {logo.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => updateClient.mutate({ id: logo.id, isActive: !logo.isActive })}
                    className="text-white hover:text-white text-xs px-3 py-1 border border-white/10 hover:border-white/30 transition-all"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteClient.mutate({ id: logo.id })}
                    className="text-red-500 hover:text-red-400 text-xs px-3 py-1 border border-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── PARTNER LOGOS TAB ─── */}
        {tab === 'partners' && (
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">Partner Logos ({partnerLogos?.length || 0})</h2>
            <div className="mb-6 p-6 bg-white/[0.06] border border-white/[0.18]">
              <h3 className="text-white text-sm mb-4">Add New Partner Logo</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  createPartner.mutate({
                    name: fd.get('name') as string,
                    imageUrl: fd.get('imageUrl') as string,
                    category: fd.get('category') as string || undefined,
                    description: fd.get('description') as string || undefined,
                    tier: fd.get('tier') as string || undefined,
                    displayOrder: Number(fd.get('displayOrder')),
                    isFeatured: fd.get('isFeatured') === 'on',
                  })
                  e.currentTarget.reset()
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <input name="name" placeholder="Partner Name" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="imageUrl" placeholder="Image URL" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="category" placeholder="Category (e.g. Hyper Scalers)" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="tier" placeholder="Tier (e.g. Gold, Diamond)" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="displayOrder" type="number" placeholder="Display Order" defaultValue="0" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                  <input name="isFeatured" type="checkbox" className="accent-red-600" />
                  Featured Partner
                </label>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.07em] px-6 py-3 transition-all md:col-span-3">
                  Add Partner
                </button>
              </form>
            </div>

            <div className="space-y-2">
              {partnerLogos?.map((logo) => (
                <div key={logo.id} className="flex items-center gap-4 p-4 bg-white/[0.06] border border-white/[0.15]">
                  <div className="w-12 h-12 bg-white/[0.05] flex items-center justify-center overflow-hidden">
                    {logo.imageUrl ? (
                      <img src={logo.imageUrl} alt={logo.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-white text-xs">No img</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{logo.name}</p>
                      {logo.isFeatured && <span className="bg-red-600/20 text-red-500 text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-0.5">Featured</span>}
                      {logo.tier && <span className="bg-blue-600/20 text-blue-500 text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-0.5">{logo.tier}</span>}
                    </div>
                    <p className="text-white text-xs">{logo.category} | {logo.imageUrl}</p>
                  </div>
                  <span className={`text-xs uppercase tracking-[0.1em] font-bold px-2 py-1 ${logo.isActive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {logo.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => updatePartner.mutate({ id: logo.id, isActive: !logo.isActive })}
                    className="text-white hover:text-white text-xs px-3 py-1 border border-white/10 hover:border-white/30 transition-all"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deletePartner.mutate({ id: logo.id })}
                    className="text-red-500 hover:text-red-400 text-xs px-3 py-1 border border-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SITE IMAGES TAB ─── */}
        {tab === 'images' && (
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">Site Images ({siteImages?.length || 0})</h2>
            <div className="mb-6 p-6 bg-white/[0.06] border border-white/[0.18]">
              <h3 className="text-white text-sm mb-4">Add New Site Image</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  createImage.mutate({
                    key: fd.get('key') as string,
                    name: fd.get('name') as string,
                    imageUrl: fd.get('imageUrl') as string,
                    section: fd.get('section') as string || undefined,
                    description: fd.get('description') as string || undefined,
                  })
                  e.currentTarget.reset()
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <input name="key" placeholder="Key (e.g. hero-bg)" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="name" placeholder="Display Name" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="imageUrl" placeholder="Image URL" required className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="section" placeholder="Section (e.g. home, about)" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <input name="description" placeholder="Description" className="bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none" />
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.07em] px-6 py-3 transition-all">
                  Add Image
                </button>
              </form>
            </div>

            <div className="space-y-2">
              {siteImages?.map((img) => (
                <div key={img.id} className="flex items-center gap-4 p-4 bg-white/[0.06] border border-white/[0.15]">
                  <div className="w-16 h-10 bg-white/[0.05] flex items-center justify-center overflow-hidden">
                    {img.imageUrl ? (
                      <img src={img.imageUrl} alt={img.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs">No img</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{img.name}</p>
                      <span className="bg-white/[0.05] text-white text-xs uppercase tracking-[0.1em] px-2 py-0.5">{img.key}</span>
                      {img.section && <span className="bg-blue-600/20 text-blue-500 text-[10px] uppercase tracking-[0.1em] px-2 py-0.5">{img.section}</span>}
                    </div>
                    <p className="text-white text-xs">{img.imageUrl}</p>
                  </div>
                  <button
                    onClick={() => deleteImage.mutate({ id: img.id })}
                    className="text-red-500 hover:text-red-400 text-xs px-3 py-1 border border-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
