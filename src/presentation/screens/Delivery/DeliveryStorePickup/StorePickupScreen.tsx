//Libs
import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List } from 'react-native-paper';
//hooks
import useStorePickup, { CITY, STORE } from './hook/useStorePickup.hook';

//components
import InfoStoreComponent from './components/InfoStoreComponent';
import InfoPersonalComponent from './components/InfoPersonalComponent';
import ItemProduct from './components/ItemProduct';
import { StorePickupSkeleton } from './components/StorePickupSkeleton/StorePickupSkeleton';
import TemplatePage from '../../../common-components/template-page';
import SelectInput from '../../../common-components/inputs/SelectInput';
import { ButtonOutlined } from '../../../common-components/buttons/Button';
import {
  RightIconAccordion,
  stylesAccordion
} from '../../../common-components/RightIconAccordion/RightIconAccordion';
import { styles } from './StorePickup.StyleSheet';

export default function StorePickupScreen() {
  const {
    dataCart,
    //formik
    values,
    errorsFormik,
    onChange,
    onChangeText,
    isLoading,
    //ref
    storeRef,
    cityRef,
    handleReset,
    /////
    cities,
    stores,
    currentStore,
    ////
    accordion
  } = useStorePickup();

  return (
    <TemplatePage
      loading={isLoading}
      skeleton={<StorePickupSkeleton />}
      error={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text style={styles.title}>
              Elige la tienda más cercana para ti.
            </Text>
          </View>
          <View style={{}}>
            <SelectInput
              testID={'deliverythirdparty_city'}
              selectRef={cityRef}
              styles={styles.inputCity}
              error={Object.keys(errorsFormik).includes(CITY)}
              items={cities}
              onChange={(text: string) => onChange(CITY, text)}
              value={values.city}
              inputBasic={true}
              label="Selecciona ciudad"
            />
            <SelectInput
              testID={'deliverythirdparty_store'}
              selectRef={storeRef}
              styles={styles.inputStore}
              error={Object.keys(errorsFormik).includes(STORE)}
              items={stores}
              onChange={(text: string) => onChange(STORE, text)}
              value={values.store}
              inputBasic={true}
              label="Selecciona la tienda"
            />
            {!currentStore && (
              <ButtonOutlined
                title="LIMPIAR"
                style={{
                  ...styles.buttonClean,
                  width: 180,
                  marginVertical: 14
                }}
                onPress={handleReset}
              />
            )}
            {currentStore && (
              <>
                <InfoStoreComponent store={currentStore} />
                <View style={styles.contentButton}>
                  <ButtonOutlined
                    title="LIMPIAR"
                    style={styles.buttonClean}
                    onPress={handleReset}
                  />
                </View>
                <InfoPersonalComponent
                  values={values}
                  onChangeText={onChangeText}
                  errors={errorsFormik}
                />
              </>
            )}
          </View>
        </View>
        <List.Accordion
          style={[styles.accordion, stylesAccordion.container__accordion]}
          titleStyle={styles.accordion_title}
          expanded={accordion.isExpanded}
          onPress={() => accordion.setIsExpanded(!accordion.isExpanded)}
          title={'Artículos para retiro en tienda'}
          right={RightIconAccordion}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            data={dataCart?.entries ?? []}
            renderItem={x => {
              return <ItemProduct data={x.item} />;
            }}
          />
        </List.Accordion>
      </ScrollView>
    </TemplatePage>
  );
}
