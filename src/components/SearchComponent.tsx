import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { fetchCharactersByParams } from "../slices/characterSlice";
import { Link } from "react-router-dom";
import CharacterBreifCard from "./CharacterBreifCard";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
const SearchCharacters: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    species: "",
    type: "",
    gender: "",
    status: "",
    page: 1,
  });
  const dispatch = useAppDispatch();

  const characters = useSelector(
    (state: RootState) => state.characters.searchResults
  );
  const isLoading = useSelector((state: RootState) => state.characters.loading);
  const searchPages = useSelector(
    (state: RootState) => state.characters.searchPages
  );

  useEffect(() => {}, [searchParams, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    setSearchParams({ ...searchParams });
    dispatch(fetchCharactersByParams(searchParams));
  };

  const handleNextPage = () => {
    if (searchParams.page < searchPages) {
      setSearchParams({ ...searchParams, page: searchParams.page + 1 });
    }
    dispatch(fetchCharactersByParams(searchParams));
  };

  const handlePrevPage = () => {
    if (searchParams.page > 1) {
      setSearchParams({ ...searchParams, page: searchParams.page - 1 });
    }
    dispatch(fetchCharactersByParams(searchParams));
  };

  return (
    <div className="min-w-[100vh]">
      <div className="w-full  font-[500] h-[40vh] w-[50%] items-center flex justify-between flex-row ">
        <div className="flex flex-wrap flex-row h-[40px] w-[50%] gap-4">
          <input
            type="text"
            name="name"
            value={searchParams.name}
            onChange={handleChange}
            placeholder="Enter character name"
            className="p-2 mr-=1 bg-[rgb(34,37,54)]"
          />
          <input
            type="text"
            name="species"
            value={searchParams.species}
            onChange={handleChange}
            placeholder="Enter species"
            className=" p-2 mr-1 bg-[rgb(34,37,54)]"
          />
          <input
            type="text"
            name="type"
            value={searchParams.type}
            onChange={handleChange}
            placeholder="Enter type"
            className=" p-2 mr-1 bg-[rgb(34,37,54)]"
          />
          <input
            type="text"
            name="gender"
            value={searchParams.gender}
            onChange={handleChange}
            placeholder="Enter gender"
            className=" p-2 mr-1 bg-[rgb(34,37,54)]"
          />
          <input
            type="text"
            name="status"
            value={searchParams.status}
            onChange={handleChange}
            placeholder="Enter status"
            className=" p-2 mr-2 bg-[rgb(34,37,54)]"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-500  text-white p-2 rounded"
          >
            Search
          </button>
        </div>
        <img src="./images/wallpaer3.png " className="w-[50%]" />
      </div>
      <div className="flex items-center flex-row z-[10] h-[50px] gap-4 justify-end m-4">
        <button
          onClick={handlePrevPage}
          className="h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[rgb(34,37,54)]"
          disabled={searchParams.page === 1}
        >
          <FcPrevious />
        </button>
        <div className=" flex items-center flex-row gap-[2px] mx-[5px] py-1">
          <div>{searchParams.page}</div>
          <div>/</div>
          <div>{searchPages}</div>
        </div>
        <button
          onClick={handleNextPage}
          className="h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[rgb(34,37,54)]"
          disabled={searchParams.page === searchPages}
        >
          <FcNext />
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        characters && (
          <>
            <div className="grid grid-cols-4 gap-6 ">
              {characters.map((character, index) => (
                <Link to={`/character/${character.id}`} key={index}>
                  <CharacterBreifCard
                    image={character.image}
                    species={character.species}
                    name={character.name}
                    status={character.status}
                    location={character.location.name}
                  />
                </Link>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SearchCharacters;
