import { Search } from '@mui/icons-material'
import axios from 'axios'
import { CircleUser } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../redux/slice/SongsSlice'

export default function Navbar({navBack}) {

  const userInfo = useSelector((state) => state.token.userInfo)
  const dispatch = useDispatch()

  const token = useSelector((state) => state.token.token)

  const onChange = async (e) => {
    if(e.target.value.length){
      const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track`,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })
      console.log(data, "search")
      dispatch(setData(data))
    } else {
      dispatch(setData(null))
    }
  }

  return (
    <div className='flex justify-between flex-row items-center p-[2rem] sticky top-0 transition-[0.3s] ease-in-out'>
      <div className="search__bar bg-white rounded-2xl p-1 flex items-center gap-1 h-10 ">
        <Search />
        <input onChange={onChange} className='border-none w-[100%] focus:outline-none' type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar bg-black p-1 flex justify-center rounded-lg items-center">
        <a className='flex justify-center gap-1 text-white font-bold' href={userInfo?.userUrl}>
          <CircleUser />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </div>
  )
}
