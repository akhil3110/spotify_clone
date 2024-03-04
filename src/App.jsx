import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authorize from './components/Authorize'
import { useSelector, useDispatch } from 'react-redux'
import Home from './components/Home'
import { setToken } from './redux/slice/TokenSlice'


function App() {
  
  const token = useSelector((state) => state.token.token)
  const dipatch = useDispatch()

  useEffect(() => {
    const url = window.location.hash
    console.log(url)

    if(url){
      const get_token = url.substring(1).split('&')[0].split('=')[1]
      dipatch(setToken(get_token))
    }
  },[dipatch])


  return (
    <div>
        {token ? <Home /> : <Authorize />}
    </div>
  )
}

export default App
