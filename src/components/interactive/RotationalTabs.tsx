import { useState, useEffect } from 'react'

interface RotationalTabItem {
  icon: React.ReactNode
  label: string
  title: string
  content: React.ReactNode
  image?: string
}

interface RotationalTabsProps {
  items: RotationalTabItem[]
  interval?: number
}

export default function RotationalTabs({ items, interval = 5000 }: RotationalTabsProps) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, interval)
    return () => clearInterval(timer)
  }, [isPaused, interval, items.length])

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="space-y-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-4 w-full p-4 text-left transition-all duration-300 border-l-2 ${
              active === i
                ? 'border-red-600 bg-white/5'
                : 'border-transparent hover:bg-white/5'
            }`}
          >
            <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${active === i ? 'text-red-600' : 'text-white/90'}`}>
              {item.icon}
            </div>
            <div>
              <span className={`text-sm font-medium uppercase tracking-[0.05em] block ${active === i ? 'text-white' : 'text-white/90'}`}>
                {item.label}
              </span>
              <span className={`text-lg font-semibold ${active === i ? 'text-red-600' : 'text-white/85'}`}>
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="bg-gray-900 p-8 lg:p-10 min-h-[400px]">
          <div className="transition-opacity duration-500">
            {items[active].image && (
              <img
                src={items[active].image}
                alt={items[active].title}
                className="w-full h-48 object-cover mb-6"
              />
            )}
            <h3 className="text-2xl font-bold text-white mb-4">{items[active].title}</h3>
            <div className="text-white leading-relaxed">{items[active].content}</div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${active === i ? 'bg-red-600 w-6' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}