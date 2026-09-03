import axios from 'axios';

const API_KEY = 'SUA_API_KEY_AQUI';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export async function getPopularMovies() {
  const response = await api.get('/movie/popular');
  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
}

export default api;
