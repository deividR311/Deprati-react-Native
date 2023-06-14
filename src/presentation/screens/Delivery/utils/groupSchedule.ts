import {
  IPosList,
  ISchedule
} from '../../../../infrastucture/apis/checkout/pickupStore';
import { MapAbrvDay } from '../DeliveryStorePickup/utils/utilsStorePickup';

export const handleGroupSchedule = (item: IPosList) => {
  const newItem = item?.openingHours?.weekDayOpeningList
    .filter(x => !x.closed)
    .reduce((previous: ISchedule[], current) => {
      const index = previous.findIndex(
        time =>
          time.openingTime.hour === current.openingTime?.hour &&
          time.closingTime.hour === current.closingTime?.hour &&
          !current.closed
      );
      if (index >= 0) {
        previous[index].days.push(
          MapAbrvDay.get(current.weekDay) ?? current.weekDay
        );
      } else {
        previous.push({
          openingTime: {
            hour: current.openingTime?.hour ?? 0,
            formattedHour: current.openingTime?.formattedHour ?? ''
          },
          closingTime: {
            hour: current.closingTime?.hour ?? 0,
            formattedHour: current.closingTime?.formattedHour ?? ''
          },
          days: [MapAbrvDay.get(current.weekDay) ?? current.weekDay]
        });
      }
      return previous;
    }, []);
  return newItem;
};

export const handleInformationDays = (days: string[]) => {
  if (days.length === 1) return `${days[0]}: `;
  return `${days[0]} - ${days[days.length - 1]}: `;
};
