
import * as React from 'react'
export function Card({ className='', ...props }: any){ return <div className={`card ${className}`} {...props} /> }
export function CardHeader({ className='', ...props }: any){ return <div className={`card-header ${className}`} {...props} /> }
export function CardTitle({ className='', ...props }: any){ return <div className={`card-title ${className}`} {...props} /> }
export function CardContent({ className='', ...props }: any){ return <div className={`card-content ${className}`} {...props} /> }
