import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { CountDown } from '../../components/CountDown';
import { colors } from '../../utils/colors';
import { spacing, paddingSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate();
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };


  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.coutdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.taskArea}>
        <Text style={styles.title}>Focusing on</Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>

      <View style={styles.progressBarSpacing}>
        <ProgressBar progress={progress} style={styles.progressBarStyle} />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}></RoundedButton>
        ) : (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}></RoundedButton>
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={()=>{clearSubject()}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskArea: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coutdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: paddingSizes.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarStyle: {
    color: colors.lightBlue,
    height: spacing.md,
  },
  progressBarSpacing: {
    paddingTop: paddingSizes.lg,
  },
  clearSubject:{
    paddingBottom: paddingSizes.md,
    paddingLeft: paddingSizes.lg
  }
});
