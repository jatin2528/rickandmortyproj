import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import {
  fetchLocationById,
  fetchCharacterById,
} from "../slices/characterSlice";
import CharacterBreifCard from "./CharacterBreifCard";

const Location: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const location = useSelector((state: RootState) =>
    id ? state.characters.locations[id] : undefined
  );
  const characterByIds = useSelector(
    (state: RootState) => state.characters.characterByIds
  );
  const isLoading = useSelector((state: RootState) => state.characters.loading);
  const [fetchedCharacters, setFetchedCharacters] = useState<string[]>([]);

  useEffect(() => {
    if (id && !location) {
      dispatch(fetchLocationById(String(id)));
    }
    if (location) {
      location.residents.forEach((character) => {
        const characterId = character.split("/").slice(-1)[0];
        if (
          !characterByIds[characterId] &&
          !fetchedCharacters.includes(characterId)
        ) {
          dispatch(fetchCharacterById(characterId));
          setFetchedCharacters((prevState) => [...prevState, characterId]);
        }
      });
    }
  }, [id, location, characterByIds, dispatch]);

  if (!location) {
    return <p>location not found.</p>;
  }

  if (isLoading) {
    return <p className="text-center">Loading location...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">location Details</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">location {location.id}</h3>
        <p>
          <strong>Name:</strong> {location.name}
        </p>

        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">Characters:</h4>
          <div className="grid grid-cols-3 gap-6">
            {location.residents.map((character: string, index: number) => {
              const characterId = character.split("/").slice(-1)[0];
              const characterData = characterByIds[characterId];
              return (
                <Link to={`/character/${characterId}`} className="" key={index}>
                  {characterData && (
                    <CharacterBreifCard
                      image={characterData.image}
                      species={characterData.species}
                      name={characterData.name}
                      status={characterData.status}
                      location={characterData.location.name}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
