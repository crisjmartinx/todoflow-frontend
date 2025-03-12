// import { loginService } from "@/services/authService";
// import { LoginResponse } from "@/types/login-response.interface";

// export const loginUser = async (email: string, password: string) => {
//   if (!email || !password) return;

//   try {
//     const response = await loginService(email, password);

//     return response;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || "Credenciales incorrectas"
//     );
//   }
// };
