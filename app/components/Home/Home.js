import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={ container }>
      <h1 className={ title }>{'Tweedux'}</h1>
      <p className={ slogan }>{'The real-time, cloud-based, modular, scalable, growth hack, social platform CLONE'}</p>
    </div>
  )
}
