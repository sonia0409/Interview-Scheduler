export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days.filter(
    (schedule) => schedule.name === day
  ).map(day => day.appointments).flat();
  
  const appointments = appointmentIds.map(appointmentId => state.appointments[appointmentId])
   
  return appointments;
}
