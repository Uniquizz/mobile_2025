import React from 'react';
import { Text, View } from 'react-native';
import { getSubjectColor, getSubjectIcon, renderIcon } from '../utils/subjectUtils';



const SubjectPill = ({ subject, color, icon }) => {
  return (
    <View style={{
      backgroundColor: color,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    }}>

      <Text style={{
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
      }}>
        {subject}
      </Text>
    </View>
  );
};

export default SubjectPill;
