import { createContext, useContext, useState } from "react";

const SuperheroContext = createContext();

export const useSuperheroContext = () => useContext(SuperheroContext);

export const SuperheroProvider = ({ children }) => {
  const [superheroes, setSuperheroes] = useState([]);
  const [currentSuperhero, setCurrentSuperhero] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <SuperheroContext.Provider
      value={{
        superheroes,
        setSuperheroes,
        currentSuperhero,
        setCurrentSuperhero,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SuperheroContext.Provider>
  );
};
