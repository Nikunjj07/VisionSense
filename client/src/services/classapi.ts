import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/api/class";

//Get all classes with student data
export interface Student {
  id: string;
  spid: string;
  name: string;
  hasFaceEncoding: boolean;
}
export interface Class {
  id: string;
  name: string;
  students: Student[];
}
export interface GetClassesResponse {
  success: boolean;
  count: number;
  classes: Class[];
}

export const getClassesService = async (): Promise<GetClassesResponse> => {
  try {
    const res = await axios.get<GetClassesResponse>(
      `${BASE_URL}/getClasses`,
      {
        withCredentials: true, // required if auth uses cookies
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getClassesService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Create a new class

export interface AddClassPayload {
  name: string;
  students: string[];          // initially empty array
  numberOfLectures: number;
}
export interface AddClassResponse {
  success: boolean;
  message: string;
  class: {
    id: string;
    name: string;
    students: string[];
  };
}

export const addClassService = async (
  payload: AddClassPayload
): Promise<AddClassResponse> => {
  try {
    const res = await axios.post<AddClassResponse>(
      `${BASE_URL}/addClass`,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "addClassService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};