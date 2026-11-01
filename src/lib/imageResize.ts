// Makes a downscaled JPEG in the browser so the server never has to process images.
export async function resizeToJpeg(file: File, maxSide: number, quality = 0.85) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height))
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, w, h)
  const blob = await new Promise<Blob>((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error('encode failed'))), 'image/jpeg', quality))
  const size = { width: bmp.width, height: bmp.height }
  bmp.close()
  return { blob, ...size }
}
