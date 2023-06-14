import apiHybris from './index';
import { COMPONENTS } from './endpoints';
import type { ComponentDtoRequest } from './services.dto';

export class HybrisCmsServices {
  static getComponents(payload: ComponentDtoRequest): Promise<any> {
    payload = { fields: 'FULL', ...payload };
    return apiHybris.get(COMPONENTS, { params: payload });
  }
}
