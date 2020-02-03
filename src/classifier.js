/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

function getAge(dob) {
  let date = new Date(dob).toISOString();
  let today = new Date();
  let birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function createGroup(group) {
  const total = group.reduce((prev, student) => {
    return Number(prev) + Number((getAge(student.dob)));
  }, 0);

  const studentGroup = {
    members: [],
    oldest: getAge(group[group.length - 1].dob),
    sum: total,
    regNos: []
  };

  group.forEach((student) => {
    studentGroup.members = [...studentGroup.members, { name: student.name, dob: student.dob, age: getAge(student.dob), regNo: student.regNo }];
    studentGroup.regNos = [...studentGroup.regNos, parseInt(student.regNo)].sort((a, b) => a - b)
  })
  return studentGroup;
}


function classifier(input) {
  // Your code should go here.

  if (input.length == 0) {
    return { noOfGroups: 0 };
  }
  if (input.isArray == false) {
    return false;
  }

  //  Sort array by dob
  let output = {};

  if (input.length == 1) {
    output['noOfGroups'] = 1;
    output['group' + input.length] = createGroup(input);
    return output;
  }

  let sortedInput = input.slice().sort((a, b) => new Date(b.dob).getFullYear() - new Date(a.dob).getFullYear());
  // group students
  let group = []
  let arrayOfGroups = [];
  for (let i = 0; i < sortedInput.length; i++) {
    // check if group has less than 3 students
    if (group.length < 3) {
      // check if group is actually empty and push current Student
      if (group.length == 0) {
        group.push(sortedInput[i]);
      } else {
        if (getAge(sortedInput[i].dob) - getAge(group[0].dob) <= 5) {
          group.push(sortedInput[i]);
        } else {
          arrayOfGroups.push(group);
          output['group' + arrayOfGroups.length] = createGroup(group);
          group = [];
          group.push(sortedInput[i]);
        }
      }
    }
    // check if group is has more 3 students push group to arrays of group
    else {
      arrayOfGroups.push(group);
      output['group' + arrayOfGroups.length] = createGroup(group);
      group = [];
      group.push(sortedInput[i]);
    }
  }

  if (group.length != 0) {
    arrayOfGroups.push(group);
    output['group' + arrayOfGroups.length] = createGroup(group);
  }
  output['noOfGroups'] = arrayOfGroups.length;
  return output;
}

module.exports = classifier;
