
import * as React from 'react'
export function Badge({ variant='outline', className='', ...props }: any){
  const v = variant === 'default' ? 'badge-default' : variant === 'secondary' ? 'badge-secondary' : 'badge-outline'
  return <span className={`badge ${v} ${className}`} {...props} />
}
