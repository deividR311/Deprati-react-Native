export const DefaultLocation: Location = {
  latitude: '31.250440',
  longitude: '-99.250610'
};

export interface LocationState extends Location {
  granted: boolean;
  status: 'pending' | 'deny' | 'completed' | 'error';
}

export interface Location {
  latitude: number | string;
  longitude: number | string;
}
