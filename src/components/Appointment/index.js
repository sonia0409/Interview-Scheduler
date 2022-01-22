import React from "react";
import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "helpers/useVisualMode";

function Appointment(props) {
  const { time, interview, interviewers } = props;
  //mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
//console.log("I am in appointment- interview props:", interview)

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
//            console.log("Add on Clicked");
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => {
//            console.log("onCancel Clicked!!");
            back();
          }}
        />
      )}
    </article>
  );
}

export default Appointment;
