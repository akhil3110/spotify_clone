import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentlyPlaying } from '../redux/slice/SongsSlice'

export default function CurrentSong() {

    const token = useSelector((state) => state.token.token)
    const playlists = useSelector((state) => state.songs.playlists)
    const currentPlaying = useSelector((state) => state.songs.currentlyPlaying)

    const dispatch = useDispatch()

    useEffect(() => {
        const getCurrentSong = async () =>{
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })
            console.log(response, "current song")
            if(response.data !==""){

                const {item } = response.data
                const currentPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                }

                dispatch(setCurrentlyPlaying(currentPlaying))
            }
          }
      
          getCurrentSong()
    }, [token, dispatch])

  return (
    <div>
        {
            currentPlaying && (
                <div className="track flex flex-row gap-x-2 items-center">
                    <div className="image">
                        <img src={currentPlaying.image} alt="Currently_playing" />
                    </div>
                    <div className="track_info font-semibold  text-white flex flex-col gap-1 ">
                        <h4>{currentPlaying.name}</h4>
                        <h6 className=' text-[#b3b3b3]'>{currentPlaying.artists.join(", ")}adad</h6>
                    </div>
                </div>
            )
        }
    </div>
  )
}
