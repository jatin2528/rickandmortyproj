import React from "react";
import { useSelector } from "react-redux";
import { setPage, setCharacters } from "../slices/characterSlice";
import { RootState, useAppDispatch } from "../store/store";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
const Pagination: React.FC<{}> = () => {
  const currentPage = useSelector((state: RootState) => state.characters.page);
  const totalPages = useSelector(
    (state: RootState) => state.characters.pageInfo.pages
  );
  const characterByPages = useSelector(
    (state: RootState) => state.characters.characterByPages
  );

  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      if (characterByPages[currentPage + 1]) {
        dispatch(setCharacters(characterByPages[currentPage + 1]));
      }
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (characterByPages[currentPage - 1]) {
        dispatch(setCharacters(characterByPages[currentPage - 1]));
        dispatch(setPage(currentPage - 1));
        return;
      }
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <div className="flex items-center flex-row z-[10] h-[50px] gap-4 justify-end m-4">
      <button
        onClick={handlePrevPage}
        className="h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[rgb(34,37,54)]"
        disabled={currentPage === 1}
      >
        <FcPrevious />
      </button>
      <div className=" flex items-center flex-row gap-[2px] mx-[5px] py-1">
        <div>{currentPage}</div>
        <div>/</div>
        <div>{totalPages}</div>
      </div>
      <button
        onClick={handleNextPage}
        className="h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[rgb(34,37,54)]"
        disabled={currentPage === totalPages}
      >
        <FcNext />
      </button>
    </div>
  );
};

export default Pagination;
