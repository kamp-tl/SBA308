// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
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
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    try {
      if (course.id !== ag.course_id)
    throw new Error("Assignment Group does not match course") }
    catch (err){console.error(err.message)
      return [];
  }
    // here, we would process this data to achieve the desired result.
    //create a variable to store the result as an array of objects consisting of an id, average assignment score and each assignment score 
    //first look at assignmentGroup and see what is due 
    // assignmentGroup is an Object {} the value of assignments is an Array of Objects with a due-at key
    //look at the submissions and see which submission is due and when it was turned in 
    
    //first loop through ag to see which assignments are due
    let dueAssignments = [];
    for(let i = 0;i<ag.assignments.length;i++){
    if (ag.assignments[i].due_at<"2025-01-01"){
      dueAssignments.push(ag.assignments[i].id)
    }
    }
    //loop through the submissions, when you encounter a new submissions[i].learner_id create a new object 
    //with an initial key:value of id:submissions[i].learner_id 
    //create an array of the learners who have submissions and add the newLearners 
    //then loop through submissions to see which scores to keep 
    // loop through submissions
    // create an array of objects of each unique learner to submit an assignment
    let learners = []
    
    for (let sub of submissions){
      let total = 0;
      //if the submission ID is included in dueAssignments 
      if (!dueAssignments.includes(sub.assignment_id)){
        continue;
      }
      //learner returns true or false based off if the current sub.learner_id exists in learners
      let learner = learners.find(l => l.id === sub.learner_id)

      if (!learner) { //if new learner submission, create a learner obj and push into learners 
        learner = {id:sub.learner_id}
        learners.push(learner)
        
      }
   
        learner[(sub.assignment_id)] = sub.submission.score

      let assignments = Object.keys(learner) //creates an assignments array consisting of learner keys
      .filter(key => !isNaN(key)) //filters out the keys that are not numbers (id)
      .map(key => learner[key]) //replaces the keys with their values 

      total = assignments.reduce((a,b) => a+b,0) //adds up all values and saves in total

      learner.avg = total / assignments.length;  // add an avg property 
      
    }
    let orderedLearners = learners.map(learner => {
      let {id, avg, ...assignments } = learner;
      return {id, avg, ...assignments};
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
