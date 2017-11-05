import { Component, OnInit } from '@angular/core';

import { TwainService } from './twain.service';

@Component({
  selector: 'twain-quote',
  template: '<p class="twain"><i>{{quote}}</i></p>',
  styleUrls: [ './twain.component.css' ]
})
export class TwainComponent  implements OnInit {
  intervalId: number;
  quote = '...';
  constructor(private twainService: TwainService) { }

  ngOnInit(): void {
    this.changeQuote();
  }

  next(): void {
    this.changeQuote();
  }

  changeQuote(): void {
    this.twainService.getQuote().then(quote => this.quote = quote);
  }
}
