# React Rick And Morty Universe

In this project, you will create a single-page application to display the Rick & Morty Character Universe.

## API to use

Rick And Morty API - <https://rickandmortyapi.com/api>

- [UI Design](https://rickandmortyapi.com/)
- [Docs](https://rickandmortyapi.com/documentation)

## Tech stack

- Typescript, all things.
- [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to setup React, using template react-ts.
- [Redux](https://redux.js.org/introduction/installation) for state management.
- [Tailwind](https://tailwindcss.com/docs/guides/vite) for styling.
- [React Router](https://reactrouter.com/en/main) for routing

## Acceptance Criteria

App will have the following routes and features:

- Routes
  - `/` or `/home` - **The home route**
    - [x] Fetch a list of characters from the Rick and Morty API's Characters endpoint. Use <https://rickandmortyapi.com/api/character>.
    - [x] Create a reusable CharacterCard and display a list as shown [here](https://rickandmortyapi.com/).
    - [x] Each card must display the `name`, `status`, `species`, `gender`, `image`.
    - [x] On clicking the name it should route to `/character/:characterID`.
  - `/character/:characterID` - **The character details route**
    - [x] Use this `:characterID` from params and fetch the character details. Use <https://rickandmortyapi.com/api/character/:characterID>.
    - [x] Display the CharacterCard along with `location` and `origin`.
    - [x] Display the list of episodes.
    - [x] On clicking the episode list item, it should route to `/episode/:episodeID`.
    - [x] On clicking the location/origin, it should route to `/location/:locationID`.
  - `/episode/:episodeID` - **The episode details route**
    - [x] Use this `:episodeID` from params and fetch the episode details. Use <https://rickandmortyapi.com/api/episode/:episodeID>.
    - [x] Display the `name`,`air date` and `episode number`.
    - [x] Display the list of characters in that episode. Use <https://rickandmortyapi.com/documentation/#get-multiple-characters>.
    - [x] On clicking the character list item, it should route to `/character/:characterID`.
  - `/location/:locationID` - **The location details route**
    - [x] Use this `:locationID` from params and fetch the location details. Use <https://rickandmortyapi.com/api/location/:locationID>.
    - [x] Display the `name`,`type` and `dimension`.
    - [x] Display the list of residents in that location. Use <https://rickandmortyapi.com/documentation/#get-multiple-characters>.
    - [x] On clicking the resident list item, it should route to `/character/:characterID`.
  - `/search` - **The route to search characters**
    - [x] Create search fields to search from list of characters using `name`, `status`, `species`, `type`, `gender` [querying the API](https://rickandmortyapi.com/documentation/#filter-characters). (To search for `rick`, you would request `/api/character/?name=rick`.)
    - [x] Display the list of characters from search results.
    - [x] Persist search form fields by using localstorage API.

- **Other Features**
  - [ ] Animate page transition and/or card loading.
  - [x] Add loaders for API calls/loading states.
  - [x] Add pagination in `home` and `search` page. See [this](https://rickandmortyapi.com/documentation/#info-and-pagination) for documentation..
- **Required No Repeat of API calls**
  - [x] On first call, details should be taken from the API call and stored in redux.
  - [x] On subsequent calls, details should be taken from redux and no API calls should be made.

- **Required Best practices:**
  - [x]  Consistent naming of: variables, functions, Components, and file/folder organization.
  - [x]  Consistent spacing of: line breaks, around arguments and before/after functions.
  - [x]  Consistent quotation usage.
  - [x]  Spell-check.

### Wubba Lubba Dub Dub
