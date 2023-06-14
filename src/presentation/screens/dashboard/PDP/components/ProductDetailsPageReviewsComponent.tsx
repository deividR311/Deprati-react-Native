import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { FontStyles } from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import ComponentStars from '../../PLP/components/stars/ComponentStars';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDateReview } from '../../../../../application/utils/formatDate';
import { useNavigation } from '@react-navigation/native';
import { EcommerceNavigationRoute } from '../../../../navigation/ecommerce';
import { NAV } from '../../../../../application/common/namesNav';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';

interface Props {
  numberOfReviews: number;
  reviews: Review[];
  code: string;
}

interface Review {
  alias: string;
  comment: string;
  date: string;
  headline: string;
  id: string;
  principal: {
    name: string;
    uid: string;
  };
  rating: number;
}

export const ProductDetailsPageReviewsComponent = ({
  numberOfReviews,
  reviews,
  code
}: Props) => {
  const navigation = useNavigation();
  const { localStorageData } = useLocalStorage();
  const { showModal, hideModal } = useGenericModal();

  const navigateToReview = () => {
    navigation.navigate(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.PurchaseItemReview,
      params: { product: { code } }
    });
  };

  const gotoReviewScreen = () => {
    if (localStorageData[LocalStorageKey.IsLogin]) {
      navigateToReview();
    } else {
      showModal(ModalsType.LoginModal, {
        buttonAction: () => {
          hideModal();
          navigateToReview();
        }
      });
    }
  };

  const Review = ({ alias, rating, headline, date, comment }: Review) => {
    const [showText, setShowText] = useState<boolean>(false);
    return (
      <View style={styles.review}>
        <View style={styles.review_user}>
          <Icon
            name="person"
            size={32}
            color={COLORS.GRAYDARK60}
            style={styles.review_user_icon}
          />
          <Text style={styles.review_user_name}>{alias}</Text>
        </View>
        <ComponentStars
          style={styles.review_stars}
          styleList={styles.review_stars_list}
          styleText={styles.review_stars_text}
          average={rating}
          showText={true}
          showStars={true}
          colorStar={COLORS.GRAYBRAND}
        />
        <Text style={styles.review_headline}>{headline}</Text>
        <Text style={styles.review_date}>
          Calificado el {formatDateReview(date)}
        </Text>
        <Text
          style={styles.review_comment}
          numberOfLines={showText ? undefined : 2}>
          {comment}
        </Text>
        <Pressable onPress={() => setShowText(previous => !previous)}>
          <Text style={styles.review_showmore}>
            {showText ? 'Ver menos' : 'Ver más'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {numberOfReviews == 0 && (
        <Text style={styles.review_no_found}>No hay reseñas aún</Text>
      )}
      {numberOfReviews > 0 &&
        reviews?.map((review, index) => <Review key={index} {...review} />)}

      <TouchableOpacity
        style={styles.reviews__button}
        onPress={gotoReviewScreen}>
        <Text style={styles.reviews__button_text}>ESCRIBIR UNA RESEÑA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MARING_HORIZONTAL,
    marginHorizontal: MARING_HORIZONTAL
  },
  reviews__button: {
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.DARK70,
    paddingVertical: 12
  },
  reviews__button_text: {
    ...FontStyles.Button
  },
  review: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  review_no_found: {
    ...FontStyles.Body_2,
    marginBottom: MARING_HORIZONTAL
  },
  review_user: {
    flexDirection: 'row',
    marginVertical: 3
  },
  review_user_icon: {
    overflow: 'hidden',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.WHITE
  },
  review_user_name: {
    ...FontStyles.Caption,
    marginLeft: 8
  },
  review_stars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  review_stars_list: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  review_stars_text: {
    ...FontStyles.Body_2
  },
  review_headline: {
    ...FontStyles.Subtitle,
    textAlign: 'left',
    marginVertical: 3
  },
  review_date: {
    ...FontStyles.Steps,
    textAlign: 'left',
    marginVertical: 3
  },
  review_comment: {
    ...FontStyles.Body_2,
    color: COLORS.DARK70,
    marginVertical: 3
  },
  review_showmore: {
    ...FontStyles.Body_2,
    color: COLORS.DARKBRAND,
    marginTop: 8
  }
});
