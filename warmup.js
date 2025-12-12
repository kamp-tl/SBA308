// ===============================================
// Student Score Analyzer Warmup
// ===============================================

// Starter data
const students = [
    { name: "Alice", score: 88 },
    { name: "Ben", score: 72 },
    { name: "Cara", score: 95 },
    { name: "Dan", score: 64 }
  ];
  
  // ===============================================
  // TODO 1: Main function (runAnalyzer)
  // - Call your helper functions
  // - Log the results in a clean way
  // ===============================================
  
  function runAnalyzer() {
    let result = {"Average Score":getAverageScore(students),
                    "Top Student":getTopStudent(students),
                    "Passing Students":getPassingStudents(students)};
    console.log(result)
    return result;
    // TODO: call getAverageScore, getTopStudent, and getPassingStudents
    // TODO: log each result
  }
  
  
  
  // ===============================================
  // TODO 2: getAverageScore(students)
  // - Return the average score as a number
  // ===============================================
  
  function getAverageScore(studentsArray) {
    // TODO: calculate and return average score
    let totalScore = 0;
    for (let i = 0;i<studentsArray.length;i++){
        totalScore+=studentsArray[i].score
    }
    let average = totalScore/studentsArray.length
    return average
  }
  
  
  
  // ===============================================
  // TODO 3: getTopStudent(students)
  // - Return the student object with the highest score
  // ===============================================
  
  function getTopStudent(studentsArray) {
    // TODO: loop through students and return the top scorer
    let topStudent;
    let topScore = 0;
    for (let i = 0; i < studentsArray.length;i++){
        if (studentsArray[i].score >= topScore){
            topScore = studentsArray[i].score
            topStudent = studentsArray[i].name        }
    }
    return topStudent
  }
  
  
  
  // ===============================================
  // TODO 4: getPassingStudents(students)
  // - Return an array of students with score >= 70
  // ===============================================
  
  function getPassingStudents(studentsArray) {
    // TODO: filter or loop and return passing students
    let passingStudents = [];
    for (let i = 0; i < studentsArray.length; i++){
        if(studentsArray[i].score >= 70){
            passingStudents.push(studentsArray[i].name)
        }
    }
    return passingStudents
  }
  
  
  
  // ===============================================
  // TODO 5: Call runAnalyzer() at the bottom
  // ===============================================
  
  runAnalyzer(students);
  
  // ===============================================
  // Example Output
  // ===============================================
  // Average Score: 79.75
  // Top Student: Cara
  // Passing Students: Alice, Ben, Cara
  
  // ===============================================
  // Bonus:
  // ===============================================
  // Implement error handling

  
  
  
  
  
  
  
  