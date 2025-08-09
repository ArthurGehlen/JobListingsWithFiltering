import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(["teste"]);

  const fetch_data = () => {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <>
      <header id="page_header"></header>

      <main>
        {jsonData.map((card, index) => (
          <Card card_data={card} key={index} />
        ))}
      </main>
    </>
  );
}

export default App;
