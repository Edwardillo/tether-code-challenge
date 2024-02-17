import { useDispatch, useSelector } from "react-redux";
import { setPrecision } from "./store";

const PrecisionSelector = () => {
  const currentPrecision = useSelector((state) => state.books.precision);
  const dispatch = useDispatch();

  const PRECISION = [
    { value: "P0", name: 5 },
    { value: "P1", name: 4 },
    { value: "P2", name: 3 },
    { value: "P3", name: 2 },
    { value: "P4", name: 1 },
  ];

  const handlePrecisionChange = (e) => {
    dispatch(setPrecision(e.target.value));
  };

  return (
    <>
      <label className="precision-label">Select Precision Level:</label>
      <select value={currentPrecision} onChange={handlePrecisionChange}>
        {PRECISION.map((level) => (
          <option key={level.value} value={level.value}>
            {level.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default PrecisionSelector;
