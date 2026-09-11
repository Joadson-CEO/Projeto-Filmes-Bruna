import axios from 'axios';

const API_KEY = '8dde86af5dfdc221742b2c463d214d7c';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export function getPosterUrl(posterPath, size = 'w300') {
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export async function getPopularMovies() {
  const response = await api.get('/movie/popular');
  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
}

export default api;
