export interface IMenu {
  uid: string;
  entries: EntryMenu[];
  children: IMenu[];
  title: string;
}

export interface EntryMenu {
  itemId: string;
  itemSuperType: string;
  itemType: string;
}
