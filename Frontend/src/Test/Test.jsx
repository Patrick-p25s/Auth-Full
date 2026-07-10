import { useState } from "react";

export default function Test() {
  const [color, setColor] = useState("red");
  const handleChange = (e) => {
    setColor(e.target.value);
  };
  return (
    <div>
      <select value={color} onChange={handleChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </select>
      <p className={`text-${color}-500`}>Patrick</p>
    </div>
  );
}
