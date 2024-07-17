import { Link } from "react-router-dom";

interface CharacterBreifCardInterface {
  name: string;
  image: string;
  status: string;
  location: string;
  species: string;
}

const CharacterBreifCard: React.FC<CharacterBreifCardInterface> = ({
  image,
  name,
  status,
  location,
  species,
}) => {
  return (
    <div className="bg-[rgb(34,37,54)] p-2 rounded-lg flex flex-row gap-4 items-center relative">
      <div className="overflow-hidden group w-[50%] h-[25vh] rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full mb-2 group-hover:scale-125 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-between ">
        <div>
          <p className="text-[rgb(159,158,159)]">Name:</p>
          <p>{name}</p>
        </div>
        <div>
          <p className="text-[rgb(159,158,159)]">Species Type:</p>
          <p>{species}</p>
        </div>
        <div>
          <p className="text-[rgb(159,158,159)]">Last Known Status:</p>
          <p>{status}</p>
        </div>
        <div>
          <p className="text-[rgb(159,158,159)]">Last Known Location:</p>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterBreifCard;
