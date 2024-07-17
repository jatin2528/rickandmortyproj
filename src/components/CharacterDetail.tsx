import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import { fetchCharacterById } from "../slices/characterSlice";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector((state: RootState) => state.characters.loading);
  const dispatch = useAppDispatch();
  const character = useSelector((state: RootState) =>
    id ? state.characters.characterByIds[id] : undefined
  );

  useEffect(() => {
    if (id && !character) {
      dispatch(fetchCharacterById(String(id)));
    }
  }, [id, character, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!character) {
    return <p>Character not found.</p>;
  }

  return (
    <div className="min-h-[90vh] flex items-center  justify-center">
      <div className="w-fit-content  h-fit-content bg-[rgb(34,37,54)]  gap-8  flex flex-row p-6 rounded-lg">
        <img
          src={character.image}
          alt={character.name}
          className="w-[50%] h-full rounded-lg mb-4"
        />
        <div className="w-[50%] flex flex-col justify-between text-[20px] font-[100]">
          <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
          <p className="">Status: {character.status}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <div>
            <p>Episodes:</p>
            <ul className="flex flex-row gap-2 flex-wrap">
              {character.episode.map((episodeUrl, index) => (
                <Link
                  key={index}
                  to={`/episode/${episodeUrl.split("/").slice(-1)}`}
                >
                  <li className="bg-[rgb(29,55,87,0.5)] text-blue-400 p-2 rounded-sm text-sm">
                    {episodeUrl.split("/").slice(-1)}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <p>Location:</p>
            <Link
              to={`/location/${character.location.url.split("/").slice(-1)}`}
            >
              {character.location.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
