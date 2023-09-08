import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchBoard } from "./redux/slices/boardSlice";
// import { useAppSelector } from "./hooks/useAppSelector";
import Grid from "./components/Grid";
import "./App.scss";
import UndoMove from "./components/ButtonUndo";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  return (
    <main className="container">
      <Grid />
      <UndoMove />
    </main>
  );
}

export default App;
