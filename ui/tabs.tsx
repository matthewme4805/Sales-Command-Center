
import * as React from 'react'

export function Tabs({ defaultValue, className='', children }: any){
  const [value,setValue] = React.useState(defaultValue)
  return <div className={className}>
    {React.Children.map(children, (child:any)=>{
      if (child.type.displayName === 'TabsList') return React.cloneElement(child, { value, setValue })
      if (child.type.displayName === 'TabsContent') return value === child.props.value ? child : null
      return child
    })}
  </div>
}
export function TabsList({ children, value, setValue }: any){
  return <div className="flex flex-wrap gap-2">{React.Children.map(children,(c:any)=>React.cloneElement(c, { value, setValue }))}</div>
}
TabsList.displayName='TabsList'
export function TabsTrigger({ value:val, value:_, setValue, children }: any){
  return <button onClick={()=>setValue(val)} className="btn btn-secondary">{children}</button>
}
export function TabsContent({ children }: any){ return <div className="space-y-6">{children}</div> }
TabsContent.displayName='TabsContent'
export function TabsTriggerWrapper(){ return null }
export function TabsTrigger_(){ return null }
export function TabsTriggerX(){ return null }
export function TabsTriggerY(){ return null }
export function TabsTriggerZ(){ return null }
export function TabsTriggerA(){ return null }
export function TabsTriggerB(){ return null }
export function TabsTriggerC(){ return null }
export function TabsTriggerD(){ return null }
export function TabsTriggerE(){ return null }
export function TabsTriggerF(){ return null }

// Shims for compatibility with import { Tabs, TabsContent, TabsList, TabsTrigger }
Tabs.displayName='Tabs'
