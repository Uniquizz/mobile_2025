export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginDataResponse {
  email: string;
  token: string;
}

export interface RegisterUserData {
  email:           string;
  password:        string;
  confirmPassword: string;
}

export interface CreateProfileData {
  name:      string;
  lastName:  string;
  birthDate?: Date;
  phone:     string;
}

export interface ProfileResponse {
  id:        string;
  name:      string;
  lastName:  string;
  photoUrl:  null;
  birthDate: Date;
  phone:     string;
}
