import React from 'react'

export default function Authorize() {

    const handleClick = () => {
        const client_id = "0d3744c5b4094b278635aa41c325b876";
        const redirect_uri = "https://spotify-clone-ebon-one.vercel.app/";

        const scope = [
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
        ];

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
    }


  return (
    <div className='h-screen w-full bg-emerald-500 text-white'>
        <div className=' flex flex-col'>
            <div className='mt-48 w-full flex flex-row justify-center'>
                <img className='h-40 w-75' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spitofy_logo" />
            </div>
            <div className='text-xl text-center font-bold pt-5'>
                Click the button to Login
            </div>
            <div className='text-center pt-5'>
                <button onClick={handleClick} className='bg-black hover:bg-black/85 font-semibold text-emerald-500 px-3 py-1 rounded-md'>
                    Login
                </button>
            </div>
        </div>
    </div>
  )
}
