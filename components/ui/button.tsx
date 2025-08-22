
import * as React from 'react'
import { clsx } from 'clsx'

export function Button({ className='', variant='default', size='md', ...props }: any) {
  const v = variant === 'secondary' ? 'btn-secondary' : variant === 'ghost' ? 'btn-ghost' : 'btn-default'
  return <button className={clsx('btn', v, className)} {...props} />
}

export default Button
