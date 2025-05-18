"use client";

import { useRouter } from "next/navigation";
import { baseAxios } from "@/services/axios";
import { auth_endpoints } from "@/utils/endpoints";
import { Button, Checkbox, Input, message, Row, Col, Typography } from "antd";
import { useAuthStore } from "@/stores/authStore";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

/**
 * Page de connexion
 *
 * Cette page permet à l'utilisateur de se connecter
 * en entrant son email et son mot de passe.
 *
 * Si la connexion est réussie, l'utilisateur est redirigé
 * vers la page des prédictions.
 *
 * @returns {JSX.Element} La page de connexion
 */
const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  /**
   * Fonction de gestion de la soumission du formulaire de connexion
   *
   * Cette fonction envoie une requête POST vers l'endpoint de connexion
   * en passant en paramètres l'email et le mot de passe entrés par l'utilisateur.
   *
   * Si la connexion est réussie, elle enregistre le token et l'utilisateur
   * dans le store d'authentification et redirige l'utilisateur vers la page
   * des prédictions.
   *
   * Sinon, elle affiche un message d'erreur.
   *
   * @param {Object} values - Les valeurs du formulaire de connexion
   * @param {string} values.email - L'email de connexion
   * @param {string} values.password - Le mot de passe de connexion
   * @returns {Promise<void>}
   */
  const handleSubmit = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      console.log("Login values: ", values);
      const response = await baseAxios.post(auth_endpoints.login, {
        email: values.email,
        password: values.password,
      });

      if (response.data.access_token) {
        setToken(response.data.access_token);
        setUser(response.data.user);
      }

      router.push("/app/predictions");
      message.success("Connexion réussie!");
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue</h1>
          <p className="text-gray-500 mt-2">Connectez-vous à votre compte</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <Typography.Text className="block text-sm font-medium text-gray-700">
                    Email
                  </Typography.Text>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    prefix={<UserOutlined />}
                    placeholder="vous@exemple.com"
                    status={errors.email && touched.email ? "error" : ""}
                    size="large"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </Col>

                <Col span={24}>
                  <Typography.Text className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </Typography.Text>
                  <Input.Password
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                    status={errors.password && touched.password ? "error" : ""}
                    size="large"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </Col>

                <Col span={24}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Checkbox
                        name="remember"
                        checked={values.remember}
                        onChange={handleChange}
                      >
                        Se souvenir de moi
                      </Checkbox>
                    </Col>
                    <Col>
                      <a className="text-primary-100 hover:text-primary-200">
                        Mot de passe oublié?
                      </a>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-100 to-primary-200"
                    size="large"
                  >
                    Se connecter
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte?{" "}
            <a className="text-primary-100 hover:text-primary-200">
              S&apos;inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
