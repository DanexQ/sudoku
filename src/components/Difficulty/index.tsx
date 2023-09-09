import { useAppSelector } from "../../hooks/useAppSelector";
import "./difficulty.scss";

const Difficulty = () => {
  const difficulty = useAppSelector((state) => state.board.data.difficulty);
  return <h2 className="difficulty">{difficulty}</h2>;
};

export default Difficulty;
