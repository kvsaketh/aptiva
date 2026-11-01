import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import CTASection from '@/components/kit/CTASection'
import PhotoGrid from '@/components/gallery/PhotoGrid'
import { trpc } from '@/providers/trpc'

export default function Gallery() {
  const { data: photos = [], isLoading } = trpc.gallery.list.useQuery()
  const albums = [...new Set(photos.map((p) => p.album))]
  const [album, setAlbum] = useState<string | null>(null)
  const shown = album ? photos.filter((p) => p.album === album) : photos

  return (
    <div>
      <PageHeader
        label="Gallery"
        title="Aptiva in pictures."
        subtitle="Our teams at events, with partners and across the region."
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Gallery' }]}
      />
      <section className="surface-ink-flat relative">
        <div className="container-xl section-y-sm">
          {albums.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {[null, ...albums].map((a) => (
                <button key={a ?? 'all'} onClick={() => setAlbum(a)}
                  className={`border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    album === a ? 'border-red-600 bg-red-600 text-white' : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white'}`}>
                  {a ?? 'All'} <span className="opacity-60">{a ? photos.filter((p) => p.album === a).length : photos.length}</span>
                </button>
              ))}
            </div>
          )}
          {isLoading ? <p className="text-white/55">Loading photos…</p>
            : shown.length ? <PhotoGrid photos={shown} />
            : <p className="text-white/55">Photos from our upcoming events will appear here soon.</p>}
        </div>
      </section>
      <CTASection
        eyebrow="Meet the team"
        title={<>See us <span className="text-gradient-brand">in person.</span></>}
        body="Find out where Aptiva will be next, or tell us what you're working on."
        primary={{ label: 'Upcoming events', href: '#/events' }}
        secondary={{ label: 'Get in touch', href: '#/contact' }}
      />
    </div>
  )
}
