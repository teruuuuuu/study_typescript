export class Person {
    constructor(public id:number = 0, public name:string = '') { }
    clone() { return new Person(this.id, this.name); }
}
  