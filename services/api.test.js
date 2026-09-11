import { getPosterUrl } from './api';

test('getPosterUrl monta a URL do pôster com o tamanho padrão', () => {
  const url = getPosterUrl('/abc123.jpg');
  expect(url).toBe('https://image.tmdb.org/t/p/w300/abc123.jpg');
});

test('getPosterUrl monta a URL do pôster com um tamanho customizado', () => {
  const url = getPosterUrl('/abc123.jpg', 'w500');
  expect(url).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
});
