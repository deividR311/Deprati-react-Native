import { View, Text, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function useKeyBoardListener({
  showTotalsBand
}: {
  showTotalsBand: (state: boolean) => void;
}) {
  const [padding, setpadding] = useState(160);
  // useEffect(() => {
  // const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //   showTotalsBand(false)
  //   setpadding(0)
  // })
  // const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //   showTotalsBand(true)
  //   setpadding(160)
  // })

  // return () => {
  //   showSubscription.remove()
  //   hideSubscription.remove()
  // }
  // }, [])
  return {
    padding
  };
}
