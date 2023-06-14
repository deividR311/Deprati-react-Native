import { StyleSheet } from 'react-native';
import { COLORS, FontStyles } from '../../../application/common';

export const Styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  leftTextContainer: {
    flexDirection: 'column'
  },
  leftTextContainerLarge: {
    flexDirection: 'column',
    flex: 1
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35
  },
  wrapperChartInCard: {
    elevation: 4,
    shadowColor: COLORS.DARK,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: 16
  },
  graphicContainer: {
    top: 0,
    position: 'absolute'
  },
  verticalSpace: {
    height: 6,
    with: '100%'
  },
  largeContainerCard: {
    backgroundColor: COLORS.GRAYBRAND + '60',
    padding: 12,
    marginBottom: 18
  },
  largeTitle: {
    ...FontStyles.Action,
    ...FontStyles.PrimaryColor,
    marginBottom: 14,
    letterSpacing: 0
  },
  tableRow: {
    flexDirection: 'row'
  },
  cellCaption: {
    ...FontStyles.Bold,
    ...FontStyles.Action,
    letterSpacing: 0,
    fontSize: 14,
    flex: 1
  },
  cellValue: {
    ...FontStyles.Body_2,
    flex: 1,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0,
    fontSize: 14
  }
});
