import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { getPosterUrl } from '../services/api';

export default function MovieCard({ movie, onPress }) {
  const posterUrl = getPosterUrl(movie.poster_path, 'w300');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 8,
    alignItems: 'center',
  },
  poster: {
    width: 140,
    height: 210,
    borderRadius: 8,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
});
