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
      throw new Error("Assignment Group does not match course!");
  } catch (err) {
    console.error(`❌ ERROR ❌ ${err.message}`);
    return [];
  }
  //first loop through ag to see which assignments are due
  const dueAssignments = []; //creates an empty array to store the dueAssignments
  for (let a of ag.assignments) { //loop through the assignmentGroup and if they're due
    if (a.due_at < "2025-01-01") {
      dueAssignments.push(a.id); //if the string comparison says the assignment is due before 2025 then push assignments[i].id into dueAssignments
    }
  }

  //loop through the submissions, when you encounter a new submissions[i].learner_id create a new object
  //with an initial key:value of id:sub.learner_id, an array of assignments, pointsEarned and pointsPossible
  //create an array of the learners who have submissions and add the newLearners
  //then loop through submissions to see which scores to keep
  // loop through submissions
  let learners = [];// an array of objects of each unique learner to submit an assignment
  //check if the submission is due
  for (let sub of submissions) {//main loop, this loops through the submissions and parses 
   
   //if the submission is not due then move on
    if (!dueAssignments.includes(sub.assignment_id)) {continue;} 

    //learner is the object of each learner that has made a submission
    let learner = learners.find((l) => l.id === sub.learner_id);

    if (!learner) {//if no matching learner has submitted, create an empty learner TEMPLATE and push into learners[]
      learner = {
        id: sub.learner_id,
        pointsEarned: 0,
        pointsPossible: 0,
      };
    learners.push(learner);}

    //assignment is the element in assignmentGroup with the same id as the submission
    let assignment = ag.assignments.find((a) => a.id === sub.assignment_id); 
    let possible = assignment.points_possible;
    let score = sub.submission.score;
    if (sub.submission.submitted_at > assignment.due_at) { //late penalty
      score -= possible * 0.1; 
    }
    //creates and sets a key of the assignment_id to a 3 digit float of the score out of 100
    learner['Assignment ' + sub.assignment_id] = 'Score: ' + (parseFloat((score / possible).toFixed(3))*100)+"/100"; 
    //the score by percentage is saved by id as a string
    if (sub.submission.submitted_at > assignment.due_at) {
      learner['Assignment ' + sub.assignment_id] = learner['Assignment ' + sub.assignment_id]+" late"; 
    }
    learner.pointsEarned += score; //need these values for the average 
    learner.pointsPossible += possible;
    //console.log(`The score of Assignment ${sub.assignment_id} from Learner ${sub.learner_id} is ${score} out of ${possible}`);
    // learner[(sub.assignment_id)] = sub.submission.score
  }
  for (let learner of learners){ //loops through the array of objects of learners that submitted
      learner['Average Grade'] = parseFloat((learner.pointsEarned / learner.pointsPossible).toFixed(3) * 100);
      delete learner.pointsEarned; //the values are needed to find the average but deleting them cleans up the output
      delete learner.pointsPossible;
    }

  // let orderedLearners = learners.map((learner) => {
  //   let { id, avg, ...assignments } = learner;
    
  //   return { id, avg, ...assignments };
  // });

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
