import { useEffect, useState } from 'react';
import {
  DataCheckout,
  DataContentExpirationDate as DataExpirationDate,
  DataCustomerService as DataCustomer,
  ExpirationDateContent,
  useContentServiceMutation
} from '.';
import useErrorDescription from '../../../application/common/hooksCommons/useErrorDescription';
import { Content } from './IContenService.interface';

/**
 * @name useContentServiceRequest
 * @description useContent Request Hook
 */

export const useContentServiceRequest = (): useContentServiceHook => {
  const { handleModalErrorService } = useErrorDescription();
  const [dataCustomer, setDataCustomer] = useState<DataCustomer | undefined>();
  const [dataChekout, setDataChekout] = useState<DataCheckout | undefined>();
  const [dataExpirationDate, setDataExpirationDate] = useState<
    DataExpirationDate | undefined
  >();
  const [callService, setCallService] = useState<string>('');
  const [
    getContentService,
    { data: dataContent, isError, isLoading, error, isSuccess }
  ] = useContentServiceMutation();

  useEffect(() => {
    if (!isLoading && isSuccess && dataContent) {
      handlAssignData(dataContent?.data);
    }
  }, [dataContent]);

  useEffect(() => {
    if (isError && error) {
      // handleModalErrorService(error)
    }
  }, [isError]);
  const handlAssignData = (
    data: DataCustomer | DataCheckout | DataExpirationDate
  ) => {
    switch (callService) {
      case Content.CHECKOUT:
        setDataCustomer(data as DataCustomer);
        setDataChekout(data as DataCheckout);
        break;
      case Content.EXPIRATIONDATE:
        setDataExpirationDate(data as DataExpirationDate);
        break;
      case Content.CUSTOMERSERVICE:
        setDataCustomer(data as DataCustomer);
        break;
      default:
        break;
    }
  };
  const getContentCheckout = () => {
    setCallService(Content.CHECKOUT);
    getContentService({ content: 'checkout' });
  };

  const getContentExpirationDate = () => {
    setCallService(Content.EXPIRATIONDATE);
    getContentService({ content: 'expirationDate' });
  };

  const getContentCustomer = () => {
    setCallService(Content.CUSTOMERSERVICE);
    getContentService({ content: 'customerService' });
  };

  return {
    dataCustomer,
    dataChekout,
    expirationDateContent: dataExpirationDate?.expirationDateContent,
    getContentCheckout,
    getContentExpirationDate,
    getContentCustomer,
    isLoadingContentService: isLoading,
    isSuccessContentService: isSuccess,
    isErrorContentService: isError
  };
};

interface useContentServiceHook {
  dataCustomer: DataCustomer | undefined;
  dataChekout: DataCheckout | undefined;
  expirationDateContent: ExpirationDateContent | undefined;

  getContentCheckout(): void;
  getContentExpirationDate(): void;
  getContentCustomer(): void;

  isLoadingContentService: boolean;
  isSuccessContentService: boolean;
  isErrorContentService: boolean;
}

export default useContentServiceRequest;
