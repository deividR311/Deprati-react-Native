import React, { useMemo } from 'react';
import { COLORS } from '../../../../../../application/common/colors';
import ItemColors from '../../components/colors/ItemColors';
import { handleDecodeURI } from '../../components/utils/functionModalFIlter';
import { Breadcrumb, ValueFacet } from '../../interfaces/iProducts';
import CheckOther from '../CheckOther';
import CheckboxComp from '../../../../../common-components/checkboxs';
import { styles } from '../stylesModalFilter';
import { testProps } from '../../../../../../application/utils/accessibleId';

const SIZE = 'talla';
const COLOR = 'Color';
const CODECOLOR = 'color';

const ComponentItem = ({
  name,
  xItem,
  checkFilter,
  onPress,
  breadcrumbs,
  testId = ''
}: {
  name: string;
  xItem: ValueFacet;
  checkFilter: any;
  breadcrumbs: Breadcrumb[];
  onPress(): void;
  testId: string;
}) => {
  const isCheck = useMemo(() => {
    if (xItem.selected) return true;
    return false;
  }, [xItem.selected]);

  if (name !== SIZE && name !== COLOR)
    return (
      <CheckboxComp
        testId={testId}
        onPress={() => onPress()}
        color={COLORS.BRAND}
        // status={
        //   xItem.selected || checkFilter[xItem.name] ? 'checked' : 'unchecked'
        // }
        status={isCheck ? 'checked' : 'unchecked'}
        styleContainer={styles.content__checkbox}
        textStyle={styles.content__checkbox_textStyle}
        label={xItem.name}
      />
    );

  if (name === SIZE)
    return (
      <CheckOther
        {...testProps(testId)}
        title={xItem.name}
        isCheck={isCheck}
        onPress={() => onPress()}
      />
    );

  return (
    <ItemColors
      {...testProps(testId)}
      isCheck={isCheck}
      styleContainer={{ marginBottom: 5 }}
      styleContentImage={{ borderWidth: 2 }}
      dataUri={handleDecodeURI(
        xItem.name,
        xItem.selected,
        xItem.query.query.value,
        breadcrumbs
      )}
      onPress={() => onPress()}
      size={36}
    />
  );
};

export default ComponentItem;
