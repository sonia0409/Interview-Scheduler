//create an array of list of Interviewers. pass the props to the InterviewerListItem container
//three props are being passed-->
//interviewers: an array(list of interviewers),
//setInterviewer: function (that pass down the id to InterviewerListItem)
//interviewer: number (id)

import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
const { interviewers, value, onChange } = props;

const listOfInterviewers = interviewers.map(person => <InterviewerListItem 
  key={person.id}
  name={person.name}
  avatar={person.avatar}
  setInterviewer={() => onChange(person.id)}
  selected={person.id === value}
/>)


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
      </ul>
    </section>
  );
}

export default InterviewerList;
