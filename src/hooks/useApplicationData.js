import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // to book a new appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // adding new created appointment to the appointmnets object( nested within the state object)
    const appointments = { ...state.appointments, [id]: appointment };
    console.log("I am in application bookInterview: ", id, appointments);

    //put axios request
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({ ...state, appointments });
    });
  };

  //to delete the appointment
  const cancelInterview = (id, interview) => {
    //find the respective appointment id
    const appointment = {
      ...state.appointments[id],
      interview: interview,
    };
    //set interview data to null
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      setState({ ...state, appointments });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
