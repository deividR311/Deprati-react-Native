//libs
import React, { useCallback, useEffect, useMemo } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

//components
import { MainButton } from '../../../../common-components/buttons/Button';
import TemplatePage from '../../../../common-components/template-page';
import CardOrderInitial from '../components/CardOrderInitial';
import NoReturns from '../components/NoReturns';
import { SkeletonMyReturnList } from '../SkeletonReturns/SkeletonMyReturnList';

//hook
import { useMyReturnsList } from '../hooks/useMyReturnsList.hook';
import usePageContent from '../../../../../infrastucture/apis/contentPage/contentPage.hook';

//styles
import { stylesReturnList as styles } from './stylesMyReturns';

//utils
import { IMyReturnsListResponse } from '../interfaces/IMyReturnsList.interface';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import Pagination from '../../MyOrders/components/Pagination';
import { useEmmaSdk } from '../../../../../infrastucture/native-modules/emma';

export function MyReturnsListScreen() {
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    getMyReturnsList,
    returnsList,
    dataMyReturnsList,
    isLoadingMyReturnsList,
    isErrorMyReturnsList,
    MAX_RETURS,
    handleGoDetails,
    handleGoSolicit,
    filteredReturnsMade,
    nextPage,
    prevPage,
    changePage,
    handleMaxPage,
    currentPage
  } = useMyReturnsList();

  const {
    loading: loadingContent,
    error: errorContent,
    pageContent,
    getDataContent
  } = usePageContent();

  useFocusEffect(
    useCallback(() => {
      getMyReturnsList();
    }, [])
  );
  useEffect(() => {
    getDataContent({
      pageType: 'ContentPage',
      pageLabelOrId: 'myReturns'
    });
  }, []);

  const components: IMyReturnsListResponse = useMemo(() => {
    if (pageContent) {
      return pageContent.components;
    }
    return undefined;
  }, [pageContent]);

  if (dataMyReturnsList && dataMyReturnsList.length === 0)
    return <NoReturns onPress={handleGoSolicit} />;

  return (
    <TemplatePage
      loading={isLoadingMyReturnsList || loadingContent}
      skeleton={<SkeletonMyReturnList />}
      isTab={true}
      error={isErrorMyReturnsList}>
      <ScrollView style={{ marginBottom: 10 }}>
        {filteredReturnsMade().map((x, index) => (
          <View key={`CardOrderReturn-${index}`}>
            <View style={styles.dateOrderReturn}>
              <Text style={[styles.dateOrderReturn_text]}>
                {`TICKET: ${x.code}`}
              </Text>
            </View>

            <CardOrderInitial
              typeCard="myReturns"
              code={x.order.code}
              reasonOrItem={x.order.totalItems}
              stateOrder={x.status}
              onGoDetails={() => handleGoDetails(x.code)}
            />
          </View>
        ))}
        {returnsList.length > MAX_RETURS && (
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Pagination
              maxPag={handleMaxPage()}
              onPrev={() => prevPage()}
              onNext={() => nextPage()}
              onPress={x => changePage(x)}
            />
          </View>
        )}
        <MainButton
          style={styles.buttonSolicit}
          styleText={styles.textSolicit}
          title="SOLICITAR DEVOLUCIÓN"
          onPress={handleGoSolicit}
        />
      </ScrollView>
      <View
        style={{
          marginBottom: 70,
          marginTop: 5,
          width: '100%',
          height: 'auto'
        }}>
        <Image
          style={[{ width: '100%', height: 120 }]}
          resizeMode="contain"
          source={{
            uri: getUrlImageHybris(
              components?.WarrantySimpleBannerComponent.media.url
            )
          }}
        />
      </View>
    </TemplatePage>
  );
}
