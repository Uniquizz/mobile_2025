import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import blogCategories from '../data/blogCategories';

const { width, height } = Dimensions.get('window');

const HomeScreenView = ({
  userName,
  selectedCategory,
  onCategoryPress,
  blogEntry = {},
  streak,
  onStreakPress,
  onStartQuiz,
  fadeAnim,
  scaleAnim,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories */}
          <CategoryList
            categories={blogCategories}
            selectedCategory={selectedCategory}
            onCategoryPress={onCategoryPress}
          />

          {/* Featured Blog Entry */}
          {blogEntry?.title && (
            <BlogCard
              title={blogEntry.title}
              excerpt={blogEntry.excerpt}
              imageUrl={blogEntry.imageUrl}
            />
          )}

          {/* User Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statsColumn}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/100/2D2D2D/E94057?text=K' }}
                  style={styles.avatar}
                />
                <Text style={styles.avatarName}>{userName}</Text>
              </View>
            </View>

            <View style={styles.statsColumn}>
              <TouchableOpacity
                style={styles.streakContainer}
                onPress={onStreakPress}
              >
                <Text style={styles.streakEmoji}>🔥</Text>
                <View style={styles.streakInfo}>
                  <Text style={styles.streakCount}>{streak}</Text>
                  <Text style={styles.streakLabel}>Racha Actual</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="¡Quízate!"
            onPress={() => onStartQuiz?.()}
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
  },
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  statsColumn: {
    flex: 1,
    paddingHorizontal: 2,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  avatarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 15,
    padding: 15,
  },
  streakEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  streakInfo: {
    alignItems: 'flex-start',
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default HomeScreenView;
