import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import * as Icon from 'react-native-feather';

const OptionCard = ({
  option,
  index,
  isSelected,
  isAnswered,
  isCorrect,
  isCorrectAnswer,
  onSelect
}) => {
  const getBackground = () => {
    if (!isAnswered) return styles.optionButton;
    if (isCorrectAnswer) return [styles.optionButton, styles.correctOption];
    if (isSelected) return [styles.optionButton, styles.incorrectOption];
    return styles.optionButton;
  };

  const getIndexStyle = () => {
    if (!isAnswered) return styles.optionIndex;
    if (isCorrectAnswer) return [styles.optionIndex, styles.correctOptionIndex];
    if (isSelected) return [styles.optionIndex, styles.incorrectOptionIndex];
    return styles.optionIndex;
  };

  const renderResultIcon = () => {
    if (!isAnswered) return null;

    if (isSelected && isCorrect) {
      return <Icon.Check width={20} height={20} color={colors.success} />;
    }
    if (isSelected && !isCorrect) {
      return <Icon.X width={20} height={20} color={colors.error} />;
    }
    if (!isSelected && isCorrectAnswer) {
      return <Icon.Check width={20} height={20} color={colors.success} />;
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={getBackground()}
      onPress={onSelect}
      disabled={isAnswered}
    >
      <View style={styles.optionContent}>
        <View style={getIndexStyle()}>
          <Text style={styles.optionIndexText}>{String.fromCharCode(65 + index)}</Text>
        </View>
        <Text style={styles.optionText}>{option}</Text>
      </View>

      <View style={styles.optionResultIcon}>
        {renderResultIcon()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: 'rgba(181, 229, 211, 0.2)',
    borderWidth: 1,
    borderColor: colors.success,
  },
  incorrectOption: {
    backgroundColor: 'rgba(233, 64, 87, 0.2)',
    borderWidth: 1,
    borderColor: colors.error,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  correctOptionIndex: {
    backgroundColor: colors.success,
  },
  incorrectOptionIndex: {
    backgroundColor: colors.error,
  },
  optionIndexText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  optionResultIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OptionCard;
