export interface IDropDown {
  label: string;
  value: string;
}

export interface IValues {
  city: string;
  store: string;
  fullName: string;
  numID: string;
}

export interface IExpanded {
  isExpanded: boolean;
  setIsExpanded(x: boolean): void;
}
