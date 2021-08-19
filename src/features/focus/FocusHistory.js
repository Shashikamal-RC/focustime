import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <>
      {item.status === 1 ? (
        <Text style={styles.completedHistoryItem}>{item.subject}</Text>
      ) : (
        <Text style={styles.canceledHistoryItem}>{item.subject}</Text>
      )}
    </>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                title="Clear"
                size={75}
                onPress={() => {
                  onClear();
                }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  completedHistoryItem: {
    color: 'green',
    fontSize: fontSizes.md,
  },
  canceledHistoryItem: {
    color: 'red',
    fontSize: fontSizes.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
