import { ServiceError } from "./interfaces/service.interface";
import { CreateProfileData, LoginDataResponse, LoginUserData, ProfileResponse, RegisterUserData } from "./interfaces/user.interface";
const baseURl = process.env.EXPO_BASE_URL;

export const loginUser = async (body: LoginUserData): Promise<LoginDataResponse> => {
  const response = await fetch(`${baseURl}/user/login`, {
    body: JSON.stringify(body),
    method: 'POST'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  const data: LoginDataResponse = await response.json();

  return data
}

export const registerUser = async (body: RegisterUserData): Promise<LoginDataResponse> => {
  const response = await fetch(`${baseURl}/user/register`, {
    body: JSON.stringify(body),
    method: 'POST'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  const data: LoginDataResponse = await response.json();

  return data
}

export const registerGoogle = async () => {
  const response = await fetch(`${baseURl}/user/google`, {
    method: 'GET'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  return
}

export const createProfile = async(body: CreateProfileData): Promise<ProfileResponse> => {
  const response = await fetch(`${baseURl}/profile`, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  
  const data: ProfileResponse = await response.json()
  return data
}

export const getProfile = async(): Promise<ProfileResponse> => {
  const response = await fetch(`${baseURl}/profile`, {
    method: 'GET',
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  
  const data: ProfileResponse = await response.json()
  return data
}