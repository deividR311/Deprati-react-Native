import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  content: {},
  contentContainer: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  profile__container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  profile__container_avatar: {},
  profile__container_name: { marginLeft: 8 },
  score: { marginRight: 16, marginBottom: 16 },
  review__title: {},
  review__comment: {},
  container_short_spacer: { height: 8 },
  container_spacer: { flex: 1 },
  button__send: {
    width: '94%',
    marginBottom: 7,
    alignSelf: 'center',
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 16
  }
});
