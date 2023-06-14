import { urlCloudflare } from './index';
import { THUMBNAIL, VIDEO } from './endpoints';
import type { ThumbnailDtoRequest } from './services.dto';
import queryString from 'query-string';

export class CloudflareServices {
  static getThumbnailUrl(
    videoId: string,
    payload: ThumbnailDtoRequest
  ): string {
    payload = { time: '1s', ...payload };
    const params = queryString.stringify(payload);
    return `${urlCloudflare}${THUMBNAIL(videoId)}?=${params}`;
  }

  static getVideoUrl(videoId: string): string {
    return `${urlCloudflare}${VIDEO(videoId)}`;
  }
}
