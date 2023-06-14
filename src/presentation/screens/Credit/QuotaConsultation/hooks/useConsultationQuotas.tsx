import {
  useQuotaConsultationRequest,
  useQuotasListRequest
} from '../../../../../infrastucture/apis/credit/credit.api';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';

interface ConsultationPrams {
  amount: number;
  deferred: number;
  deferredOrder: number;
}
export default function useConsultationQuotas() {
  const { localStorageData } = useLocalStorage();

  const {
    isError: isErrorList,
    isLoading: isLoadingList,
    data: dataList
  } = useQuotasListRequest({});

  const [consultationAction, { isLoading, data, isError }] =
    useQuotaConsultationRequest();

  const onConsultation = (params: ConsultationPrams) => {
    consultationAction({
      amount: params.amount,
      deferred: params.deferred,
      deferredOrder: params.deferredOrder,
      account: localStorageData[LocalStorageKey.AccountNumber],
      additional: localStorageData[LocalStorageKey.AccountAdditionalNumber],
      deviceId: localStorageData[LocalStorageKey.UID],
      identification:
        localStorageData[LocalStorageKey.User].documentTypeNumber ?? ''
    });
  };
  return {
    onConsultation,
    isLoading,
    data,
    isErrorList,
    dataList,
    isLoadingList,
    isError
  };
}
