import React, { useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as Icon from 'react-native-feather';
import colors from '../styles/colors';
import universities from '../data/universities';
import { useNavigation } from '@react-navigation/native';
import useQuizStore from '../store/useQuizStore';
import { RootStackParamList } from '../router/stack.interface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { University } from '../interfaces/quiz.interface';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

const SchoolSelectionScreen = () => {
  const { resetAnimations, fadeOut, fadeIn, setUniversity, ui: {fadeAnim, scaleAnim} } = useQuizStore()
  // const navigation = useNavigation<NavigationProp>();
  const handleUniversitySelect = (university: University) => {
    setUniversity(university);
    fadeOut(() => {
      resetAnimations();
      // navigation.navigate('QuizConfig')
    })
  };

  useEffect(() => {
    resetAnimations()
    fadeIn()
  }, [])


  const chunkArray = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );

  const universityGrid = chunkArray(universities, 2);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <Text style={styles.title}>Selecciona tu Universidad</Text>
      <Text style={styles.subtitle}>Elige la universidad para comenzar el quiz</Text>

      <View style={styles.gridContainer}>
        {universityGrid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((university: University) => {
              const IconComponent = Icon[university.iconName];

              return (
                <TouchableOpacity
                  key={university.id}
                  style={[styles.card, { backgroundColor: university.color }]}
                  onPress={() => handleUniversitySelect(university)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      {IconComponent ? (
                        <IconComponent width={28} height={28} color="#FFFFFF" />
                      ) : (
                        <Text style={{ color: 'white', fontSize: 12 }}>
                          {university.iconName || 'icon?'}
                        </Text>
                      )}
                    </View>

                    <Text style={styles.universityName}>{university.name}</Text>

                    <View style={styles.chevronContainer}>
                      <Icon.ChevronRight width={20} height={20} color="#FFFFFF" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {row.length === 1 && <View style={styles.placeholder} />}
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  card: {
    width: width / 2.3,
    height: width / 2.3,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 8,
  },
  placeholder: {
    width: width / 2.3,
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  universityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  chevronContainer: {
    alignItems: 'flex-end',
  },
});

export default SchoolSelectionScreen;
