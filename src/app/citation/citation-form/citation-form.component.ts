import {Component, Output, EventEmitter} from '@angular/core';
import {Citation} from "../../models/citation";
import {NgForm, FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-citation-form',
  templateUrl: './citation-form.component.html',
  styleUrls: ['./citation-form.component.css']
})
export class CitationFormComponent {

  @Output() submit:EventEmitter<Citation> = new EventEmitter<Citation>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ["", Validators.required, Validators.minLength(10), Validators.maxLength(300)],
      authorGroup: this.fb.group({
        author: ["", Validators.maxLength(50)],
        iAmAuthor: true
      }),
      tags: []
    });

    this.form.get("author").disable(true);
  }

  onSubmit(form: NgForm) {
    if (this.form.valid) {
      this.submit.emit(this.form.value as Citation);
    }

    return false;
  }


}
