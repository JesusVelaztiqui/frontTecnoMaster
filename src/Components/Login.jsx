import { useState } from "react";
import { sendData } from "../api/ApiData";
import { urlValidarUsu } from "../api/UrlConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();
  function handleLogin(event) {
    const { name, value } = event.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  }

  const validarUsuario = async () => {
    try {
      const response = await sendData(urlValidarUsu, "POST", "", usuario);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        alert(response.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bodyContent">
      <div className="cardHeader">
        <div className="containImg">
          <img
            src="../../public/Imagenes/f889af90-977e-423f-886d-2b7636f81d61.png"
            alt=""
          />
        </div>
      </div>
      <div className="cardlogin">
        <div className="textWelcome">
          <h1>TECNOMASTER SOLUCIONES</h1>
        </div>
        <div className="textGroupBussines">
          <h2>Bienvenidos al sistema de EGPSYS</h2>
        </div>
        <div className="cointainInputs">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleLogin}
          />
        </div>
        <div className="cointainInputs">
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            onChange={handleLogin}
          />
        </div>
        <div className="buttons">
          <button onClick={() => validarUsuario()}>Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
