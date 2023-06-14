import { MapperDTO_To_Model as MapperDTO } from '../../common/mapper-dto-to-model';
import {
  PointOfServiceResponse,
  PosGroup,
  PosList as PosListResponse,
  Address as AddressResponse,
  Country as CountryResponse,
  Region as RegionResponse,
  Features as FeaturesResponse,
  GeoPoint as GeoPointResponse,
  OpeningHours as OpeningHoursResponse,
  WeekDayOpeningList as WeekDayListResponse,
  IngTime as IngTimeResponse,
  Schedule as ScheduleResponse,
  IngTimeBasic as IngTimeBasicResponse
} from './pointOfService.type';

import {
  PointOfServiceModel,
  IPosGroup,
  IPosList,
  IAddress,
  ICountry,
  IRegion,
  IFeatures,
  IGeoPoint,
  IOpeningHours,
  IWeekDayOpeningList as IWeekDayList,
  IIngTime,
  ISchedule,
  IIngTimeBasic
} from './interfaces/pointOfService.model.interfaces';

export function mapOrdersModelfromDTO(
  rawData: PointOfServiceResponse
): PointOfServiceModel {
  const posGroups = rawData.posGroups.map(posGroup => {
    const newPosList = posGroup.posList.map(posL => {
      const newWeekDayOpeningList = posL?.openingHours?.weekDayOpeningList?.map(
        weekDay => {
          const auxTime = new MapperDTO<IngTimeResponse, IIngTime>(
            weekDay?.openingTime,
            {
              formattedHour: 'formattedHour',
              hour: 'hour',
              minute: 'minute'
            }
          ).get();

          const auxWeekDay = new MapperDTO<WeekDayListResponse, IWeekDayList>(
            weekDay,
            {
              closingTime: 'closingTime',
              openingTime: 'openingTime',
              closed: 'closed',
              weekDay: 'weekDay'
            }
          ).get();

          auxWeekDay.closingTime = auxTime;
          auxWeekDay.openingTime = auxTime;

          return auxWeekDay;
        }
      );

      const newCountry = new MapperDTO<CountryResponse, ICountry>(
        posL.address.country,
        {
          isocode: 'isocode',
          name: 'name'
        }
      ).get();

      const newRegion = new MapperDTO<RegionResponse, IRegion>(
        posL.address.region,
        {
          countryIso: 'countryIso',
          isocode: 'isocode',
          isocodeShort: 'isocodeShort',
          name: 'name'
        }
      ).get();

      const newAddress = new MapperDTO<AddressResponse, IAddress>(
        posL.address,
        {
          country: 'country',
          defaultAddress: 'defaultAddress',
          formattedAddress: 'formattedAddress',
          id: 'id',
          line1: 'line1',
          phone: 'phone',
          region: 'region',
          shippingAddress: 'shippingAddress',
          town: 'town',
          visibleInAddressBook: 'visibleInAddressBook',
          cellphoneNumber: 'cellphoneNumber'
        }
      ).get();

      const newGeoPoint = new MapperDTO<GeoPointResponse, IGeoPoint>(
        posL.geoPoint,
        {
          latitude: 'latitude',
          longitude: 'longitude'
        }
      ).get();

      const newFeatures = new MapperDTO<FeaturesResponse, IFeatures>(
        posL.features,
        {}
      ).get();

      const newOpeningHour = new MapperDTO<OpeningHoursResponse, IOpeningHours>(
        posL.openingHours,
        {
          code: 'code',
          specialDayOpeningList: 'specialDayOpeningList',
          weekDayOpeningList: 'weekDayOpeningList'
        }
      ).get();

      const newSchedule = posL.schedule.map(schedule => {
        const auxTimeBasic = new MapperDTO<IngTimeBasicResponse, IIngTimeBasic>(
          schedule.closingTime,
          {
            formattedHour: 'formattedHour',
            hour: 'hour'
          }
        ).get();

        const auxSchedule = new MapperDTO<ScheduleResponse, ISchedule>(
          schedule,
          {
            closingTime: 'closingTime',
            openingTime: 'openingTime',
            days: 'days'
          }
        ).get();

        auxSchedule.closingTime = auxTimeBasic;
        auxSchedule.openingTime = auxTimeBasic;

        return auxSchedule;
      });

      const auxPosList = new MapperDTO<PosListResponse, IPosList>(posL, {
        address: 'address',
        displayName: 'displayName',
        features: 'features',
        geoPoint: 'geoPoint',
        name: 'name',
        openingHours: 'openingHours',
        storeImages: 'storeImages',
        schedule: 'schedule'
      }).get();

      auxPosList.address = newAddress;
      auxPosList.features = newFeatures;
      auxPosList.geoPoint = newGeoPoint;
      auxPosList.openingHours = newOpeningHour;
      auxPosList.schedule = newSchedule;

      auxPosList.address.country = newCountry;
      auxPosList.address.region = newRegion;
      auxPosList.openingHours.weekDayOpeningList = newWeekDayOpeningList;

      return auxPosList;
    });

    const newPosGroup = new MapperDTO<PosGroup, IPosGroup>(posGroup, {
      code: 'code',
      name: 'name',
      posList: 'posList'
    }).get();

    newPosGroup.posList = newPosList;

    return newPosGroup;
  });

  return { posGroups };
}
