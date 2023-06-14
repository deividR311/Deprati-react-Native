import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagButtonArrow from './Pagination/PagButtonArrow';
import PagNumber from './Pagination/PagNumber';

interface nPagination {
  pos1: number;
  pos2: number;
  pos3: number;
}

export default function Pagination({
  maxPag,
  onPress,
  onNext,
  onPrev
}: {
  maxPag: number;
  onPress(data: number): void;
  onNext(): void;
  onPrev(): void;
}) {
  const [select, setSelect] = useState<number>(1);
  const [numberPag, setNumberPag] = useState<nPagination>({
    pos1: 1,
    pos2: 2,
    pos3: 3
  });

  const onChange = (valueSelect: number) => {
    setSelect(valueSelect);
    onPress(valueSelect);
    if (valueSelect > numberPag.pos2 && valueSelect < maxPag)
      setNumberPag({
        pos1: numberPag.pos2,
        pos2: valueSelect,
        pos3: valueSelect + 1
      });
    else if (
      valueSelect !== 1 &&
      valueSelect !== numberPag.pos2 &&
      valueSelect < maxPag
    )
      setNumberPag({
        pos3: numberPag.pos2,
        pos2: valueSelect,
        pos1: valueSelect - 1
      });
  };

  const handleActive = (value: number) => {
    if (select === value) {
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (maxPag !== select) {
      onChange(select + 1);
      onNext();
    }
  };

  const handlePrev = () => {
    if (select > 1) {
      onChange(select - 1);
      onPrev();
    }
  };

  return (
    <View style={styles.containerPagination}>
      <PagButtonArrow onPress={() => handlePrev()} left={true} />
      <PagNumber
        number={numberPag.pos1}
        isActive={handleActive(numberPag.pos1)}
        onPress={() => onChange(numberPag.pos1)}
      />
      <PagNumber
        number={numberPag.pos2}
        isActive={handleActive(numberPag.pos2)}
        onPress={() => onChange(numberPag.pos2)}
      />
      {maxPag > 2 && (
        <PagNumber
          number={numberPag.pos3}
          isActive={handleActive(numberPag.pos3)}
          onPress={() => onChange(numberPag.pos3)}
        />
      )}
      <PagButtonArrow onPress={() => handleNext()} />
    </View>
  );
}
const styles = StyleSheet.create({
  containerPagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '50%',
    height: 50,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
