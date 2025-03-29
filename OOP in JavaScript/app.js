// Factory Function
// function Person(name , age) {
//     this.name = name
//     this.age  = age
//     console.log(this);
    
// }

// Person.prototype.talk= function () {
//     console.log(`Hi , I am ${this.name}`);
// }

// let p1 = new Person("lucky" , 20)
// let p2  = new Person("darshan" , 19)

// let c = p1.talk === p2.talk

// console.log(c);

// classes 

class Person {
    constructor(name , age) {
        this.name = name
        this.age = age
    }
    talk() {
        console.log(`Hi I am ${name}`);
        
    }
}

class student extends Person {
    constructor(name , age , marks) {
        super(name, age)
        this.marks = marks
    }
}

class Teacher extends Person {
    constructor(name , age , subject) {
        super(name, age)
        this.subject = subject
    }
}
let p1 = new student("lucky" , 20, 95)
let p2  = new Teacher("darshan" , 19, "Math")



console.log(p1);
console.log(p2);
console.log(p1.talk ===p2.talk);
