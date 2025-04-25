import * as Icon from 'react-native-feather';
import { Text } from 'react-native';

export const renderIcon = (iconName, props) => {
  const IconComponent = Icon[iconName];
  if (IconComponent) {
    return <IconComponent {...props} />;
  }
  // Fallback for debugging
  console.log(`Icon not found: ${iconName}`);
  return <Text style={{ color: props.color || '#FFF' }}>⬅</Text>;
};
