import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { currentIdToken } from '@/lib/firebaseAuth'
import { resizeToJpeg } from '@/lib/imageResize'
import { events } from '@/data/events'

const field = 'bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none'

async function uploadOne(file: File, album: string, caption: string) {
  const web = await resizeToJpeg(file, 2000)
  const thumb = await resizeToJpeg(file, 640, 0.8)
  const fd = new FormData()
  fd.append('original', file)
  fd.append('web', web.blob, 'web.jpg')
  fd.append('thumb', thumb.blob, 'thumb.jpg')
  fd.append('album', album)
  if (caption) fd.append('caption', caption)
  fd.append('width', String(web.width))
  fd.append('height', String(web.height))
  const token = await currentIdToken()
  const res = await fetch('/api/gallery/upload', { method: 'POST', body: fd, headers: token ? { Authorization: `Bearer ${token}` } : {} })
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? `Upload failed (${res.status})`)
}

export default function GalleryAdmin() {
  const { data: photos = [], refetch } = trpc.gallery.listAll.useQuery()
  const update = trpc.gallery.update.useMutation({ onSuccess: () => refetch() })
  const remove = trpc.gallery.delete.useMutation({ onSuccess: () => refetch() })
  const [album, setAlbum] = useState('')
  const [caption, setCaption] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const busy = progress !== ''
  const albums = [...new Set([...events.map((e) => e.name), ...photos.map((p) => p.album)])]

  async function upload() {
    const failed: string[] = []
    for (const [i, f] of files.entries()) {
      setProgress(`Uploading ${i + 1} of ${files.length}…`)
      try { await uploadOne(f, album.trim(), caption.trim()) } catch (err) {
        const msg = err instanceof DOMException || (err as Error).message === 'encode failed'
          ? "this browser can't read it (HEIC: use Safari, or export as JPG)" : (err as Error).message
        failed.push(`${f.name}: ${msg}`)
      }
    }
    setErrors(failed)
    setProgress('')
    setFiles([])
    refetch()
  }

  return (
    <div>
      <h2 className="text-white font-semibold text-xl mb-4">Gallery ({photos.length})</h2>
      <div className="mb-6 p-6 bg-white/[0.06] border border-white/[0.18]">
        <h3 className="text-white text-sm mb-1">Upload photos</h3>
        <p className="text-white/60 text-xs mb-4">
          Photos go live on the public Gallery straight away. To show them on an event page, use the event's name as the album.
          Check for client logos, badges or screens before uploading.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input list="gallery-albums" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album (e.g. UiPath FUSION Dubai)" maxLength={150} className={field} />
          <datalist id="gallery-albums">{albums.map((a) => <option key={a} value={a} />)}</datalist>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption for these photos (optional)" maxLength={300} className={field} />
          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            onChange={(e) => setFiles([...(e.target.files ?? [])])} className="text-white text-sm file:mr-3 file:border-0 file:bg-white/10 file:px-4 file:py-3 file:text-white" />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button disabled={busy || !files.length || !album.trim()} onClick={upload}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-[0.07em] px-6 py-3 transition-all">
            Upload {files.length || ''} {files.length === 1 ? 'photo' : 'photos'}
          </button>
          <span className="text-white/70 text-sm" aria-live="polite">{progress}</span>
        </div>
        {errors.length > 0 && <ul className="mt-4 text-sm text-red-400">{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {photos.map((p) => (
          <div key={p.id} className={`bg-white/[0.06] border border-white/[0.15] ${p.isPublic ? '' : 'opacity-50'}`}>
            <a href={p.original} target="_blank" rel="noreferrer"><img src={p.thumb} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /></a>
            <div className="p-2 text-xs text-white">
              <p className="truncate font-medium" title={p.album}>{p.album}</p>
              <input defaultValue={p.caption ?? ''} placeholder="Caption" maxLength={300}
                onBlur={(e) => e.target.value !== (p.caption ?? '') && update.mutate({ id: p.id, caption: e.target.value || null })}
                className="mt-1 w-full bg-transparent border-b border-white/10 py-1 outline-none focus:border-red-600" />
              <div className="mt-2 flex justify-between">
                <button onClick={() => update.mutate({ id: p.id, isPublic: !p.isPublic })} className="text-white/70 hover:text-white">
                  {p.isPublic ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => confirm('Delete this photo permanently?') && remove.mutate({ id: p.id })} className="text-red-500 hover:text-red-400">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
