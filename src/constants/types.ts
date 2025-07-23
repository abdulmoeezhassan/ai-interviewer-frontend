export type userData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  location: string;
  englishProficiency: string;
  profilePicture: string;
  jobRole: string;
  yoe: string;
  level: string;
  primarySkill: string;
  resume: string;
  companyPreferences: string[];
};

export type TooltipPayload = ReadonlyArray<any>;

export type Coordinate = {
  x: number;
  y: number;
};

export type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
  index: any;
};

export type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

export type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

export type Skill = {
  skill: string;
  level: number;
}

export type UserContextType = {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  getSingleUser: Function;
};
