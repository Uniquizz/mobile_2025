import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import * as Icon from 'react-native-feather';

const Header = ({
  showBack = false,
  onBackPress = () => {},
  title = '',
  showMenu = false,
  onMenuPress = () => {},
  userName = '',
}) => {
  return (
    <View style={styles.header}>
  {showBack && (
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Icon.ChevronLeft width={24} height={24} color={colors.textPrimary} />
    </TouchableOpacity>
  )}

  {showMenu ? (
    // HOME: saludo + menú
    <View style={styles.headerContent}>
      <View style={styles.userGreeting}>
        <Text style={styles.greetingText}>
          {userName ? `Hola, ${userName}` : 'Uniquiz'}
        </Text>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Icon.Menu width={24} height={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  ) : (
    // Cualquier otra pantalla: título centrado
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )}
</View>

  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 10,
  },
  menuButton: {
    marginLeft: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  
});

export default Header;
