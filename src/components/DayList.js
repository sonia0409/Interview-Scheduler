import React from "react";
import DayListItem from "components/DayListItem";

function DayList(props) {
  const daysArray = props.days;
  const daysList = daysArray.map((element) => (
    <DayListItem
      key={element.id}
      name={element.name}
      spots={element.spots}
      selected={element.name === props.value}
      setDay={props.onChange}
    />
  ));

  return <ul>{daysList}</ul>;
}

export default DayList;
