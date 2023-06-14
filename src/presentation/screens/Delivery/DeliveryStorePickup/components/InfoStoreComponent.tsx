import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { stylesStore } from './stylesComponent.stylesheet';
import useOpenInApp from '../../../account/Stores/hooks/useOpenInApp';
import {
  IPosList,
  ISchedule
} from '../../../../../infrastucture/apis/checkout/pickupStore';
import { MapAbrvDay } from '../utils/utilsStorePickup';

interface InfoStoreProps {
  store: IPosList;
}

export default function InfoStoreComponent({
  // @ts-ignore
  store: { openingHours: { weekDayOpeningList = [] } = {}, ...item } = {}
}: InfoStoreProps) {
  const { toCall, toNavigate } = useOpenInApp();

  const handleInformationDays = (days: string[]) => {
    if (days.length === 1) return `${days[0]}: `;
    return `${days[0]} - ${days[days.length - 1]}: `;
  };

  const schedule = useMemo(() => {
    return weekDayOpeningList
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
  }, [weekDayOpeningList]);

  return (
    <View style={stylesStore.viewCard}>
      <View>
        <View style={stylesStore.content}>
          <View style={stylesStore.content_card}>
            <Text style={stylesStore.content_title}>{item.displayName}</Text>
          </View>

          <View>
            <Text style={stylesStore.addressTitle}>{item.address.line1}</Text>
            <View style={stylesStore.content__days}>
              <View style={stylesStore.content__days_schedule}>
                {schedule.map((x: ISchedule, index: number) => (
                  <Text key={`schedule-${index}`} style={stylesStore.schedule}>
                    {handleInformationDays(x.days)}
                    {`${x.openingTime.formattedHour} a ${x.closingTime.formattedHour}`}
                  </Text>
                ))}
              </View>
              <View style={stylesStore.content__days_signs}>
                <TouchableOpacity
                  onPress={() =>
                    toNavigate({
                      latitude: item.geoPoint.latitude.toString(),
                      longitude: item.geoPoint.longitude.toString()
                    })
                  }
                  style={{ marginHorizontal: 16 }}
                  activeOpacity={0.5}>
                  <Icon name="directions" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toCall(item.address.phone)}
                  activeOpacity={0.5}>
                  <Icon name="phone" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
