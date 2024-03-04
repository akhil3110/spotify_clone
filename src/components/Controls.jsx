import axios from 'axios'
import { ArrowLeftCircle, ArrowRightCircle, PauseCircle, PlayCircle, Repeat, Shuffle } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentlyPlaying, setPlayerState } from '../redux/slice/SongsSlice'

export default function Controls() {

    const dispatch = useDispatch()

    const playerState = useSelector((state) => state.songs.playerState)
    const token = useSelector((state) => state.token.token)

    const changeTrack = async (direction) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${direction}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
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
            } else{
                dispatch(setCurrentlyPlaying(null))
            }

      

        console.log(response, "change track")
    }

    const changeState = async () =>{
        console.log(playerState, "state")
        const state = playerState ? "pause" :"play"

        const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,
        {},{
                headers:{
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })
        
        dispatch(setPlayerState(!playerState))
    }

  return (
    <div className='flex gap-x-2 text-white font-extrabold items-center'>
        <div className="shuffle">
            <Shuffle size={30} />
        </div>
        <div className="previous">
            <ArrowLeftCircle size={30} onClick={() =>changeTrack("previous")}/>
        </div>
        <div className="state" onClick={changeState}>
            {playerState ?<PauseCircle size={30}  /> : <PlayCircle size={30}/>}
        </div>
        <div className="next">
            <ArrowRightCircle size={30} onClick={() =>changeTrack("next")}/>
        </div>
        <div className="repeat">
            <Repeat size={30}/>
        </div>
    </div>
  )
}
