// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 4,
      name: "4",
      due_at: "2023-01-25",
      points_possible: 250,
    },
    {
      id: 5,
      name: "5",
      due_at: "2023-01-25",
      points_possible: 450,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  // },{
  //   learner_id: 125,
  //   assignment_id: 4,
  //   submission: {
  //     submitted_at: "2023-03-07",
  //     score: 240,
  //   },
  // },{
  //   learner_id: 132,
  //   assignment_id: 4,
  //   submission: {
  //     submitted_at: "2023-01-24",
  //     score: 180,
  //   },
  // },{
  //   learner_id: 132,
  //   assignment_id: 5,
  //   submission: {
  //     submitted_at: "2023-03-07",
  //     score: 440,
  //   },
  },
];

function getLearnerData(course, ag, submissions) {
  
  try { //error handling to check if the CourseInfo aligns with the assignmentGroup
    if (course.id !== ag.course_id)
      throw new Error("Assignment Group does not match course!");
  } catch (err) {
    console.error(`❌ ERROR ❌ ${err.message}`);
    return '';
  }

  const dueAssignments = []; //creates an empty array to store the dueAssignments
  
  for (let a of ag.assignments) { //loop through the assignmentGroup and check if they're due
    if (a.due_at < "2025-01-01") { //if the assignment is due before 2025 then push the assignment id into dueAssignments
      dueAssignments.push(a.id); 
    }
  }

  const learners = [];// an array of objects to hold each unique learner to submit an assignment
  
  for (let sub of submissions) {//main loop, this loops through the submissions and parses 

    //if the submission is not due then move on
    if (!dueAssignments.includes(sub.assignment_id)) {continue;} 

    //learner is the object of each learner that has made a submission
    let learner = learners.find((l) => l.id === sub.learner_id);

    if (!learner) {//if no matching learner has submitted, create an empty learner TEMPLATE and push into learners[]
      learner = {
        id: sub.learner_id,
        pointsEarned: 0, //these two variables are needed for the point totals and average
        pointsPossible: 0, //they are in the learner block so they can add multiple assignments 
      };
    learners.push(learner);
    }

    //assignment is the element in assignmentGroup with the same id as the submission
    const assignment = ag.assignments.find((a) => a.id === sub.assignment_id); 
    const possible = assignment.points_possible;
    let score = sub.submission.score;
    if (sub.submission.submitted_at > assignment.due_at) { //late penalty
      score -= possible * 0.1; 
    }

    //creates and sets a key of the assignment_id to the score,points_possible, a 3 digit float of the score percentage
    learner[`Assignment ${sub.assignment_id}`] = `Score: ${score} points/ ${possible} points - ${(parseFloat((score / possible).toFixed(3))*100)}%`;

    //if submitted after due date then add late string 
    if (sub.submission.submitted_at > assignment.due_at) {
      learner[`Assignment ${sub.assignment_id}`] = learner[`Assignment ${sub.assignment_id}`] + " late"
    }
    learner.pointsEarned += score; //the score isn't saved until its added into learner which gets pushed out of the loop into learners[]
    learner.pointsPossible += possible; //they need to be in the main loop to collect from multiple assignments 
  }

  for (let i = 0; i < learners.length;i++){ //loops through the array of learners that have submitted also a different type of loop
      let learner = learners[i];
      learner['Total Grade'] = parseFloat((learner.pointsEarned / learner.pointsPossible).toFixed(3) * 100)+ "%"; 
      delete learner.pointsEarned; //the related values are already displayed 
      delete learner.pointsPossible; //deleted for readability
  }

  return learners;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];
