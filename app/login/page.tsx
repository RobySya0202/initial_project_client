import { Login } from "./components/login";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2  min-w-screen min-h-screen bg-white">
      <img
        src="/Leavo_Splash.png"
        alt="Login Illustration"
        className="object-cover w-96 h-1/2 place-self-end self-center"
      />
      <Login />
    </div>
  );
};

export default LoginPage;
