import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import * as Icon from 'react-native-feather';

const PrimaryButton = ({ label, onPress, iconName = null, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // ahora acepta estilos externos
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        {iconName && Icon[iconName] && (
          <View style={styles.icon}>
            {React.createElement(Icon[iconName], {
              width: 20,
              height: 20,
              color: '#FFFFFF',
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  icon: {
    marginLeft: 5,
  },
});

export default PrimaryButton;
