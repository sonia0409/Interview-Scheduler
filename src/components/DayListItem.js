import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const fullSpot = props.spots === 0 ? true : false;
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": fullSpot,
  });

  function formatSpots() {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }
    if (props.spots === 0) {
      return `no spots remaining`;
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
