import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/api/session";

//Start a monitoring session for attendance tracking
export interface StartSessionPayload {
  classId: string;
  duration: number; // in minutes
}
export interface Session {
  id: string;
  classId: string;
  startAt: string;   // ISO date string
  duration: number;
  status: "active" | "completed";
}
export interface StartSessionResponse {
  success: boolean;
  message: string;
  session: Session;
}

export const startSessionService = async (
  payload: StartSessionPayload
): Promise<StartSessionResponse> => {
  try {
    const res = await axios.post<StartSessionResponse>(
      `${BASE_URL}/startSession`,
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
      "startSessionService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//End a session and process attendance data
export interface Session {
  id: string;
  classId: string;
  startAt: string; // ISO date string
  endAt: string;   // ISO date string
  status: "completed";
}
export interface RecordsCreated {
  attendance: number;
  attention: number;
}
export interface EndSessionResponse {
  success: boolean;
  message: string;
  session: Session;
  recordsCreated: RecordsCreated;
}
export const endSessionService = async (
  sessionId: string
): Promise<EndSessionResponse> => {
  try {
    const res = await axios.get<EndSessionResponse>(
      `${BASE_URL}/endSession`,
      {
        params: { sessionId },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "endSessionService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};