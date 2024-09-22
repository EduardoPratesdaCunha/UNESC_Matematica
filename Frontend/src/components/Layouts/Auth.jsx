import React from "react";
import { useStateContext } from "../../context/ContexProvider";
import { Navigate, Outlet } from "react-router-dom";
import AuthHeader from "../Header/AuthHeader";

export default function Auth () {
  const { currentUser, userToken } = useStateContext();

  if (!userToken || !currentUser) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <AuthHeader />

      <section>
        <Outlet />
      </section>
    </>
  )
}