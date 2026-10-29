import { describe, expect, it } from 'vitest'
import { daysUntil, groupedEvents, isVideoLive, nextEvent, events } from './events'

const at = (iso: string) => new Date(iso).getTime()
const fusion = events.find((e) => e.id === 'uipath-fusion-dubai-2026')!

describe('events timeline', () => {
  it('promotes the soonest event that has not ended', () => {
    expect(nextEvent(at('2026-10-30T12:00:00+04:00'))?.id).toBe('uipath-fusion-dubai-2026')
  })

  it('keeps an event as next through its last day, then moves on', () => {
    expect(nextEvent(at('2026-11-02T22:00:00+04:00'))?.id).toBe('uipath-fusion-dubai-2026')
    expect(nextEvent(at('2026-11-03T00:00:01+04:00'))?.id).toBe('opentext-summit-me-2026')
  })

  it('keeps multi-day GITEX next until 11 Dec ends', () => {
    expect(nextEvent(at('2026-12-10T10:00:00+04:00'))?.id).toBe('gitex-global-2026')
  })

  it('never promotes a date-TBA event and has no next once all dated events pass', () => {
    expect(nextEvent(at('2026-12-12T00:00:01+04:00'))).toBeUndefined()
    const g = groupedEvents(at('2026-12-12T00:00:01+04:00'))
    expect(g.tba.map((e) => e.id)).toEqual(['leap-2027'])
    expect(g.past[0].id).toBe('gitex-global-2026')
  })

  it('shows the video only once it has a YouTube id and the live date has come', () => {
    const withId = { ...fusion, video: { youtubeId: 'abc', liveFrom: fusion.video!.liveFrom } }
    expect(isVideoLive(withId, at('2026-11-01T23:59:00+04:00'))).toBe(false)
    expect(isVideoLive(withId, at('2026-11-02T00:00:00+04:00'))).toBe(true)
    expect(isVideoLive(fusion, at('2026-11-05T00:00:00+04:00'))).toBe(false) // no id yet
  })

  it('counts days to go', () => {
    expect(daysUntil(fusion, at('2026-10-30T09:00:00+04:00'))).toBe(3)
  })
})
