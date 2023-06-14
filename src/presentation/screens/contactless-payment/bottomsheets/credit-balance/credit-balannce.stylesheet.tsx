import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';

export const Styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  titleContainer: {
    padding: 16,
    justifyContent: 'center',
    width: '100%'
  },
  subtitle: {
    width: '100%',
    textAlign: 'center'
  },
  card: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4
  },
  skeleton__title_container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  skeleton__title: {
    height: 30,
    width: '100%',
    marginVertical: 10
  },
  skeleton__subtitle: {
    height: 20,
    width: '80%',
    marginBottom: 32
  },
  skeleton__card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  skeleton__card_text_1: {
    height: 12,
    width: '40%'
  },
  skeleton__card_text_2: {
    height: 8,
    marginTop: 10,
    width: '50%'
  },
  skeleton__card_char: {
    width: '80%',
    height: 150,
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginTop: 30
  },
  skeleton__card_button: {
    height: 40,
    width: '100%',
    marginTop: 20
  },
  iconButton: {
    marginRight: 10
  }
});
