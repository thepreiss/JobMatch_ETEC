export type CardItemT = {
  description?: string;
  hasActions: boolean;
  hasVariant?: boolean;
  image?: any;
  matches?: string;
  name: string;
};

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type MessageT = {
  image: any;
  message?: string;
  name: string;
};

export type ProfileItemT = {
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
  location?: string;
  name: string;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type DataT = {
  idPosition: number;
  name: string;
  match?: string;
  description?: string;
  message?: string;
  landscapeLink: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
};

export type DataP = {
  id: number;
  name: string;
  match?: string;
  description: string;
  message?: string;
  image?: any;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
};

export type DataC = {
  name: string;
  match?: string;
  description: string;
  message?: string;
  image?: any;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
};
