import { useEffect } from "react";
import { getSuperheroes } from "../api/superheroApi";
import { useSuperheroContext } from "../contexts/SuperheroContext";

const useSuperheroes = (page) => {
  const { setSuperheroes, setLoading, setError } = useSuperheroContext();

  useEffect(() => {
    setLoading(true);
    getSuperheroes(page)
      .then((response) => setSuperheroes(response.data.superheroes))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { superheroes: useSuperheroContext().superheroes };
};

export default useSuperheroes;
