import React from "react";
import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "helpers/useVisualMode";

function Appointment(props) {
  const { time, interview, interviewers, ...appointment } = props;

  //mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM ";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); // if interview is true set mode = SHOW else EMPTY

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    setTimeout(() => {
      props.bookInterview(appointment.id, interview).then(transition(SHOW));
    }, 1000);
  };
  const onDelete = () => {
    //transition(CONFIRM);
    const interview = "null";
    props.cancelInterview(appointment.id, interview);
  };
  
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
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM) }  // to delete the interview
          onEdit={() => transition(EDIT) }
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={() => {
            onDelete();
            transition(DELETING);
            setTimeout(() => transition(EMPTY),1500)
          }
          }
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      
      {mode === EDIT && interview && <Form 
      student={interview.student}
      interviewer={interview.interviewer.id}
      interviewers={interviewers}
      onSave={save }  // to save the changes
      onCancel={() => back() }/> }
      
    </article>
  );
}

export default Appointment;
