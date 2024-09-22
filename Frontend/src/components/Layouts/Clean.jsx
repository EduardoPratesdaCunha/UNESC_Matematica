import { Outlet, Navigate } from "react-router-dom"
import { useStateContext } from "../../context/ContexProvider"

const Redirect = () => {
  const { currentUser, userToken } = useStateContext();

  if (!userToken || !currentUser) {
    return <Navigate to="/login" />
  }

  return <Navigate to="/simulate/index" />
}

export default function CleanLayout () {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Redirect />
  }

  return (
    <>
      <section>
        <Outlet />
      </section>
    </>
  )
}