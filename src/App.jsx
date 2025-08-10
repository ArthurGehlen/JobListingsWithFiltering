import ActiveFilter from "./components/ActiveFilter";
import Card from "./components/Card";

import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeFiltersOn, setActiveFiltersOn] = useState(false);

  const fetch_data = () => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handle_click = (filter) => {
    setActiveFiltersOn(true);
    setActiveFilters((prevFilters) => {
      if (!prevFilters.includes(filter)) {
        return [...prevFilters, filter];
      }
      return prevFilters;
    });
  };

  const handle_delete = (remove_filter) => {
    const updatedFilters = activeFilters.filter((f) => f !== remove_filter);
    setActiveFilters(updatedFilters);
    setActiveFiltersOn(updatedFilters.length > 0);
  };

  const clear_all = () => {
    setActiveFiltersOn(false);
    setActiveFilters([]);
  };

  const filtered_data =
    activeFilters.length > 0
      ? jsonData.filter((card) => {
          const card_filters = [
            card.role || [],
            card.level || [],
            ...(card.languages || []),
            ...(card.tools || []),
          ];
          return activeFilters.every((filter) => card_filters.includes(filter));
        })
      : jsonData;

  return (
    <>
      <header id="page_header">
        {activeFilters.length > 0 ? (
          <div className="filters_container">
            <ul className="filters_list">
              {activeFilters.map((active_filter, index) => (
                <ActiveFilter
                  text={active_filter}
                  key={index}
                  handle_delete={handle_delete}
                />
              ))}
            </ul>
            <button id="clear" onClick={clear_all}>
              Clear
            </button>
          </div>
        ) : (
          <div className="filters_container" style={{ display: "none" }}></div>
        )}
      </header>

      <main className={activeFiltersOn ? "main_filter_on" : ""}>
        {filtered_data.map((card, index) => (
          <Card card_data={card} key={index} handle_click={handle_click} />
        ))}
      </main>
    </>
  );
}

export default App;
