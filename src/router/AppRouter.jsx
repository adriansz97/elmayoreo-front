import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useEffect } from "react";
import { startLoginWithLS } from "../store/auth/authThunks";

export const AppRouter = () => {

  const { isLoggedIn } = useSelector(state=>state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoginWithLS());
  }, []);

  return (
    <BrowserRouter>

      {
        !isLoggedIn &&
        <PublicRoutes />
      }
      
      {
        isLoggedIn &&
        <PrivateRoutes />
      }

    </BrowserRouter>
  )
}
