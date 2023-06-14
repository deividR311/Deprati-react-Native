import { useNavigation } from '@react-navigation/native';
import useReturnsService from '../../../../../infrastucture/apis/myReturns/useReturnsService.hook';
import { DetailReturnResponse } from '../../../../../infrastucture/apis/myReturns/myReturnsDetail.type';

export const useMyReturnsDetail = (): MyReturnsDetailHook => {
  const navigation = useNavigation();
  const {
    //Get
    getDetailReturn,
    dataDetailReturn,
    isLoadingDetailReturn,
    isErrorDetailReturn
  } = useReturnsService();

  const handleToAccept = () => {
    navigation.goBack();
  };

  return {
    getDetailReturn,
    dataDetailReturn,
    isLoadingDetailReturn,
    isErrorDetailReturn,
    //
    handleToAccept
  };
};

interface MyReturnsDetailHook {
  getDetailReturn(returnCode: string): void;
  dataDetailReturn: DetailReturnResponse | undefined;
  isLoadingDetailReturn: boolean;
  isErrorDetailReturn: boolean;
  //
  handleToAccept(): void;
}
