import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { paddingSizes, fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  console.log("check")
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would you like to focus on ?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={({ nativeEvent }) => {
            setSubject(nativeEvent.text);
          }}
        />
        <RoundedButton
          size={50}
          title="+"
          onPress={() => {
            addSubject(subject);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: 50,
  },
  innerContainer: {
    flex: 1,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.lg,
  },
});
