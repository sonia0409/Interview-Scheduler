export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days
    .filter((schedule) => schedule.name === day)
    .map((day) => day.appointments)
    .flat();

  const appointments = appointmentIds.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointments;
}

export function getInterview(state, interview) {
  //input state - an arrya of objects; interview- an object with student and interviewer object
  /* const interviewObj = interview
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] }
    : null; */

  if (!interview) {
    return null;
  }
  const interviewId = interview.interviewer
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewId]
  };

  //output object of interview with student and interviewer = state.interviewer
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const interviewIds = state.days
    .filter((schedule) => schedule.name === day)
    .map((day) => day.interviewers)
    .flat();

  const interviews = interviewIds.map(
    (interviewId) => state.interviewers[interviewId]
  );

  return interviews;
}