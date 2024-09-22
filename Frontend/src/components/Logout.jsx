import axiosClient from "../axios";
import { useStateContext } from "../context/ContexProvider";

const Logout = async (e) => {

  const { setCurrentUser, setUserToken } = useStateContext();

  try {
    await axiosClient.post("/home");

    setCurrentUser({});
    setUserToken(null);
    localStorage.removeItem('TOKEN');
    window.location.reload();
  } catch (error) {
    console.error("Erro durante o logout:", error);
  }
};

export default Logout;