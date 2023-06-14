import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { FetchBaseQueryError as FetchError } from '@reduxjs/toolkit/dist/query';
import { ModalsType } from '../../../presentation/common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../presentation/common-components/modal/ModalProvider';

export const useErrorDescription = (): ErrorDescriptionHook => {
  const { hideModal, showModal } = useGenericModal();

  const handleModalErrorService = (
    error: IErrorService,
    callback?: () => void,
    title?: string,
    isTitleStyle?: boolean
  ) => {
    let content: { title?: string; textContent?: string } = {
      title,
      textContent: handleErrorsText(error?.data?.errors)
    };

    if (!title) delete content.title;
    if (isTitleStyle) {
      delete content.textContent;
      content.title = handleErrorsText(error?.data?.errors);
    }

    showModal(ModalsType.ErrorService, {
      ...content,
      closeAction() {
        hideModal();
        setTimeout(() => {
          callback?.();
        }, 600);
      }
    });
  };

  const handleErrorsText = (errors: IError[]) => {
    let textErrors: string = '';
    errors?.forEach(
      (item: IError, index: number) =>
        (textErrors =
          index === 0
            ? `${textErrors}${item?.message}`
            : `${textErrors}\n${item?.message}`)
    );
    return textErrors;
  };

  return {
    handleModalErrorService,
    handleErrorsText
  };
};

interface ErrorDescriptionHook {
  handleModalErrorService(
    e: IErrorService | FetchError | SerializedError,
    callback?: () => void,
    title?: string,
    isTitleStyle?: boolean
  ): void;
  handleErrorsText(e: IError[]): string;
}

export interface IErrorService {
  status: number;
  data: IDataError;
}
interface IDataError {
  errors: IError[];
}
interface IError {
  message: string;
  reason: string;
  subject: string;
  subjectType: string;
  type: string;
}

export default useErrorDescription;
