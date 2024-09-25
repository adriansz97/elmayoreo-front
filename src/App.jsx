import { useEffect } from "react"
import { AppRouter } from "./router/AppRouter"
import { useDispatch } from "react-redux";
import { setWindowSize } from "./store/app/appSlice";

export const App = () => {

  const dispatch = useDispatch();

  // RESIZE EVENT
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    dispatch(setWindowSize({ width, height }))
    const resizeListener = (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      dispatch(setWindowSize({ width, height }))
    }
    window.addEventListener("resize", resizeListener);
  }, []);

  return (
    <AppRouter />
  )
}

