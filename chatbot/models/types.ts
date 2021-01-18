export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  loginStatus: boolean;
  sessionID: string | null;
}

export interface LogoutForm {
  sessionID: string;
}

export interface LogoutResponse {
  logoutStatus: boolean;
}

export interface RegistrationForm {
  name: string;
  email: string;
  address: string;
  area: string;
  password: string;
  additionalNotes: string;
}

export interface RegistrationResponse {
  status: boolean;
  message: string; // Message if there is any error. If no error it will be empty.
}

export interface VerificationForm {
  sessionID: string;
}

export interface VerificationResponse {
  loginStatus: boolean;
  details: {
    name: string;
    email: string;
    address: string;
    area: string;
    additionalNotes: string;
  };
}

export interface ChatForm {
  sessionID: string | null; // If there is a user
  message: string;
}

export interface ChatResponse {
  message: string;
}

// Get list of areas
export interface Area {
  area: string;
  areaID: number;
}

export interface AreaResponse extends Array<Area> {}

export interface AreaStats extends Area {
  cases: number;
}

export interface ToFromAreaIntent extends Area {
  intent: number;
}

export interface AreaDetailsResponse {
  areaStats: Array<AreaStats>;
  toAreaIntent: Array<ToFromAreaIntent>;
  fromAreaIntent: Array<ToFromAreaIntent>;
}

export interface ProjectDistrictDataSingle {
  state: string;
  district: string;
  cases: number;
  newCases: number;
  active: number;
  changeActive: number;
  activeFourteen: number;
  changeActiveFourteen: number;
}

export interface ProjectDistrictData extends Array<ProjectDistrictDataSingle> {}
