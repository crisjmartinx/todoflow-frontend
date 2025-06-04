"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";

const MAX_RETRIES = 2;
const RETRY_DELAY = 10000;

export default function page() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailText = "test@gmail.com";
  const passwordText = "Test123!ABCHWGG";

  const [errors, setErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const avatar = email ? email[0].toLocaleUpperCase() : "";

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    retryCount = 0
  ) => {
    e.preventDefault();

    if (retryCount === 0) {
      setLoading(true);
      setErrors([]);
      setServerError(null);
    }

    try {
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
        remember: rememberMe,
      });

      if (!responseNextAuth) {
        throw new Error("❌ No hay respuesta del servidor");
      }

      if (responseNextAuth.error) {
        if (
          responseNextAuth.error.includes("Credentials") ||
          responseNextAuth.error.includes("Password incorrect")
        ) {
          setErrors((prevErrors) => [
            ...prevErrors,
            ...(responseNextAuth.error ? [responseNextAuth.error] : []),
          ]);
          setLoading(false);
          return;
        }

        setErrors((prevErrors) => [
          ...prevErrors,
          ...(responseNextAuth.error ? [responseNextAuth.error] : []),
        ]);
        throw new Error(`⚠️ Error en autenticación: ${responseNextAuth.error}`);
      }

      setLoading(false);
      router.push("/dashboard/main");
    } catch (error) {
  let errorMessage = "Error desconocido";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error(`❌ Intento ${retryCount + 1} fallido: ${errorMessage}`);

  setErrors((prevErrors) => [...prevErrors, errorMessage]);

  // Agrega esto para ver qué error llega
  console.log("Error message para serverError:", errorMessage);

  if (errorMessage.includes("Cannot POST") && retryCount === MAX_RETRIES) {
    setServerError("No se pudo establecer comunicación con el servidor, reintente.");
    setLoading(false);
  }

  if (retryCount < MAX_RETRIES) {
    if (
      !errorMessage.includes("Credentials") &&
      !errorMessage.includes("Password incorrect")
    ) {
      setTimeout(() => {
        handleLogin(e, retryCount + 1);
      }, RETRY_DELAY);
    }
  } else {
    console.error("⛔ Se alcanzó el límite de intentos. No se pudo iniciar sesión.");
  }
}
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    if (loading) true;

    setShowPassword((prev) => !prev);
  };

  const typeText = (
    setText: React.Dispatch<React.SetStateAction<string>>,
    text: string,
    interval: number
  ) => {
    const textInterval = setInterval(() => {
      setText((prevText) => {
        if (prevText.length < text.length) {
          return text.slice(0, prevText.length + 1);
        }
        clearInterval(textInterval);
        return prevText;
      });
    }, interval);

    return () => clearInterval(textInterval);
  };

  useEffect(() => {
    typeText(setEmail, emailText, 30);
    typeText(setPassword, passwordText, 30);
  }, []);

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      router.replace("/dashboard/main");
    }
  }, [session, status, router]);
  
  console.log(serverError);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)

  return (
    <>
      {status === "loading" && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-3 border-gray-900"></div>
        </div>
      )}

      {status === "unauthenticated" && (
        <div className=" bg-[#FAFAFA] h-screen w-full flex items-center">
          <div className="mx-auto p-3 w-[34rem]">
            <div className="h-auto  ">
              <div className="bg-black w-14 h-14 rounded-xl mx-auto flex items-center justify-center">
                <span
                  className="text-white text-3xl font-medium"
                  style={{
                    transform:
                      avatar.length > 0
                        ? "translateX(0)"
                        : "translateX(2.25rem)",
                    transition:
                      "transform cubic-bezier(0.175, 0.885, 0.32, 1.275) .1s",
                  }}
                >
                  {avatar}
                </span>
              </div>

              <div className="text-center mt-2 pt-9">
                <h5 className="font-semibold text-3xl text-black">
                  Bienvenido
                </h5>
                <span className="font-extralight text-lg block pt-2 text-gray-500">
                  Ingresa mail & clave para continuar
                </span>
              </div>

              <form onSubmit={handleLogin}>
                <div className="inline-flex justify-center items-center pt-7 mt-3 w-full">
                  <div
                    className="border py-[10px] px-4  rounded-[14px] inline-flex items-center gap-3"
                    style={{
                      flex: "0 1 335px",
                      boxShadow: "0 0 5px 0px rgba(0, 0, 0, 0.08)",
                      border: errors.includes("User not found")
                        ? "2px solid red"
                        : "none",
                      animation: errors.includes("User not found")
                        ? "shake 0.3s"
                        : "none",
                    }}
                  >
                    <Mail
                      className="text-[#3d3d3d] m-1"
                      style={{ flex: "1 0 23px" }}
                    />

                    <span className="bg-[#bababa] w-[1px] h-8"></span>

                    <input
                      className="text-[#3d3d3d] p-2 focus:outline-none"
                      type="email"
                      name="email"
                      placeholder="Enter your mail"
                      value={email}
                      disabled={loading}
                      style={{
                        borderRadius: "5px",
                        backgroundColor: errors.includes("User not found")
                          ? "#ff00001a"
                          : "transparent",
                        width: "100%",
                        height: "35px",
                        animation: errors.includes("User not found")
                          ? "shake 0.3s"
                          : "none",
                      }}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="inline-flex justify-center items-center py-4 mb-1 w-full">
                  <div
                    className="border py-[10px] px-4 rounded-[14px] inline-flex items-center gap-3"
                    style={{
                      flex: "0 1 335px",
                      boxShadow: "0 0 5px 0px rgba(0, 0, 0, 0.08)",
                      border: errors.includes("Password incorrect")
                        ? "2px solid red"
                        : "none",
                      animation: errors.includes("Password incorrect")
                        ? "shake 0.3s"
                        : "none",
                    }}
                  >
                    <KeyRound
                      className="text-[#3d3d3d] m-1"
                      style={{ flex: "1 0 23px" }}
                    />

                    <span className="bg-[#bababa] w-[1px] h-8"></span>

                    <input
                      className="text-[#3d3d3d] p-2 focus:outline-none"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      disabled={loading}
                      style={{
                        borderRadius: "5px",
                        backgroundColor: errors.includes("Password incorrect")
                          ? "#ff00001a"
                          : "transparent",
                        width: "100%",
                        height: "35px",
                      }}
                      onChange={handleInputChange}
                    />

                    {showPassword ? (
                      <EyeOff
                        size={31}
                        className="text-[#3d3d3d] m-1 cursor-pointer"
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />
                    ) : (
                      <Eye
                        size={31}
                        className="text-[#3d3d3d] m-1 cursor-pointer"
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-around">
                  <div
                    style={{
                      flex: "0 1 335px",
                    }}
                  >
                    <div className="flex justify-between flex-wrap">
                      <label className="flex items-center gap-4 cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="w-6 h-6 border border-gray-300 rounded-[8px] peer-checked:bg-black"></span>
                        <span className="text-gray-500 font-light cursor-default">
                          Recordar
                        </span>
                      </label>

                      {/* <a className="text-black font-light" href="">
                    Recuperar clave
                  </a> */}
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center pt-7 mt-2 mb-10 ">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#000] text-lg font-light p-[12px] rounded-[14px] text-[#FFF]"
                    style={{
                      flex: "0 1 335px",
                      boxShadow: "0 23px 25px 1px rgba(0, 0, 0, 0.28)",
                    }}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <span className="mr-3">Accediendo</span>
                        <div className="spinner-save-data-button"></div>
                      </div>
                    ) : (
                      <span>Acceder</span>
                    )}
                  </button>
                </div>

                <div
                  className="w-full text-center"
                  style={{ minHeight: "24px" }}
                >
                  {serverError && (
                    <span className="font-medium text-red-600">
                      {serverError}
                    </span>
                  )}
                </div>

                {/* <div className="w-full flex justify-center items-center pt-3 my-6 pb-5">
              <span className="bg-[#bababa] w-[85px] h-[0.5px]"></span>
              <span className="mx-5 font-extralight text-gray-500">
                Iniciar sesión con
              </span>
              <span className="bg-[#bababa] w-[85px] h-[0.5px]"></span>
            </div> */}

                {/* <div className="w-full flex justify-center items-center">
              <div
                className="flex justify-center w-full  gap-3"
                style={{ flex: "0 1 335px" }}
              >
                <div
                  className="border w-full rounded-[14px] p-2"
                  style={{ boxShadow: "0 0 5px 0px rgba(0, 0, 0, 0.08);" }}
                >
                  <a className="flex justify-center items-center gap-3" href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                      />
                      <path
                        fill="#FF3D00"
                        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                      />
                    </svg>
                    <span className="text-[#000]">Google</span>
                  </a>
                </div>

                <div
                  className="border w-full rounded-[14px] p-2"
                  style={{ boxShadow: "0 0 5px 0px rgba(0, 0, 0, 0.08);" }}
                >
                  <a className="flex justify-center items-center gap-3" href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000000"
                        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47c-1.34.03-1.77-.79-3.29-.79c-1.53 0-2 .77-3.27.82c-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51c1.28-.02 2.5.87 3.29.87c.78 0 2.26-1.07 3.81-.91c.65.03 2.47.26 3.64 1.98c-.09.06-2.17 1.28-2.15 3.81c.03 3.02 2.65 4.03 2.68 4.04c-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19c-.69.85-1.83 1.51-2.95 1.42c-.15-1.15.41-2.35 1.05-3.11"
                      />
                    </svg>
                    <span className="text-[#000]">Apple</span>
                  </a>
                </div>
              </div>
            </div> */}

                <div className="text-center mt-6 pt-3">
                  {/* <span className="font-extralight text-gray-500">
                No tiene cuenta ?
                </span>
                <a className="mx-2 underline text-black font-light" href="">
                Registrar
                </a> */}
                </div>
              </form>
            </div>
          </div>

          <div className="absolute bottom-5 text-center w-full">
            <h5 className="text-center font-extralight text-gray-800">
              Cristian's Project © 2025
            </h5>
          </div>
        </div>
      )}
    </>
  );
}
