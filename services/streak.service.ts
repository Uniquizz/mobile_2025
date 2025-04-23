import { ServiceError } from "./interfaces/service.interface";
import { StreakResponse } from "./interfaces/streak.interface";
const baseURl = process.env.EXPO_BASE_URL;

export const getStreak = async (): Promise<StreakResponse> => {
  const response = await fetch(`${baseURl}/streak/daily`, {
    method: 'GET'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }

  const data: StreakResponse = await response.json()
  return data
}
