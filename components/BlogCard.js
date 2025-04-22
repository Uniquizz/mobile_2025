import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const BlogCard = ({ title, excerpt, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Destacados</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Text style={styles.excerpt}>{excerpt}</Text>
      </View>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.homeBg,
    borderRadius: 20,
    padding: 14,
    marginVertical: 20,
    marginHorizontal: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  excerpt: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginLeft: 15,
    alignSelf: 'center',
  },
});

export default BlogCard;
