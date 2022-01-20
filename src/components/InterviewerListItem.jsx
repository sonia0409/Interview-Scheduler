//purpose of this file is to contain the interviewer and react to the actions or clicks accodingly
//props--> id:number, name: string, avatar: url, selected: boolean, setInterviewer: function(clickable)

import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem(props) {
  const { id, name, avatar, setInterviewer ,selected} = props;
  const interviewerStyle = classNames("interviewers__item", {"interviewers__item--selected": selected} )

  return (
    <li onClick={setInterviewer} className={interviewerStyle}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {props.selected && name}
    </li>
  );
}

export default InterviewerListItem;
