import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCharacters } from "../slices/characterSlice";
import Pagination from "./Pagination";
import { RootState, useAppDispatch } from "../store/store";
import CharacterBreifCard from "./CharacterBreifCard";

const CharacterList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { characters, loading, error, page, characterByIds } = useSelector(
    (state: RootState) => state.characters
  );
  useEffect(() => {
    dispatch(fetchCharacters(page)); // Fetch characters for the first page initially
    console.log(characterByIds);
  }, [page]);

  return (
    <div>
      <div className="w-full  font-[500] h-[35vh] flex flex-col items-center justify-center">
        <img src="./images/walpaper2.png " alt="ok" className="w-[60%]" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Pagination />
      <div className="grid grid-cols-3 gap-6 ">
        {characters.map((character) => (
          <Link key={character.id} to={`/character/${character.id}`}>
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
    </div>
  );
};

export default CharacterList;
