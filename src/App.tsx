import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchBoard } from "./redux/slices/boardSlice";
import Grid from "./components/Grid";
import "./App.scss";
import ButtonUndo from "./components/ButtonUndo";
import Difficulty from "./components/Difficulty";
import ButtonCheckBoard from "./components/ButtonCheckBoard";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  return (
    <main className="container">
      <Difficulty />
      <Grid />
      <div className="container-buttons">
        <ButtonUndo />
        <ButtonCheckBoard />
      </div>
    </main>
  );
}

export default App;
