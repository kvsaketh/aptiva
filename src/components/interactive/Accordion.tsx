import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    if (allowMultiple) {
      const next = new Set(open)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      setOpen(next)
    } else {
      setOpen(open.has(i) ? new Set() : new Set([i]))
    }
  }

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => toggle(i)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className={`text-lg font-semibold transition-colors ${open.has(i) ? 'text-red-600' : 'text-white group-hover:text-white/90'}`}>
              {item.title}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open.has(i) ? 'rotate-180 text-red-600' : 'text-white/90'}`} />
          </button>
          <div
            className={`grid transition-all duration-300 ${open.has(i) ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <div className="text-white leading-relaxed">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}