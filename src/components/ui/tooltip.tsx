
import * as React from 'react'
export function TooltipProvider({ children }: any){ return children }
export function Tooltip({ children }: any){ return children }
export function TooltipTrigger({ asChild=false, children }: any){ return children }
export function TooltipContent({ children }: any){ return <span className="ml-2 text-xs opacity-70">{children}</span> }
export { Tooltip as UiTooltip, TooltipTrigger, TooltipContent, TooltipProvider }
