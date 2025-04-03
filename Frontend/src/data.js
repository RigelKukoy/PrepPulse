export const schedule = [
  {
    date: "February 28, 2025",
    description:
      "Final exam for the Advanced Mathematics course. Make sure to review all chapters, especially calculus and linear algebra. Bring your student ID, calculator, and writing materials.",
    id: 1,
    sched: new Date(
      "Fri Feb 28 2025 09:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "9:00 AM",
    title: "Exam",
  },
  {
    date: "March 1, 2025",
    description:
      "Deadline for submitting the group project on Artificial Intelligence. Ensure all code is properly documented, the report is finalized, and the presentation slides are ready. Don't forget to upload everything to the online portal before 2:00 PM.",
    id: 2,
    sched: new Date(
      "Sat Mar 01 2025 14:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "2:00 PM",
    title: "Project Submission",
  },
  {
    date: "March 3, 2025",
    description:
      "Team meeting to discuss the progress of the new product development. Agenda includes reviewing the prototype, assigning tasks for the next sprint, and addressing any blockers. Prepare your updates and suggestions beforehand.",
    id: 3,
    sched: new Date(
      "Mon Mar 03 2025 10:30:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "10:30 AM",
    title: "Meeting",
  },
  {
    date: "March 5, 2025",
    description:
      "Annual check-up with Dr. Santos at Greenfield Medical Center. Bring your medical history records and a list of any current medications. Fasting may be required for blood tests, so confirm with the clinic beforehand.",
    id: 4,
    sched: new Date(
      "Wed Mar 05 2025 11:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "11:00 AM",
    title: "Appointment",
  },
  {
    date: "March 7, 2025",
    description:
      "Gym session with a focus on strength training. Plan to work on upper body exercises, including bench press, dumbbell rows, and shoulder presses. Don't forget your gym clothes, water bottle, and towel.",
    id: 5,
    sched: new Date(
      "Fri Mar 07 2025 18:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "6:00 PM",
    title: "Gym",
  },
  {
    date: "March 10, 2025",
    description:
      "Birthday party for Sarah at her house. Theme is '80s Retro,' so dress accordingly. Bring a gift and be ready for fun activities like karaoke and board games. RSVP by March 5th.",
    id: 6,
    sched: new Date(
      "Mon Mar 10 2025 19:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "7:00 PM",
    title: "Birthday",
  },
  {
    date: "March 12, 2025",
    description:
      "Client presentation for the new marketing campaign. Prepare a 20-minute presentation covering the strategy, key deliverables, and expected outcomes. Bring printed copies of the proposal and ensure all digital materials are ready.",
    id: 7,
    sched: new Date(
      "Wed Mar 12 2025 13:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "1:00 PM",
    title: "Presentation",
  },
  {
    date: "March 15, 2025",
    description:
      "Weekend getaway to Baguio City. Plan to visit Burnham Park, Mines View, and the Strawberry Farm. Pack warm clothes, snacks, and a camera. Departure is at 8:00 AM sharp from the meeting point.",
    id: 8,
    sched: new Date(
      "Sat Mar 15 2025 08:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "8:00 AM",
    title: "Travel",
  },
  {
    date: "March 18, 2025",
    description:
      "Dentist appointment for a routine cleaning and check-up at Smile Dental Clinic. Bring your dental insurance card and any previous X-rays if available. Arrive 10 minutes early to fill out paperwork.",
    id: 9,
    sched: new Date(
      "Tue Mar 18 2025 15:30:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "3:30 PM",
    title: "Dentist",
  },
  {
    date: "March 20, 2025",
    description:
      "Conference call with the international team to discuss the Q1 performance and upcoming projects. Ensure you have a stable internet connection, your notes, and any relevant data ready. The meeting link will be shared via email.",
    id: 10,
    sched: new Date(
      "Thu Mar 20 2025 16:00:00 GMT+0800 (Philippine Standard Time)"
    ),
    time: "4:00 PM",
    title: "Conference",
  },
];

export const tasks = [
  {
    id: 1,
    schedID: 1, // Reference to the schedule
    taskDescription: "Review Chapter 1",
    isChecked: false,
  },
  {
    id: 2,
    schedID: 1, // Reference to the schedule
    taskDescription: "Solve practice problems",
    isChecked: true,
  },
];

// References
export const references = [
  {
    id: 1,
    schedID: 1, // Reference to the schedule
    title: "Math Textbook",
    description:
      "A comprehensive textbook covering algebra, geometry, and calculus.",
    link: "https://example.com/math-textbook",
  },
  {
    id: 2,
    schedID: 1, // Reference to the schedule
    title: "Lecture Notes",
    description:
      "Handwritten notes from the latest math lecture, including key formulas.",
    link: "https://example.com/lecture-notes",
  },
];
