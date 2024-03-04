import React, { useEffect } from 'react'
import { setPlaylists, setSelectedPlaylistId } from '../redux/slice/SongsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AudioWaveform } from 'lucide-react';

export default function SideBar() {

  
  const token = useSelector((state) => state.token.token)
  const playLists = useSelector((state) => state.songs.playlists)
  const dispatch = useDispatch();


  useEffect(() => {
    const getPlaylistData = async () =>{
      const response = await axios.get("https://api.spotify.com/v1/me/playlists",{
          headers:{
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          }
      })
      const {items} = response.data;
    
      const playlists = items.map(({name,id}) =>{
        return {name,id}
      })

      dispatch(setPlaylists(playlists))
    }

    getPlaylistData()
  },[])

  const handleCLick = (id) =>{
    dispatch(setSelectedPlaylistId(id))
  }

  return (
    <div className=' h-full w-full bg-black  text-white font-semibold'>
      <div className=' flex flex-col'>
       <div className='mt-5 p-4'>
          <a href={`http://localhost:5173/#access_token=${token}&token_type=Bearer&expires_in=3600`}>
            <img className='hidden md:block' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify_logo" />
          </a>
       </div>
       <div className=' mt-5 p-2'>
        <div className='flex gap-x-1 text-xs  md:text-xl'>
          <AudioWaveform className='hidden md:block' />
           Your Playlists
        </div>
        <div className=' mt-2 '>
          {playLists.map((playlist) =>(
            <div onClick={() =>{handleCLick(playlist.id)}} key={playlist.id} className='cursor-pointer hover:bg-slate-100/10 flex flex-col gap-y-1 p-2 text-md'>
              <div className='flex flex-row overflow-hidden'>
                <p>
                  {playlist.name}
                </p>
              </div>
            </div>
          ))}
        </div>
       </div>
      </div>
    </div>
  )
}
