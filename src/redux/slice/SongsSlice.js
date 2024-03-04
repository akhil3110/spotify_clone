import { createSlice } from '@reduxjs/toolkit'

export const songsSlice = createSlice({
    name: 'songs',
    initialState:{
        playlists: [],
        data: null,
        initialData: [],
        selectedPlaylistId:"4hMcqod7ERKJ9mtjgdimeV",
        selectedPlaylist: null,
        currentlyPlaying: null,
        playerState: false
    },
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload
        },
        setData: (state, action) => {
            state.data = action.payload
            console.log(state.data, "slice")
        },
        setInitialData: (state, action) => {
            state.initialData = action.payload
        },
        setSelectedPlaylistId: (state, action) => {
            state.selectedPlaylistId = action.payload
        },
        setSelectedPlaylist: (state, action) => {
            state.selectedPlaylist = action.payload
        },
        setCurrentlyPlaying: (state, action) => {
            state.currentlyPlaying = action.payload
        },
        setPlayerState: (state, action) => {
            state.playerState = action.payload
        }
    }
})

export const { setPlaylists, setData,setInitialData,setSelectedPlaylistId,setSelectedPlaylist,setCurrentlyPlaying,setPlayerState } = songsSlice.actions
export default songsSlice.reducer