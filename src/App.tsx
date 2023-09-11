import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchBoard } from "./redux/slices/boardSlice";
import Grid from "./components/Grid";
import "./App.scss";
import ButtonUndo from "./components/ButtonUndo";
import Difficulty from "./components/Difficulty";
import ButtonCheckBoard from "./components/ButtonCheckBoard";
import { useAppSelector } from "./hooks/useAppSelector";
import ButtonPlayAgain from "./components/ButtonPlayAgain";

function App() {
  const board = useAppSelector((state) => state.board);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  if (board.status === "idle" || board.status === "loading")
    return (
      <main className="container">
        <h2>Loading</h2>
      </main>
    );

  return (
    <main className="container">
      <Difficulty />
      <Grid />
      <div className="container_buttons">
        {board.isSolved ? (
          <ButtonPlayAgain />
        ) : (
          <>
            <ButtonUndo />
            <ButtonCheckBoard />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
