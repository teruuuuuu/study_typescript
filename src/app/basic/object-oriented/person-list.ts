import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from "rxjs";

import { Person } from './person';

@Component({
  selector: 'hero-list',
  templateUrl: './person-list.html',
  styleUrls: ['./person-list.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];


  // サービスはconstructorに足しておく
  constructor(
    private router: Router,
    private route: ActivatedRoute) {
        const person = new Person(1, 'Super Cat');
        this.persons.push(person)
        console.info(this.persons)
    }

  ngOnInit(): void {
    // 再描画のたびに呼ばれるので、ここでメンバ変数を初期化
    console.log("PersonListComponent ngOnInit")
  }

}
