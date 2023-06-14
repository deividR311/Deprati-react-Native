import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase } from '../common/request-response.type';
import {
  deletedNotificationBody,
  NotificationDeletedResponse,
  NotificationDetailBody,
  NotificationDetailResponse,
  NotificationListResponse
} from './notifications.interfaces';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    notificationsList: builder.query<NotificationListResponse, RequestBodyBase>(
      {
        query: body => ({
          url: ApiConfig.endpoints.notifications.list,
          method: 'POST',
          body: body
        }),
        providesTags: ['NotificationsList']
      }
    ),
    notificationDetail: builder.mutation<
      NotificationDetailResponse,
      NotificationDetailBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.notifications.detail,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['NotificationsList']
    }),
    deleteNotification: builder.mutation<
      NotificationDeletedResponse,
      deletedNotificationBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.notifications.delete,
        method: 'patch',
        body: body
      }),
      invalidatesTags: ['NotificationsList']
    })
  })
});

export const {
  useLazyNotificationsListQuery: useNotificationsListRequest,
  useNotificationDetailMutation: useNotificationDetailRequest,
  useDeleteNotificationMutation: useDeleteNotificationRequest
} = extendedApi;
