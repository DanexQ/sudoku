import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchBoard } from "./redux/slices/boardSlice";
// import { useAppSelector } from "./hooks/useAppSelector";
import Grid from "./components/Grid";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-neutral-900">
      <Grid />
    </div>
  );
}

export default App;
