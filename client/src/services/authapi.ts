import axios, {AxiosError} from "axios";

const BASE_URL = "http://localhost:3000/api/auth"

export interface SigninPayload{
    email: string;
    password: string;
}
export interface SignupPayload{
    email: string;
    name: string;
    password: string;
}
export interface SigninResponse{
    success: boolean;
    message: string;
    user:{
        id: string;
        email: string;
    }
}
export interface SignupResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
export interface SignoutResponse {
  success: boolean;
  message: string;
}

export const loginService = async(payload: SigninPayload):Promise<SigninResponse> =>{
    try{
        const res = await axios.post(`${BASE_URL}/signin`,payload,{
            headers:{"content-Type":"application/json"},
        })
        return res.data;
    }catch(err){
        const error = err as AxiosError;
        console.error("loginService error api\n",error.response?.data || error.message);
        throw error;
    }
};

export const SignupService = async(payload: SignupPayload):Promise<SignupResponse> =>{
    try{
        const res = await axios.post(`${BASE_URL}/signup`,payload,{
            headers:{"Content-Type":"application/json"},
        })
        return res.data;
    }catch(err){
        const error = err as AxiosError;
        console.error("SignUpService error api\n",error.response?.data || error.message);
        throw error;
    }
};

export const signoutService = async (): Promise<SignoutResponse> => {
  try {
    const res = await axios.post<SignoutResponse>(
      `${BASE_URL}/signout`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error("signoutService error api\n",error.response?.data || error.message);
    throw error;
  }
};