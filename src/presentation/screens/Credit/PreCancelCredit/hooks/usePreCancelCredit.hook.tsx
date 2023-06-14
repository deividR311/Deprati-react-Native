//libs
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
//hooks
import usePrecancellationRequest from '../../../../../infrastucture/apis/precancellation/usePrecancellationRequest.hook';
//utils
import { NAV } from '../../../../../application/common';
import {
  IDeferredList,
  IselectedTickets
} from '../../../../../infrastucture/apis/precancellation/precancellation.type';
import {
  IFooterPreCancel,
  IDeferredListModify,
  IHandleGlobalPreCancel,
  ISelected,
  OPTION_SELECTED,
  ILoadingsPreCancel,
  IErrorsPreCancel
} from '../interfaces/IPreCancelCredit';
import { IErrorCredit } from '../../ErrorCredit.interface';

/**
 * @name usePreCancelCredit
 * @description usePreCancelCredit Hook
 */

export const usePreCancelCredit = (): IPreCancelCreditHook => {
  const navigation = useNavigation();
  const {
    onGetDeferredList,
    dataDeferredList,
    onSetRegisterTicket,
    dataIsRegisterTicket,
    isLoadingDeferredList,
    isLoadingRegisterTicket,
    isErrorDeferredList,
    isErrorRegisterTicket,
    errorRegisterTicket
  } = usePrecancellationRequest();

  const [isAllItems, setIsAllItems] = useState<boolean>(false);
  const [isPressButtonAll, setIsPressButtonAll] = useState<boolean>(false);
  const [showCardActive, setShowCardActive] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isExistData, setIsExistData] = useState<boolean>(false);

  const [deferredList, setDeferredList] = useState<IDeferredListModify[]>([]);
  const [valuesFooter, setValuesFooter] = useState<IFooterPreCancel>({
    totalSel: 0,
    totalDeferred: 0
  });

  useEffect(() => {
    onGetDeferredList();
  }, []);

  useEffect(() => {
    if (dataDeferredList) {
      setIsExistData(true);
      if (dataDeferredList.length) handleVerifySelected(dataDeferredList);
    }
  }, [dataDeferredList]);

  useEffect(() => {
    if (dataIsRegisterTicket)
      navigation.navigate(NAV.CreditSolicitPreCancel as never);
  }, [dataIsRegisterTicket]);

  useEffect(() => {
    if (isErrorRegisterTicket || isErrorDeferredList) setShowError(true);
  }, [isErrorRegisterTicket, isErrorDeferredList]);

  const handleFilter = (data: IDeferredListModify[]) => {
    return data.filter(x => x.option.isSelected);
  };

  const handleVerifySelected = (data: IDeferredList[]) => {
    let _newValue = data.map(x => {
      return {
        ...x,
        option: handleIsSelected(x.selected)
      };
    });

    handleDataFooter(_newValue);
    setDeferredList(_newValue);
  };

  const handleIsSelected = (sel: string): ISelected => {
    // Cuando llegue el valor de "P" se puede modificar la selección
    // Cuando llegue  "X" no puede ser modificada
    let _sel: ISelected = { isModify: false, isSelected: false };
    switch (sel) {
      case OPTION_SELECTED.P:
        _sel = { isModify: true, isSelected: true };
        break;
      case OPTION_SELECTED.X:
        _sel = { isModify: false, isSelected: true };
        break;

      default:
        _sel = { isModify: true, isSelected: false };
        break;
    }
    _sel.isSelected && setShowCardActive(true);
    return _sel;
  };

  const handleIsAllItems = () => {
    setIsPressButtonAll(true);
    handleAllSelected(!isAllItems);
    setIsAllItems(!isAllItems);
  };

  const handleAllSelected = (sel: boolean) => {
    let _newValue = deferredList.map(x => {
      x.option.isSelected = x.option.isModify ? sel : true;
      return x;
    });
    handleDataFooter(_newValue);
    setDeferredList(_newValue);
  };

  const handleItemsSelected = (item: IDeferredList, sel: boolean) => {
    let valueIndex = deferredList.findIndex(x => x.ticket === item.ticket);
    deferredList[valueIndex].option.isSelected = sel;
    handleVerifyAll(deferredList);
    setDeferredList([...deferredList]);
    handleDataFooter(deferredList);
    // console.log('ItemSELECTED', deferredList)
  };

  const handleVerifyAll = (data: IDeferredListModify[]) => {
    let valueAll = false;
    const countSel = handleFilter(data).length;
    if (countSel === data.length) valueAll = true;
    setIsAllItems(valueAll);
  };

  const onDisableButton: boolean = useMemo(() => {
    let diferidosSelectd = handleFilter(deferredList);
    diferidosSelectd = diferidosSelectd.filter(
      df => df.selected !== OPTION_SELECTED.X
    );

    return !diferidosSelectd.length;
  }, [deferredList]);

  const handleDataFooter = (data: IDeferredListModify[]) => {
    try {
      const itemsSelected = handleFilter(data);
      let cont = 0;
      itemsSelected.forEach(x => (cont += x.pendingValue));
      setValuesFooter({ totalSel: itemsSelected.length, totalDeferred: cont });
    } catch (err) {}
  };

  const handleToAccept = () => {
    let filterDeferred = handleFilter(deferredList);

    const request: IselectedTickets[] = filterDeferred.map(x => {
      return {
        store: x.store,
        registerArea: x.registerArea,
        ticket: x.ticket
      };
    });
    console.log('handleToAccept', request);
    onSetRegisterTicket(request);
  };
  const handleClose = () => {
    setShowError(false);
    navigation.goBack();
  };
  return {
    deferredList,
    isExistData,
    showCardActive,
    showError,
    setShowCardActive,
    isAllItems,
    handleIsSelected,
    handleIsAllItems,
    handleGlobal: {
      setIsPressButtonAll,
      isPressButtonAll,
      isAllItems,
      handleIsAllItems,
      handleItemsSelected
    },
    valuesFooter,
    handleToAccept,
    handleClose,

    onDisableButton,
    //loading
    loading: {
      isLoadingDeferredList,
      isLoadingRegisterTicket
    },

    //isError
    isError: {
      isErrorDeferredList
    },

    isErrorRegisterTicket,
    errorRegisterTicket
  };
};

interface IPreCancelCreditHook {
  deferredList: IDeferredListModify[];
  isExistData: boolean;
  showCardActive: boolean;
  showError: boolean;

  setShowCardActive(show: boolean): void;
  isAllItems: boolean;
  handleIsSelected(sel: string): ISelected;
  handleIsAllItems(): void;
  handleToAccept(): void;
  handleClose(): void;
  valuesFooter: IFooterPreCancel;

  handleGlobal: IHandleGlobalPreCancel;
  onDisableButton: boolean;

  //loading
  loading: ILoadingsPreCancel;

  //isError
  isError: IErrorsPreCancel;

  //Wp Error
  isErrorRegisterTicket: boolean;
  errorRegisterTicket: IErrorCredit;
}

export default usePreCancelCredit;
