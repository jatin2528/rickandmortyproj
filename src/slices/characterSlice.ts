import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

interface Origin {
  name: string;
  url: string;
}
interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
interface SearchParams {
  name: string;
  species: string;
  type: string;
  gender: string;
  status: string;
  page: number;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
interface CharactersListState {
  searchPages: number;
  locations: Record<string, Location>;
  characterByIds: Record<string, Character>;
  characterByPages: Record<number, Character[]>;
  characters: Character[];
  loading: boolean;
  error: string | null;
  pageInfo: {
    count: number;
    pages: number;
  };
  page: number;
  episodes: Record<string, Episode>;
  searchResults: Character[];
}

// Helper function to load state from local storage
const loadStateFromLocalStorage = (): CharactersListState => {
  const serializedState = localStorage.getItem("charactersState");
  if (serializedState === null) {
    return {
      searchPages: 1,
      characterByIds: {},
      characterByPages: {},
      characters: [],
      loading: false,
      error: null,
      pageInfo: {
        count: 1,
        pages: 1,
      },
      page: 1,
      episodes: {},
      locations: {},
      searchResults: [],
    };
  }
  return JSON.parse(serializedState);
};

// Helper function to save state to local storage
const saveStateToLocalStorage = (state: CharactersListState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("charactersState", serializedState);
};

const initialState: CharactersListState = loadStateFromLocalStorage();

export const fetchCharacters = createAsyncThunk<ApiResponse, number>(
  "characters/fetch",
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    if (state.characters.characterByPages[page] !== undefined) {
      console.log("no api");
      return {
        info: state.characters.pageInfo,
        results: state.characters.characterByPages[page],
      };
    }
    console.log("api call");
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);

export const fetchCharacterById = createAsyncThunk<Character, string>(
  "characters/fetchById",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    if (state.characters.characterByIds[id]) {
      console.log("no api");
      const logData: Character = state.characters.characterByIds[id];
      return logData;
    }
    console.log("api call");
    try {
      const response = await axios.get<Character>(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);
export const fetchEpisodeById = createAsyncThunk<Episode, string>(
  "episodes/fetchById",
  async (id: string) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const logData: Episode = response.data;
      return logData;
    } catch (error) {
      throw new Error("Failed to fetch episode data");
    }
  }
);
export const fetchLocationById = createAsyncThunk<Location, string>(
  "locations/fetchById",
  async (id: string) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      const logData: Location = response.data;
      return logData;
    } catch (error) {
      throw new Error("Failed to fetch location data");
    }
  }
);
export const fetchCharactersByParams = createAsyncThunk(
  "characters/fetchCharactersByParams",
  async (params: SearchParams) => {
    let query = "https://rickandmortyapi.com/api/character/?";
    const queryParams: string[] = [];

    if (params.name) queryParams.push(`name=${params.name}`);
    if (params.species) queryParams.push(`species=${params.species}`);
    if (params.type) queryParams.push(`type=${params.type}`);
    if (params.gender) queryParams.push(`gender=${params.gender}`);
    if (params.status) queryParams.push(`status=${params.status}`);
    queryParams.push(`page=${params.page}`);
    query += queryParams.join("&&");
    const response = await axios.get(query);
    const logData: ApiResponse = response.data;
    return logData;
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload; // Update page field
    },
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    setEpisode: (state, action: PayloadAction<Episode>) => {
      const { id } = action.payload;
      state.episodes[id.toString()] = action.payload;
    },
    setSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.characters = [...action.payload.results];
          state.pageInfo = action.payload.info;
          state.characterByPages[state.page] = action.payload.results;
          action.payload.results.forEach((character) => {
            state.characterByIds[character.id.toString()] = character;
          });
          state.error = null;
          saveStateToLocalStorage(state);
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch characters";
      })
      .addCase(fetchCharacterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCharacterById.fulfilled,
        (state, action: PayloadAction<Character>) => {
          state.loading = false;
          state.characterByIds[action.payload.id.toString()] = action.payload;
          state.error = null;
          saveStateToLocalStorage(state);
        }
      )
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch character";
      })
      .addCase(fetchEpisodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch episode by ID fulfilled
      .addCase(
        fetchEpisodeById.fulfilled,
        (state, action: PayloadAction<Episode>) => {
          state.loading = false;
          state.episodes[action.payload.id.toString()] = action.payload;
          saveStateToLocalStorage(state);
        }
      )
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch characters";
      })
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch location by ID fulfilled
      .addCase(
        fetchLocationById.fulfilled,
        (state, action: PayloadAction<Location>) => {
          state.loading = false;
          state.locations[action.payload.id.toString()] = action.payload;
          saveStateToLocalStorage(state);
        }
      )
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch characters";
      })
      .addCase(fetchCharactersByParams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharactersByParams.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.searchPages = action.payload.info.pages;
        saveStateToLocalStorage(state);
      })
      .addCase(fetchCharactersByParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch characters";
      });
  },
});

export const { setPage, setCharacters, setEpisode, setSearchResults } =
  characterSlice.actions;
export default characterSlice.reducer;
