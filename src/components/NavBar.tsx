import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <div className="w-full h-[10vh] flex flex-row items-center justify-between ">
      <Link to={`/`} className="">
        <img src="./images/logo.png" className="w-[200px]" />
      </Link>
      <div>
        <Link to={`/search`} className="text-[20px]">
          search
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
