import { useState, useEffect } from "react";

import "./Card.css";

function Card({ card_data, handle_click }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilters([
      card_data.role || [],
      card_data.level || [],
      ...(card_data.languages || []),
      ...(card_data.tools || []),
    ]);
  }, [card_data]);

  return (
    <div className={`card ${card_data.new ? "new" : ""}`}>
      <section className="company_info">
        <img src={card_data.logo} alt="Logo" />
        <div className="infos">
          <header className="company_info_header">
            <p className="company_name">{card_data.company}</p>
            {card_data.new && <span id="new">NEW!</span>}
            {card_data.featured && <span id="featured">FEATURED</span>}
          </header>
          <h2>{card_data.position}</h2>
          <ul className="company_contract">
            <li>{card_data.postedAt}</li>
            <li>{card_data.contract}</li>
            <li>{card_data.location}</li>
          </ul>
        </div>
      </section>

      <hr style={{ display: "none" }} />

      <section className="card_filters">
        {filters.map((filter, index) => (
          <span
            className="filter"
            key={index}
            onClick={() => handle_click(filter)}
          >
            {filter}
          </span>
        ))}
      </section>
    </div>
  );
}

export default Card;
