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
        this.name
        this.age
    }
    talk() {
        console.log(`Hi I am ${name}`);
        
    }
}
let p1 = new Person("lucky" , 20)
let p2  = new Person("darshan" , 19)

console.log(p1.talk ===p2.talk);
