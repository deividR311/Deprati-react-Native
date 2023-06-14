import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SupportTicketsNavigationParams,
  SupportTicketsNavigationRoute
} from '../../../navigation/account/support-tickets/support-tickets.navigator';
import {
  COLORS,
  FontStyles,
  NAV,
  supportTicketValidation
} from '../../../../application/common';
import { formatDateReview } from '../../../../application/utils/formatDate';
import Button from '../../../common-components/buttons/Button';
import { UploadImageButton } from './components/upload-image-button';
import SelectInput from '../../../common-components/inputs/SelectInput';
import InputBase from '../../../common-components/inputs/InputBase';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { ImageCard, ImageNameCard } from './components/image-card';
import { useFormik } from 'formik';
import {
  useCategoriesSupportTicketRequest,
  useReportSupportTicketRequest
} from '../../../../infrastucture/apis/support-tickets/support-tickets.api';
import {
  DetailSupportTickets,
  FormDataImage
} from '../../../../infrastucture/apis/support-tickets/types';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { ClaimSuccessBottomSheet } from './components/claim-suscess-bottomsheet';
import { request, PERMISSIONS, openSettings } from 'react-native-permissions';
import { CommonActions } from '@react-navigation/native';
import { Popup } from '../../../common-components/poppup';
import { HelperText, TouchableRipple } from 'react-native-paper';
import {
  BottomSheet,
  IconButton
} from '../../../common-components/bottomSheet';
import CameraIconAdd from '../../../../../assets/icons/CameraIconAdd';
import ImageGaleryIcon from '../../../../../assets/icons/ImageGaleryIcon';
import sleep from '../../../../application/utils/sleep';

export const SupportTicketFormScreen: FC<SupportTicketFormProps> = props => {
  const {
    code,
    placed,
    totalUnitCount,
    total: { formattedValue: totalPriceWithTax = '' } = {}
  } = props.route.params.order ?? {};

  const [openSourceImageDialog, setOpenSourceImageDialog] = useState(false);
  const [showSuccessBottomSheet, setShowSuccessBottomSheet] = useState(false);
  const [ticketResult, setTicketResut] = useState<DetailSupportTickets>();
  const [image, setFiles] = useState<FormDataImage>();
  const [showPopUpError, setShowPopUpError] = useState(false);
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USERNAME }
  } = useLocalStorage();
  const {
    data,
    isLoading: isLoadingByCategoryOptions,
    isError: hasErrorLoadingCategoryOptions
  } = useCategoriesSupportTicketRequest({
    username: USERNAME
  });

  const [
    doReportSupportTicket,
    {
      isLoading: isLoadingByCreateTicket,
      isError: isErrorByCreateTicket,
      data: dataByCreateTicket,
      error: errorByCreateTicket
    }
  ] = useReportSupportTicketRequest();

  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
      status: 'OPEN',
      associatedTo: code ?? '',
      csTicketCategoryCode: ''
    },
    validationSchema: supportTicketValidation,
    // validate(values) {
    //   const errors: any = {}
    //   if (!values.csTicketCategoryCode) {
    //     errors.csTicketCategoryCode = 'Required'
    //   }
    //   return errors
    // },
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {}
  });

  const onPressUploadImageButton = async () => {
    const permission = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        default: PERMISSIONS.ANDROID.CAMERA
      })
    );

    if (
      permission === 'blocked' ||
      permission === 'denied' ||
      permission === 'unavailable'
    ) {
      Alert.alert(
        'Debe aceptar los permisos para poder subir una imagen',
        'Desea habilitar los permisos?',
        [
          { text: 'No' },
          {
            text: 'Sí, ir a la configuración',
            onPress: () => openSettings()
          }
        ]
      );
      return;
    }
    if (openSourceImageDialog) {
      setOpenSourceImageDialog(false);
      sleep(300).then(() => {
        setOpenSourceImageDialog(true);
      });
    } else {
      setOpenSourceImageDialog(true);
    }
  };

  const getImage = async (from: 'camera' | 'galery') => {
    let result: ImagePickerResponse | undefined;
    const imageOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
      quality: 0.5,
      maxWidth: 1080,
      maxHeight: 720
    };
    switch (from) {
      case 'camera':
        result = await launchCamera(imageOptions);
        break;
      case 'galery':
        result = await launchImageLibrary(imageOptions);
        break;
    }
    if (!result) return;
    _selectImage(result);
  };

  const _selectImage = (result: ImagePickerResponse) => {
    if (result.didCancel) return;
    setOpenSourceImageDialog(false);
    if (result.errorMessage) {
      console.log('>>> Request Permission Error: ', result.errorMessage);
      return;
    }
    result.assets?.forEach(asset => {
      setFiles({
        fileName: asset.fileName,
        type: asset.type,
        uri: asset.uri
      });
    });
  };

  const onPressSendButton = async () => {
    const ticketRequest = { ...formik.values };
    doReportSupportTicket({
      username: USERNAME,
      ticketRequest,
      image
    });
  };

  const onBuyingContinue = () => {
    setShowSuccessBottomSheet(false);
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: NAV.DASHBOARD_NAVIGATION }]
        })
      );
    }, 500);
  };

  const onSeeClaimDetails = () => {
    setShowSuccessBottomSheet(false);
    props.navigation.replace(SupportTicketsNavigationRoute.TicketDetails, {
      ticket: ticketResult
    });
  };

  const onCloseRequest = () => {
    setOpenSourceImageDialog(false);
  };

  useEffect(() => {
    if (!dataByCreateTicket) return;
    setTicketResut(dataByCreateTicket);
    setShowSuccessBottomSheet(true);
  }, [dataByCreateTicket]);

  useEffect(() => {
    if (!errorByCreateTicket) return;
    setShowPopUpError(true);
  }, [errorByCreateTicket]);

  const listCategories = useMemo(() => {
    return (
      data?.categories
        ?.map(({ code: value, name: label }) => {
          return {
            value,
            label
          };
        })
        .filter(i => i.label && i.value) ?? []
    );
  }, [data, isLoadingByCategoryOptions]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={[
              FontStyles.Body_1,
              FontStyles.PrimaryColor,
              styles.shortSpace
            ]}>
            Pedido #{code}
          </Text>
          <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
            Fecha: {formatDateReview(placed || '')}
          </Text>
          <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
            Cantidad: {totalUnitCount} items
          </Text>
          <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
            Monto: {totalPriceWithTax}
          </Text>

          <View style={[styles.inputSpaceTop]}>
            <SelectInput
              label="Motivo de reclamo"
              disabled={isLoadingByCategoryOptions || isLoadingByCreateTicket}
              items={listCategories}
              onChange={(categoryCode, index) => {
                const values = formik.values;
                formik.setValues({
                  ...values,
                  subject: categoryCode,
                  csTicketCategoryCode: categoryCode
                });
              }}
              value={formik.values.csTicketCategoryCode}
              error={formik.dirty && !!formik.errors.csTicketCategoryCode}
              testID={'Motivo de reclamo'}
            />
          </View>

          <InputBase
            dense
            multiline={true}
            numberOfLines={6}
            style={{
              height: Platform.select({
                ios: 100,
                android: undefined
              }),
              justifyContent: 'flex-start',
              marginBottom: 24
            }}
            label="Comentarios"
            value={formik.values.message}
            error={formik.dirty && !!formik.errors.message}
            disabled={isLoadingByCreateTicket || hasErrorLoadingCategoryOptions}
            onBlur={formik.handleBlur}
            onChangeText={(text: string) =>
              formik.setFieldValue('message', text.trim())
            }
            maxLength={300}
            activeOutlineColor="rgba(33, 33, 33, 0.6)"
          />
          <HelperText
            type="info"
            visible
            style={{
              width: '100%',
              textAlign: 'right',
              marginTop: -24,
              marginBottom: 22
            }}>
            {formik.values.message.length}/300
          </HelperText>
          {image && (
            <>
              <ImageNameCard
                filename={image?.fileName}
                onClose={() => setFiles(undefined)}
                marginBottom={16}
              />
            </>
          )}
          <UploadImageButton
            text={image ? 'Sube otra foto' : 'Sube una foto'}
            onPress={onPressUploadImageButton}
            disabled={isErrorByCreateTicket}
          />
          <Button
            onPress={onPressSendButton}
            linkName="ENVIAR"
            backgroundColor={COLORS.BRAND}
            textColor={COLORS.WHITE}
            marginTop={24}
            disabled={
              !formik.isValid ||
              isLoadingByCategoryOptions ||
              isLoadingByCreateTicket ||
              hasErrorLoadingCategoryOptions ||
              !formik.values.message ||
              !formik.values.subject
            }
            activityIndicator={{ color: COLORS.WHITE, size: 'small' }}
            showActivityIndicator={
              isLoadingByCategoryOptions || isLoadingByCreateTicket
            }
          />
          <ClaimSuccessBottomSheet
            show={showSuccessBottomSheet}
            ticketNumber={ticketResult?.id ?? ''}
            onCloseRequest={onBuyingContinue}
            onBuyingContinue={onBuyingContinue}
            onSeeClaimDetails={onSeeClaimDetails}
          />
          <Popup
            showCloseButton
            icon="error"
            buttonType="full"
            iconColor={COLORS.BRAND}
            buttonText="ACEPTAR"
            title="No se pudo generar el reporte, inténtalo de nuevo."
            visible={showPopUpError}
            closeAction={() => setShowPopUpError(false)}
            buttonAction={() => setShowPopUpError(false)}
          />
        </View>
      </ScrollView>
      <BottomSheet
        show={openSourceImageDialog}
        percentage={40}
        canDrop={true}
        isCancelable
        onCloseRequest={onCloseRequest}
        header={
          <View style={styles.iconButtomContainer}>
            <IconButton iconName="close" onPress={onCloseRequest} testID={''} />
          </View>
        }>
        <View style={{ paddingBottom: 16 }}>
          <Text style={[FontStyles.H3_Headline, { paddingBottom: 16 }]}>
            Elige una opción
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>
            <TouchableRipple
              style={styles.buttonImageSource}
              onPress={() => getImage('camera')}>
              <>
                <CameraIconAdd />
                <Text style={[FontStyles.Subtitle, { marginTop: 8 }]}>
                  Desde la{'\n'}cámara
                </Text>
              </>
            </TouchableRipple>
            <TouchableRipple
              style={styles.buttonImageSource}
              onPress={() => getImage('galery')}>
              <>
                <ImageGaleryIcon />
                <Text style={[FontStyles.Subtitle, { marginTop: 8 }]}>
                  Desde la{'\n'}galería
                </Text>
              </>
            </TouchableRipple>
          </View>
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  iconButtomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%'
  },
  buttonImageSource: {
    width: 128,
    height: 140,
    backgroundColor: COLORS.GRAYDARK20,
    elevation: 4,
    borderRadius: 4,
    shadowColor: COLORS.DARK,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 20,
    paddingBottom: 100
  },
  shortSpace: {
    marginBottom: 4
  },
  bigSpace: {
    marginTop: 16
  },
  inputSpaceTop: {
    marginVertical: 16
  },
  imageContainer: {
    borderRadius: 8
  },
  image: {
    borderRadius: 8
  },
  closeButton: {}
});

export interface SupportTicketFormProps
  extends NativeStackScreenProps<
    SupportTicketsNavigationParams,
    SupportTicketsNavigationRoute.SupportTicketForm
  > {}
