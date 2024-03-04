import React from 'react'
import CurrentSong from './CurrentSong'
import Controls from './Controls'

export default function Footer() {
  return (
    <div className='bg-[#181818] h-20 border-t-2 border-[#282828] w-full flex justify-around   px-5 flex-row p-2'>
      <CurrentSong />
      <Controls />
    </div>
  )
}
