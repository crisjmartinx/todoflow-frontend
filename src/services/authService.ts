// import axios from "axios";

// import { LoginResponse } from "../types/login-response.interface";

// export const loginService = async (
//   email: string,
//   password: string
// ): Promise<LoginResponse> => {
//   try {
//     const response = await axios.post<LoginResponse>(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//       { email, password },
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       throw new Error(error.response.data.message || "Error al iniciar sesión");
//     } else {
//       throw new Error("Error desconocido al intentar iniciar sesión");
//     }
//   }
// };
