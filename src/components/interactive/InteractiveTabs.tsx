import { useEffect, useRef, useState } from 'react'

interface TabItem {
  label: string
  content: React.ReactNode
}

interface InteractiveTabsProps {
  tabs: TabItem[]
  variant?: 'horizontal' | 'vertical'
  accentColor?: 'red' | 'blue'
}

export default function InteractiveTabs({ tabs, variant = 'horizontal', accentColor = 'red' }: InteractiveTabsProps) {
  const [active, setActive] = useState(0)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeTab = tabRefs.current[active]
    if (activeTab && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeTab.offsetWidth}px`
      indicatorRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`
    }
  }, [active])

  const accent = accentColor === 'red' ? 'bg-red-600' : 'bg-blue-600'
  const activeText = accentColor === 'red' ? 'text-red-600' : 'text-blue-600'

  return (
    <div className={variant === 'horizontal' ? '' : 'flex gap-8'}>
      <div className={`relative ${variant === 'horizontal' ? 'border-b border-white/10 mb-8' : 'w-64 shrink-0'}`}>
        <div
          className={`${variant === 'horizontal' ? 'flex' : 'flex flex-col'} ${variant === 'horizontal' ? '' : 'gap-2'}`}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              ref={(el) => { tabRefs.current[i] = el }}
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-sm font-medium uppercase tracking-[0.05em] transition-colors text-left whitespace-nowrap ${
                active === i ? activeText : 'text-white hover:text-white/90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          ref={indicatorRef}
          className={`absolute ${variant === 'horizontal' ? 'bottom-0 h-[2px]' : 'left-0 w-[2px] top-0'} ${accent} transition-all duration-300`}
          style={{ width: variant === 'horizontal' ? undefined : '2px', height: variant === 'horizontal' ? '2px' : undefined }}
        />
      </div>
      <div className="flex-1 min-h-[300px]">
        <div className="animate-fadeIn">
          {tabs[active].content}
        </div>
      </div>
    </div>
  )
}
