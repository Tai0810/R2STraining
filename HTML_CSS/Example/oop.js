function Student(fullName, dateOfBirth) {
  this.fullName = fullName; 
  this.dateOfBirth = dateOfBirth; 
}

Student.prototype.getFirstName = function() {
  return this.fullName.split(' ').pop();
};

Student.prototype.getAge = function() {
  // const today = new Date();
  // const birthDate = new Date(this.dateOfBirth);
  // let age = today.getFullYear() - birthDate.getFullYear();
  // const monthDifference = today.getMonth() - birthDate.getMonth();

  // if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
  //   age--;
  // }

  // return age;
  const year = Number(this.dateOfBirth.split('/').pop());
  return new Date().getFullYear - year;
};

const student = new Student('Vo Trong Tai', '08/10/2002');
console.log("First name:", student.getFirstName());
console.log("Age:", student.getAge());
