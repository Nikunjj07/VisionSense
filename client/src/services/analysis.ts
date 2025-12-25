import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/api/analysis";

//Get analysis for specific class
export interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent";
  date: string;
}

export interface AttentionRecord {
  studentId: string;
  focusPercent: number;
  timestamp: string;
}
export interface AnalysisStats {
  totalStudents: number;
  totalAttendanceRecords: number;
  totalAttentionRecords: number;
}
export interface ClassInfo {
  id: string;
  name: string;
}
export interface GetClassWiseAnalysisResponse {
  success: boolean;
  class: ClassInfo;
  attendance: AttendanceRecord[];
  attention: AttentionRecord[];
  stats: AnalysisStats;
}
export const getClassWiseAnalysisService = async (
  classId: string
): Promise<GetClassWiseAnalysisResponse> => {
  try {
    const res = await axios.get<GetClassWiseAnalysisResponse>(
      `${BASE_URL}/getClassWise`,
      {
        params: { classId },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getClassWiseAnalysisService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get analysis for a specific student
export interface StudentInfo {
  id: string;
  spid: string;
  name: string;
  classId: string;
}
export interface AttendanceRecord {
  date: string;
  status: "present" | "absent";
}

export interface AttentionRecord {
  timestamp: string;
  focusPercent: number;
}
export interface StudentAnalysisStats {
  totalClasses: number;
  classesAttended: number;
  attendancePercentage: string;     // "93.33%"
  averageFocusPercent: string;      // "75.50%"
}
export interface GetStudentWiseAnalysisResponse {
  success: boolean;
  student: StudentInfo;
  attendance: AttendanceRecord[];
  attention: AttentionRecord[];
  stats: StudentAnalysisStats;
}

export const getStudentWiseAnalysisService = async (
  spid: string
): Promise<GetStudentWiseAnalysisResponse> => {
  try {
    const res = await axios.get<GetStudentWiseAnalysisResponse>(
      `${BASE_URL}/getStudentWise`,
      {
        params: { spid },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getStudentWiseAnalysisService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Get system-wide analytics
export interface StudentInfo {
  id: string;
  spid: string;
  name: string;
  classId: string;
}
export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: "present" | "absent";
}

export interface AttentionRecord {
  studentId: string;
  focusPercent: number;
  timestamp: string;
}
export interface SystemStats {
  totalStudents: number;
  totalAttendanceRecords: number;
  totalAttentionRecords: number;
  overallAttendanceRate: string;   // "85.50%"
  averageOverallFocus: string;     // "72.30%"
}
export interface GetAllAnalysisResponse {
  success: boolean;
  students: StudentInfo[];
  attendance: AttendanceRecord[];
  attention: AttentionRecord[];
  stats: SystemStats;
}

export const getAllAnalysisService = async (): Promise<GetAllAnalysisResponse> => {
  try {
    const res = await axios.get<GetAllAnalysisResponse>(
      `${BASE_URL}/getAllData`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(
      "getAllAnalysisService error api\n",
      error.response?.data || error.message
    );
    throw error;
  }
};