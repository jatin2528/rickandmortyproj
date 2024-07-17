import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { fetchEpisodeById, fetchCharacterById } from "../slices/characterSlice";
import CharacterBreifCard from "./CharacterBreifCard";

interface EpisodeCharacter {
  id: number;
}

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: EpisodeCharacter[];
}

const Episode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const episode = useSelector((state: RootState) =>
    id ? state.characters.episodes[id] : undefined
  );
  const characterByIds = useSelector(
    (state: RootState) => state.characters.characterByIds
  );
  const isLoading = useSelector((state: RootState) => state.characters.loading);
  const [fetchedCharacters, setFetchedCharacters] = useState<string[]>([]);

  useEffect(() => {
    if (id && !episode) {
      dispatch(fetchEpisodeById(String(id)));
    }
    if (episode) {
      episode.characters.forEach((character) => {
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
  }, [id, episode, characterByIds, dispatch]);

  if (!episode) {
    return <p>Episode not found.</p>;
  }

  if (isLoading) {
    return <p className="text-center">Loading episode...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Episode {episode.id}</h3>
        <p>
          <strong>Name:</strong> {episode.name}
        </p>
        <p>
          <strong>Episode:</strong> {episode.episode}
        </p>
        <p>
          <strong>Air:</strong> {episode.air_date}
        </p>

        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">Characters:</h4>
          <div className="grid grid-cols-4 gap-6 ">
            {episode.characters.map((character: string, index: number) => {
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

export default Episode;
