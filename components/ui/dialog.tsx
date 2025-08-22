
import * as React from 'react'

export function Dialog({ open, onOpenChange, children }: any){
  if(!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={()=>onOpenChange(false)}>
    <div className="bg-white rounded-2xl border shadow-xl max-h-[90vh] overflow-auto w-[90vw] md:w-[800px]" onClick={e=>e.stopPropagation()}>
      {children}
    </div>
  </div>
}
export function DialogContent({ className='', children }: any){ return <div className={className}>{children}</div> }
export function DialogHeader({ children }: any){ return <div className="p-4 border-b">{children}</div> }
export function DialogTitle({ children }: any){ return <div className="text-lg font-semibold">{children}</div> }
export function DialogDescription({ children }: any){ return <div className="text-sm opacity-70">{children}</div> }
export function DialogFooter({ children }: any){ return <div className="p-4 border-t flex gap-2 justify-end">{children}</div> }
