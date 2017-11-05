import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';


@Component({
  selector: 'my-text',
  templateUrl: './myText.html',
  styleUrls: [ './myText.css' ]
})
export class MyTextComponent {
  @Input() textInput: String = "";
  @Input() placeHolder: String = "";

  textLength: Number = 0;

  @Output() textInputChange = new EventEmitter<String>();

  // 親コンポーネントからの値の変更時に実行
  @Input('textInput')
  set updateInternalVal(externalVal) {
    this.textInput = externalVal;
    this.onEditChange();
  }

  onEditChange(): void {
    if(this.textInput !== void 0 && this.textInput.length !== void 0){
      this.textLength = this.textInput.length;
    }
    this.textInputChange.emit(this.textInput);
  }
}
