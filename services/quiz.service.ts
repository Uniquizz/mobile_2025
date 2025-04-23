import { Quiz } from "../interfaces/quiz.interface";
import { CreateQuizData, FinishQuizData, FinishQuizResponse } from "./interfaces/quiz.interface";
import { ServiceError } from "./interfaces/service.interface";
const baseURl = process.env.EXPO_BASE_URL;

export const createQuizByUser = async (body: CreateQuizData): Promise<Quiz> => {
  const response = await fetch(`${baseURl}/quiz/create`, {
    body: JSON.stringify(body),
    method: 'POST'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  const data: Quiz = await response.json();

  return data
}

export const getQuiz = async (quizId: string): Promise<Quiz> => {
  const response = await fetch(`${baseURl}/quiz/${quizId}`, {
    method: 'GET'
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  const data: Quiz = await response.json();

  return data
}

export const finishQuiz = async (quizId: string, body: FinishQuizData): Promise<FinishQuizResponse> => {
  const response = await fetch(`${baseURl}/quiz/finish/${quizId}`, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  if(!response.ok){
    const error = new Error('Network response was not ok, status:' + response.status) as ServiceError
    error.response = await response.json();
    throw error
  }
  const data: FinishQuizResponse = await response.json();

  return data
}