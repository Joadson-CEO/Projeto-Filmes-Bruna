import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPosterUrl } from '../services/api';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>

      <View style={styles.row}>
        <Ionicons name="star" size={18} color="#f5c518" />
        <Text style={styles.info}>{movie.vote_average}</Text>
      </View>

      <Text style={styles.info}>Lançamento: {movie.release_date}</Text>
      <Text style={styles.overview}>
        {movie.overview ? movie.overview : 'Sinopse não disponível.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  overview: {
    fontSize: 15,
    marginTop: 12,
    lineHeight: 22,
  },
});
