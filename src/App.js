import { useState } from "react";
import Complete from "./components/Complete";
import "tachyons";
import "./App.css";

import CreditCard from "./components/CreditCard";

function App() {
  const [complete, setComplete] = useState(false);

  return (
    <div
      className="flex items-center justify-center vh-100"
      style={{ backgroundColor: "#a0e2a7" }}
    >
      {complete ? <Complete /> : <CreditCard setComplete={setComplete} />}
    </div>
  );
}

export default App;
