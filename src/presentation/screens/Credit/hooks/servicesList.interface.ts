import { string } from 'yup';
import { NAV } from '../../../../application/common';

export interface ServicesList {
  id: string;
  image: string;
  title: string;
  desc: string;
  link: string;
  showForPrincipal: boolean;
  showForAdditional: boolean;
  isLoggedIn: boolean;
  isLinkedToDirectCredit: boolean;
}
