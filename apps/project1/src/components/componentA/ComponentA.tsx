import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import Button from '../button/Button';
import styles from './ComponentA.module.scss';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: { ability: { name: string } }[];
}

const ComponentA: FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: { limit: 20 },
      });
      const pokemonDetails = await Promise.all(
        response.data.results.map((pokemon: { name: string }) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        )
      );
      setPokemons(pokemonDetails.map((res) => res.data));
      setError(null);
    } catch (err) {
      setError('Error fetching Pokemons. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pokemons.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? pokemons.length - 1 : prevIndex - 1));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (pokemons.length === 0) {
    return <div>Loading...</div>;
  }

  const currentPokemon = pokemons[currentIndex];

  return (
    <div className={styles.carousel}>
      <h2 className={styles.title}>{currentPokemon.name.toUpperCase()}</h2>
      <div className={styles.pokemonCard}>
        <img
          src={currentPokemon.sprites.front_default}
          alt={currentPokemon.name}
          className={styles.pokemonImage}
        />
      </div>
      <div className={styles.controls}>
        <Button
          onClick={handlePrev}
          variant="secondary"
          label="Anterior"
          startIcon={<Icon iconId="chevronLeft" />}
        />
        <Button
          onClick={handleNext}
          variant="secondary"
          label="Siguiente"
          endIcon={<Icon iconId="chevronRight" />}
        />
      </div>
    </div>
  );
};

export default ComponentA;
