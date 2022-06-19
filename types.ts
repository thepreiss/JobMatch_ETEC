export type CardItemT = {
  description?: string;
  hasActions: boolean;
  hasVariant?: boolean;
  image?: any;
  matches?: string;
  name: string;
  area?: string;
  id?: number;
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
  idArea?: string;
  area?: string;
  landscapeLink: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  info5?: string;
  message?: string;
  image?: string;
};

export type DataP = {
  id: number;
  name: string;
  match?: string;
  description: string;
  message?: string;
  image: string;
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

export type DataA = {
  idPosition?: string;
  scholarityTitle?: string;
  scholarityLevel?: string;
  LanguageTitle?: string;
  LanguageLevel?: string;
  experienceArea?: string;
  experienceYears?: string;
  salaryRange?: string;
  softSkillTitle?: string;
  softSkillLevel?: string;
};