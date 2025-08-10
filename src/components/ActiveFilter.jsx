import icon_remove from "../assets/icon-remove.svg";
import "./ActiveFilter.css";

function ActiveFilter({ text, handle_delete }) {
  return (
    <li className="active_filter">
      <span>{text}</span>
      <button onClick={() => handle_delete(text)}>
        <img src={icon_remove} alt="Remove" />
      </button>
    </li>
  );
}

export default ActiveFilter;
