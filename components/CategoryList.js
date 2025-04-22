import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const CategoryList = ({ categories, selectedCategory, onCategoryPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category.id || category.name || index}
          style={[
            styles.categoryPill,
            selectedCategory === category.id && styles.categoryPillActive,
          ]}
          onPress={() => onCategoryPress(category.id)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesContent: {
    paddingHorizontal: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.categoryPill,
    marginRight: 10,
  },
  categoryPillActive: {
    backgroundColor: colors.categoryPillActive,
  },
  categoryText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default CategoryList;
