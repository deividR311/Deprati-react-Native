import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useFormik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../../application/common/colors';
import { FontStyles } from '../../../../application/common/fonts';
import { reviewScoreValidation } from '../../../../application/common/yup-validations/auth.validations';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { MainButton } from '../../../common-components/buttons/Button';
import InputBase from '../../../common-components/inputs/InputBase';
import { Popup } from '../../../common-components/poppup';
import ErrorText from '../../../common-components/texts/ErrorText';
import ScoreIndicator, {
  ScoreRange
} from '../order-details/components/score-indicator';
import { OrderReviewProps } from '../order-details/order-details.interface';
import { Styles } from './purchase-item-review.stylesheet';
import {
  ReviewForm,
  usePurchaseItemReview
} from './usePurchaseItemReview.hook';

export const PurchaseItemReview: React.FC<OrderReviewProps> = ({ route }) => {
  const { review } = route.params;
  const [score, setScore] = React.useState(review?.score ?? 1);

  const { doSubmit, isLoading, showPopup } = usePurchaseItemReview(
    route.params
  );

  const formik = useFormik<ReviewForm>({
    ...FORMIK_SETTINGS,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: values => doSubmit(values)
  });

  const {
    localStorageData: {
      [LocalStorageKey.User]: { name: USER_FULL_NAME }
    }
  } = useLocalStorage();

  const handleVerifyEnable = () => {
    if (formik.isValid && handleVerifyValues() && !isLoading) return false;
    return true;
  };

  const handleVerifyValues = () => {
    if (
      formik.values.score.length &&
      formik.values.score !== '0' &&
      formik.values.title.length &&
      formik.values.comment.length
    )
      return true;
    return false;
  };

  const hasScore = (): boolean => {
    return !!review?.score;
  };

  const handleScoreChange = (scoreSelect: number) => {
    if (hasScore()) return;
    setScore(scoreSelect);
    formik.setFieldValue('score', `${scoreSelect}`);
  };

  const handleSendReview = async () => {
    formik.submitForm();
  };

  return (
    <SafeAreaView style={[Styles.container]}>
      <ScrollView
        style={[Styles.content]}
        contentContainerStyle={Styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={50}>
          <View style={[Styles.profile__container]}>
            <Icon
              selectionColor={COLORS.GRAYBRAND}
              name="account-circle"
              size={32}
              color={COLORS.GRAYDARK60}
            />
            <Text style={[FontStyles.Caption, Styles.profile__container_name]}>
              {USER_FULL_NAME}
            </Text>
          </View>
          <View style={[Styles.score]}>
            <ScoreIndicator
              onChangeRating={handleScoreChange}
              score={score as ScoreRange}
              size={32}
            />
          </View>

          {/* FORM */}
          <InputBase
            testID="review-title"
            dense
            label="Título de la reseña"
            keyboardType="default"
            returnKeyType="next"
            value={formik.values.title}
            error={!!formik.errors.title}
            disabled={isLoading || hasScore()}
            onBlur={formik.handleBlur}
            onChangeText={(text: string) =>
              formik.setFieldValue('title', text.trim())
            }
          />
          {!!formik.errors.title && <ErrorText text={formik.errors.title} />}
          <View style={[Styles.container_short_spacer]} />
          <InputBase
            testID="review-comment"
            keyboardType="numbers-and-punctuation"
            dense
            multiline={true}
            numberOfLines={6}
            style={{
              height: Platform.select({
                ios: 100,
                android: undefined
              }),
              justifyContent: 'flex-start'
            }}
            label="Escribe una reseña"
            value={formik.values.comment}
            error={!!formik.errors.comment}
            disabled={isLoading || hasScore()}
            onBlur={formik.handleBlur}
            onChangeText={(text: string) =>
              formik.setFieldValue('comment', text.trim())
            }
          />
          {!!formik.errors.comment && (
            <ErrorText text={formik.errors.comment} />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : undefined}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <MainButton
          title="PUBLICAR"
          style={Styles.button__send}
          onPress={handleSendReview}
          // disabled={isLoading || hasScore() || !formik.isValid}
          disabled={handleVerifyEnable() || hasScore()}
          showActivityIndicator={isLoading}
        />
      </KeyboardAvoidingView>
      <Popup
        icon="check-circle"
        iconColor={COLORS.GREENOK}
        hideButton={true}
        title={'La reseña ha sido\nañadida con éxito'}
        textContent="Podrás verla en las reseñas
         del producto"
        textContentStyle={FontStyles.Center}
        visible={showPopup}
      />
    </SafeAreaView>
  );
};

const FORMIK_SETTINGS = {
  initialValues: {
    title: '',
    comment: '',
    score: ''
  },

  initialErrors: {},
  validationSchema: reviewScoreValidation
};
