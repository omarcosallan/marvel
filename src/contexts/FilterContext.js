import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const resetFilter = () => {
    setFilter("");
  };

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, handleFilterChange, resetFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
}
