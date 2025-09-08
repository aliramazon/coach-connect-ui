import "./styles.css";
import { type BarProps } from "./types";

const Bar: React.FC<BarProps> = ({ color }) => {
    return <div className={`bar bar-${color}`}></div>;
};

export { Bar };
