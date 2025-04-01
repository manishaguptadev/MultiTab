import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import MultiTabForm from "./components/MultiTabForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MultiTabForm />
    </>
  );
}

export default App;
