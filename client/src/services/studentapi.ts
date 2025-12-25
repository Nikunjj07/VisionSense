import axios, {AxiosError} from "axios";

const BASE_URL = "http://localhost:3000/api/student";


//Add a New student to the system
export interface AddStudentPayload {
  spid: string;
  name: string;
  classId: string;
}

export interface AddStudentResponse {
  success: boolean;
  message: string;
  student: {
    id: string;
    spid: string;
    name: string;
    classId: string;
  };
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // IMPORTANT if auth uses cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export const addStudentService = async (
  payload: AddStudentPayload
): Promise<AddStudentResponse> => {
  try {
    const res = await api.post<AddStudentResponse>(
      `${BASE_URL}/addStudent`,
      payload
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "addStudentService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Upldoad student Photo for face recognition encoding
export interface UploadPhotosPayload {
  studentId: string;
  images: string[]; // base64 encoded images
}

export interface UploadPhotosResponse {
  success: boolean;
  message: string;
  student: {
    id: string;
    spid: string;
    name: string;
    hasFaceEncoding: boolean;
  };
}

export const uploadStudentPhotosService = async (
  payload: UploadPhotosPayload
): Promise<UploadPhotosResponse> => {
  try {
    const res = await api.post<UploadPhotosResponse>(
      "/student/uploadPhotos",
      payload
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "uploadStudentPhotosService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Get all students in a specific class
export interface Student {
  id: string;
  spid: string;
  name: string;
  classId: string;
  hasFaceEncoding: boolean;
}
export interface GetStudentsByClassResponse {
  success: boolean;
  count: number;
  students: Student[];
}

export const getStudentsByClassService = async (
  classId: string
): Promise<GetStudentsByClassResponse> => {
  try {
    const res = await axios.get<GetStudentsByClassResponse>(
      `${BASE_URL}/getStudentsByClass`,
      {
        params: { classId },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getStudentsByClassService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Get details of a specific student
export interface Student {
  id: string;
  spid: string;
  name: string;
  classId: string;
}
export interface GetStudentDataResponse {
  success: boolean;
  student: Student;
}

export const getStudentDataService = async (
  spid: string
): Promise<GetStudentDataResponse> => {
  try {
    const res = await axios.get<GetStudentDataResponse>(
      `${BASE_URL}/getStudentData`,
      {
        params: { spid },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getStudentDataService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};