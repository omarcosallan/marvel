import { createContext, useContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState((pageNumber - 1) * 30);

  return (
    <CharacterContext.Provider
      value={{
        loading,
        setLoading,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        offset,
        setOffset,
        setPageNumber,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
}
