import React from 'react'

export default function SearchCard({name,artists, image, description, tracks, id, selectedPlaylistId, token, dispatch, setCurrentlyPlaying, setPlayerState, setSelectedPlaylist}) {
  return (
    

<div className=" w-52 h-64 overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-32 w-full" src={image} alt="" />
    <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{artists}</p>
    </div>
</div>

  )
}
