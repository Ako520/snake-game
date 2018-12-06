interface Person {
  firstName: string;
  lastName: string;
  middleInitial: string;
}

class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName ) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`
  }
}



function greeter(person: Person) {
  return 'Hello,' + person.firstName + person.middleInitial + person.lastName
}

let user = new Student('Guo', 'gouzi', 'dawang')
document.body.innerHTML = greeter(user)
