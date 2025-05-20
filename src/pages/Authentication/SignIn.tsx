import React from "react";


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../../models/User";
import SecurityService from '../../services/securityService';
import Breadcrumb from "../../components/Breadcrumb";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import googleLogo from "../../images/logo/icons8-logo-de-google.svg"
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const SignIn: React.FC = () => {

  const navigate = useNavigate();
  const handleLogin = async (user: User) => {
    console.log("aqui " + JSON.stringify(user))
    try {
      const response = await SecurityService.login(user);
      console.log('Usuario autenticado:', response);
      window.location.href = "/"; // Redirigir a la página de inicio después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  }
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // tokenResponse.access_token contiene el token de Google
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await res.json();
        console.log(userInfo)

        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('token', tokenResponse.access_token)

        console.log('Usuario de Google:', userInfo);
        navigate('/');
      } catch (error) {
        console.error('Error al obtener información del usuario', error);
      }
    },
    onError: () => {
      console.error('Error al iniciar sesión con Google');
    },
  });

  return (
    <>


      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2  mx-auto">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium text-center mx-auto">Comienza!</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center mx-auto">
                Inicio de sesión
              </h2>


              <Formik
                initialValues={{
                  email: "",
                  password: ""
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Email inválido").required("El correo es obligatorio"),
                  password: Yup.string().required("La contraseña es obligatoria"),
                })}
                onSubmit={(values) => {
                  const formattedValues = { ...values };  // Formateo adicional si es necesario
                  handleLogin(formattedValues);
                }}

              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo</label>
                      <Field type="email" name="email" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Edad */}
                    <div>
                      <label htmlFor="password" className="block text-lg font-medium text-gray-700">Contraseña</label>
                      <Field type="password" name="password" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                    </div>
                    {/* Botón de enviar */}
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Acceder
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        login();
                      }
                      }
                      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    >
                      <img src={googleLogo} alt="Google" className="w-5 h-5" />
                      Iniciar sesión con Google
                    </button>
                    <h1 className="text-center">o</h1>
                    <Link
                      to={"/auth/signup"}
                    >
                      <button
                        type="submit"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-black-2 p-4 text-white transition hover:bg-opacity-90"
                      >
                        Registrate
                      </button>
                    </Link>

                  </Form>
                )}
              </Formik>

              <div className="mt-6 text-center">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
