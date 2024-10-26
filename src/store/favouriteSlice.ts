// src/store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Track {
  title: string;
  description: string;
  year: string;
  url: string;
  mpUrl: string;
  id:string;    
}

interface FavoritesState {
  tracks: Record<string, Track>; // Store tracks with id as key
}

const initialState: FavoritesState = {
  tracks: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteTracks: (state, action: PayloadAction<Array<{ id: string } & Track>>) => {
      const newTracks: Record<string, Track> = {};
      action.payload.forEach(track => {
        newTracks[track.id] = { 
          title: track.title,
          description: track.description,
          year: track.year,
          url: track.url,
          mpUrl: track.mpUrl,
          id:track.id
        };
      });
      state.tracks = newTracks; // Update the tracks in state
    },
    clearFavoriteTracks: (state) => {
      state.tracks = {}; // Clear all favorite tracks
    },
  },
});

export const { setFavoriteTracks, clearFavoriteTracks } = favoritesSlice.actions;
export default favoritesSlice.reducer;
