import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './SideBar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import axios from 'axios'
import { setUserInfo } from '../redux/slice/TokenSlice'

export default function Home() {

    const token = useSelector((state) => state.token.token)
    const dispatch = useDispatch();

    const bodyRef = useRef();
    const [navBackground,setNavBackground] = useState(false);
    const [headerBackground,setHeaderBackground] = useState(false);

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 260 ? setHeaderBackground(true) : setHeaderBackground(false);
    }

    
    useEffect(() => {

        const getUserInfo = async () =>{

            const {data} = await axios.get('https://api.spotify.com/v1/me',{
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });

            const userInfo = {
                userId: data.id,
                userUrl: data.external_urls.spotify,
                name: data.display_name,
            };

            dispatch(setUserInfo(userInfo))
        }

        getUserInfo();

    },[dispatch, token])

  return (
    <div className=' h-screen w-full   grid grid-cols-10'>
        <div className='col-span-2 sticky top-0 '>
            <div className=' h-screen sticky top-0'>
                <SideBar />    
            </div>
        </div>
        <div className=' bg-slate-800/10 col-span-8 bg-gradient-to-b from-black/60 to-black/85'>
            <div className="body sticky top-0  " ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground} />    
            </div>
            <div className="body_contents mt-5">
                <Body headerBackground={headerBackground} />
            </div>
        </div>
        <div className="footer sticky bottom-0 w-full col-span-10">
                <Footer />
            </div>
    </div>
  )
}
