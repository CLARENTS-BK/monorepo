import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ComponentA from './ComponentA';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ComponentA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display loading message initially', () => {
    render(<ComponentA />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should fetch and display pokemons', async () => {
    const pokemons = [
      {
        name: 'bulbasaur',
        sprites: { front_default: 'https://example.com/bulbasaur.png' },
        abilities: [{ ability: { name: 'overgrow' } }],
      },
      {
        name: 'ivysaur',
        sprites: { front_default: 'https://example.com/ivysaur.png' },
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    ];

    mockedAxios.get.mockImplementation((url) => {
      if (url === 'https://pokeapi.co/api/v2/pokemon') {
        return Promise.resolve({ data: { results: pokemons.map((p) => ({ name: p.name })) } });
      }
      const name = url.split('/').pop();
      return Promise.resolve({ data: pokemons.find((p) => p.name === name) });
    });

    render(<ComponentA />);

    await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    });
  });

  test('should navigate between pokemons', async () => {
    const pokemons = [
      {
        name: 'bulbasaur',
        sprites: { front_default: 'https://example.com/bulbasaur.png' },
        abilities: [{ ability: { name: 'overgrow' } }],
      },
      {
        name: 'ivysaur',
        sprites: { front_default: 'https://example.com/ivysaur.png' },
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    ];

    mockedAxios.get.mockImplementation((url) => {
      if (url === 'https://pokeapi.co/api/v2/pokemon') {
        return Promise.resolve({ data: { results: pokemons.map((p) => ({ name: p.name })) } });
      }
      const name = url.split('/').pop();
      return Promise.resolve({ data: pokemons.find((p) => p.name === name) });
    });

    render(<ComponentA />);

    await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    });

    fireEvent.click(screen.getByText('Siguiente'));

    await waitFor(() => {
      expect(screen.getByText('IVYSAUR')).toBeInTheDocument();
      expect(screen.getByAltText('ivysaur')).toHaveAttribute('src', 'https://example.com/ivysaur.png');
    });

    fireEvent.click(screen.getByText('Anterior'));

    await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    });
  });

  test('should display error message when fetch fails', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject(new Error('Fetch failed')));
  
    render(<ComponentA />);
  
    await waitFor(() => {
      expect(screen.getByText('Error fetching Pokemons. Please try again later.')).toBeInTheDocument();
    });
  });
});
