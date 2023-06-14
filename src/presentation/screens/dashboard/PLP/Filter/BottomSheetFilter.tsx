import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { COLORS } from '../../../../../application/common/colors';
import { styles } from './stylesBottomSheetFilter';
import { useFilterPLP } from '../hook/useFilterPLP';
import { PropsModalFilter } from '../interfaces';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import HeadModal from './components/HeadModal';
import {
  RightIconAccordion,
  stylesAccordion
} from '../../../../common-components/RightIconAccordion/RightIconAccordion';
import layout from '../../../../../application/common/layout';
import TitleAcordion from './components/TitleAcordion';
import ComponentItem from './components/ComponentItem';
import { testProps } from '../../../../../application/utils/accessibleId';
import {
  ButtonOutlined,
  MainButton
} from '../../../../common-components/buttons/Button';

const BottomSheetFilter = (props: PropsModalFilter) => {
  const {
    dataFacet,
    loadingFacet,
    isExpanded,
    handleExpanded,
    handleClose,
    checkFilter,
    dataResult,
    breadcrumbs,
    handleGetProductsService,
    disabledClear,
    handleClearFilters,
    handleShowResults
  } = useFilterPLP(props);

  return (
    <BottomSheet
      percentage={75}
      show={props.show}
      canDrop={false}
      onCloseRequest={handleClose}
      header={
        <>
          <View style={styles.close}>
            <IconButton
              testID="close_modal"
              iconName="close"
              onPress={handleClose}
            />
          </View>
          <HeadModal totalResults={dataFacet.totalResults} />
        </>
      }
      paddingHorizontal={0}
      contentContainerStyle={styles.container}
      footerPermanent={
        <View style={styles.container__buttons}>
          <View style={styles.container__buttons_clear}>
            <ButtonOutlined
              disabled={disabledClear}
              onPress={() => handleClearFilters()}
              title="BORRAR FILTROS"
            />
          </View>
          <View style={styles.container__buttons_show}>
            <MainButton
              testID={'filter_show_result'}
              onPress={() => handleShowResults()}
              title="MOSTRAR RESULTADOS"
            />
          </View>
        </View>
      }>
      {loadingFacet && <ActivityIndicator size="large" color={COLORS.DARK70} />}
      {dataFacet.valueFacet && (
        <ScrollView
          style={{ backgroundColor: COLORS.WHITE }}
          contentContainerStyle={{ width: 320 }}
          showsVerticalScrollIndicator={false}>
          {dataFacet.valueFacet.map((xList, indexList) => {
            return (
              <View
                key={`${xList.name}-${indexList}`}
                accessible={layout.isIos ? false : true}>
                <Divider />
                <List.Accordion
                  {...testProps(`filter${indexList}`)}
                  style={stylesAccordion.container__accordion}
                  titleStyle={styles.content__accordion_title}
                  expanded={isExpanded[xList.name]}
                  onPress={() => handleExpanded(xList.name)}
                  title={<TitleAcordion xList={xList} />}
                  right={RightIconAccordion}>
                  <View style={styles.content_accordion}>
                    {xList.values.map((xItem, indexItem) => {
                      return (
                        <ComponentItem
                          testId={`check_filter${indexItem}`}
                          key={`item-${indexItem}`}
                          name={xList.name}
                          xItem={xItem}
                          checkFilter={checkFilter}
                          breadcrumbs={dataResult?.breadcrumbs ?? breadcrumbs}
                          onPress={() =>
                            handleGetProductsService(
                              xItem.query.query.value,
                              xItem.name,
                              xItem.selected
                            )
                          }
                        />
                      );
                    })}
                  </View>
                </List.Accordion>
              </View>
            );
          })}
        </ScrollView>
      )}
    </BottomSheet>
  );
};

export default BottomSheetFilter;
