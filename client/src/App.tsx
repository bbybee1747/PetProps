import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000").then((response) => {
      setMessage(response.data);
    });
  }, []);

  return <div>{message}</div>;
};

export default App;
