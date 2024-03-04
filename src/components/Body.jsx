import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentlyPlaying, setPlayerState, setSelectedPlaylist } from '../redux/slice/SongsSlice'
import { Clock } from 'lucide-react'

export default function Body() {

  const dispatch = useDispatch()
  const data = useSelector((state) => state.songs.data)
  const initialData = useSelector((state) => state.songs.initialData)
  const token = useSelector((state) => state.token.token)
  const selectedPlaylistId = useSelector((state) => state.songs.selectedPlaylistId)
  const selectedPlaylist = useSelector((state) => state.songs.selectedPlaylist)

  useEffect(() => {
    const getInitialPlaylist= async () => {
      const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })
      
      const selectedPlaylist = {
        id: data.id,
        name: data.name,
        description: data.description.startsWith("<a")
          ? ""
          : data.description,
        image: data.images[0].url,
        tracks: data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      }
      
      dispatch(setSelectedPlaylist(selectedPlaylist))
    }

    getInitialPlaylist()
  }  ,[token,data, selectedPlaylistId, dispatch, initialData])

  const playSong = async (id,name,artists,image,context_uri,track_number) => {
    const response =await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if(response.status === 204){
      const currentPlaying = {
        id,
        name,
        artists,
        image
      }

      dispatch(setCurrentlyPlaying(currentPlaying))
      dispatch(setPlayerState(true))
    }else{
      dispatch(setPlayerState(true))
    }
  }

  return (
    <div>
      {data && (
        <div>
          <div className="search_results">
            {data.tracks.items.map(({ id, name, artists, album, duration_ms, uri, track_number }) => {
              return (
                <div key={id} className="search_result">
                  <div className="image">
                    <img src={album.images[2].url} alt="album" />
                  </div>
                  <div className="info">
                    <span className="name">{name}</span>
                    <span>{artists.map((artist) => artist.name).join(", ")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedPlaylist && !data && (
        <div  className=''>
          <div className='playlist m-5 flex items-center gap-5  '>
            <div className="image">
              <img className='h-[10rem] shadow shadow-[rgba(0,0,0,0.25) 0px 25px 50px -12px] ' src={selectedPlaylist.image} alt="selected_playlist" />
            </div>
            <div className="details flex flex-col gap-[3rem] text-white ">
              <span className='type'>PLAYLIST</span>
              <h1 className='tittle text-[4 rem]'>{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list  ">
            <div className="header_row grid grid-cols-10 text-[#dddcdc] m-2 sticky top-[15vh]  bg-slate-700 p-5 font-extrabold">
            <div className="col col-span-1">
                <span>#</span>
              </div>
              <div className="col col-span-4">
                <span>Title</span>
              </div>
              <div className="col col-span-4">
                <span>Album</span>
              </div>
              <div className="col col-span-1">
                <span><Clock /></span>
              </div>
            </div>
            <div className="tracks flex flex-col m-2 ">
              {selectedPlaylist.tracks.map(({id,name,artists,image,duration,album,context_uri,track_number},index) => {
                return (
                  <div 
                    onClick={() => playSong(id,name,artists,image,context_uri,track_number)}
                    className="row grid grid-cols-10 cursor-pointer hover:bg-slate-100/10 mt-5 p-2  text-white overflow-auto" 
                    key={id}
                  >
                    <div className="col col-span-1">
                      <span>{index+1}</span>
                    </div>
                    <div className="col flex gap-x-5  detail col-span-4">
                      <div className="image">
                        <img className=' h-[40px]' src={image}  alt="track" />
                      </div>
                      <div className="info flex flex-col">
                        <span className="name">{name}</span>
                        <span>{artists}</span>
                      </div>
                    </div>
                    <div className="col col-span-4">
                      <span>{album}</span>
                    </div>
                    <div className="col col-span-1">
                      <span>{duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
