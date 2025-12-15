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
  },
];

function getLearnerData(course, ag, submissions) {
  //error handling to check if the CourseInfo aligns with the assignmentGroup
  try {
    if (course.id !== ag.course_id)
      throw new Error("Assignment Group does not match course");
  } catch (err) {
    console.error(err.message);
    return [];
  }
  //first loop through ag to see which assignments are due
  let dueAssignments = []; //creates an empty array to store the dueAssignments
  let pointsLookup = {}; 
  for (let a of ag.assignments) { //loop through the assignmentGroup and if they're due, add a key of the assignment ID
    // to the pointsLookup object with a value of the points_possible
    //a is each assignment
    if (a.due_at < "2025-01-01") {
      dueAssignments.push(a.id); //if the string comparison says the assignment is due before 2025 then push assignments[i].id into dueAssignments
    }
    if (dueAssignments.includes(a.id)) {
      //
      pointsLookup[a.id] = a.points_possible; //in the object of pointsLookup set the key of a to the value of points_possible
    }
  }

  //loop through the submissions, when you encounter a new submissions[i].learner_id create a new object
  //with an initial key:value of id:sub.learner_id, an array of assignments, pointsEarned and pointsPossible
  //create an array of the learners who have submissions and add the newLearners
  //then loop through submissions to see which scores to keep
  // loop through submissions
  // create an array of objects of each unique learner to submit an assignment
  let learners = [];

  for (let sub of submissions) {
    //if the submission ID is included in dueAssignments
    if (!dueAssignments.includes(sub.assignment_id)) {
      continue;
    }
    //learner returns the element that returns true (has the same sub.learner_id) that exists in learners
    let learner = learners.find((l) => l.id === sub.learner_id);

    if (!learner) {
      //if no learner submission in learners, create a learner obj and push into learners
      learner = {
        id: sub.learner_id,
        assignments: [],
        pointsEarned: 0,
        pointsPossible: 0,
      };
      learners.push(learner);
    }

    //set assignment to the element in assignmentGroup with the same id as the submission if it exists
    let assignment = ag.assignments.find((a) => a.id === sub.assignment_id); 
    let possible = assignment.points_possible;
    let score = sub.submission.score;
    if (sub.submission.submitted_at > assignment.due_at) {
      score -= possible * 0.1; 
    }
    
    learner[sub.assignment_id] = parseFloat((score / assignment.points_possible).toFixed(3));
    learner.pointsEarned += score;
    learner.pointsPossible += assignment.points_possible;
    console.log(score, possible);
    // learner[(sub.assignment_id)] = sub.submission.score

    

  }
  for (let learner of learners){
      learner.avg = parseFloat((learner.pointsEarned / learner.pointsPossible).toFixed(3));
      delete learner.pointsEarned;
      delete learner.pointsPossible;
    }
  let orderedLearners = learners.map((learner) => {
    let { id, avg, ...assignments } = learner;
    
    return { id, avg, ...assignments };
  });

  return orderedLearners;
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
