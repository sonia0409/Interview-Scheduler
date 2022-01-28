import React from "react";
import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM ";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {
  const { time, interview, interviewers, ...appointment } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); // if interview is true set mode = SHOW else EMPTY

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    props
      .bookInterview(appointment.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, false));
  };

  const onDelete = () => {
    //transition(CONFIRM);
    const interview = null;
    props
      .cancelInterview(appointment.id, interview)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
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
          onDelete={() => transition(CONFIRM)} // to delete the interview
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
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
          }}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === EDIT && interview && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save} // to save the changes
          onCancel={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save new appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={() => back()} />
      )}
    </article>
  );
}

export default Appointment;
