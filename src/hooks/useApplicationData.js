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

   

  // update the existing spots
  const updateSpots = (requestType) => {
    /* const days = state.days
    const day = days.fi(day => day.name === state.day )
    console.log("========",day)
    const spot = requestType === "bookAppointment"? { ...day, spots: day.spots - 1 }:{ ...day, spots: day.spots + 1 };
    console.log("============", spot)
    return  spot ; */
    const days = state.days.map( day => {
      if (day.name === state.day) {
        if (requestType === "bookAppointment") {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return { ...day }
      }
    })
    // console.log("----days", days)
    return days
  }


  // to book a new appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      // interview: { ...interview },
    };

    const editing = appointment.interview
    appointment.interview = { ...interview } 

    let days = [ ...state.days ];
    
    // adding new created appointment to the appointmnets object( nested within the state object)
    const appointments = { ...state.appointments, [id]: appointment };
    console.log("I am in application bookInterview: ", id, appointments);

    //put axios request
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      if (process.env.TEST_ERROR) {
        setTimeout(() => res.status(500).json({}), 1000);
        return;
      }
      if (!editing) {
        days = updateSpots("bookAppointment")
      }
      setState({ ...state, appointments, days });
  
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
      const days = updateSpots()
      setState({ ...state, appointments, days });
     
    });
  };

  return { state, setDay, bookInterview, cancelInterview, remainingSpots };
}

export default useApplicationData;
