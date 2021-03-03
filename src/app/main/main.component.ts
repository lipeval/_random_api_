import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Persons {
  name: string,
  age: number,
  sexo: string,
  doc: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  persons: Persons[]
  contactForm: FormGroup;
  fileName: string = '';
  constructor(private data: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.data.getData().subscribe((data: Persons[]) => {
      this.persons = data;
  
      
      const newArr = JSON.parse(localStorage.getItem('session'));
      
      if(!newArr) {
        console.log('No new data')
      } else {
        this.persons.push(...newArr)
      }
      
    });

    this.contactForm = this.fb.group({
      name: this.fb.control(''),
      age: this.fb.control(''),
      sexo: this.fb.control(''),
      doc: this.fb.control('')
    });

  }

  onSubmit() {
    
      this.persons.push({
        name: this.contactForm.value.name,
        age: this.contactForm.value.age,
        sexo: this.contactForm.value.sexo,
        doc: this.fileName
      });
      this.saveLocal(this.contactForm.value);
    
    console.log(this.contactForm)
  }

  saveLocal(person) {
    let sessionArr = [];
    sessionArr = JSON.parse(localStorage.getItem('session')) || [];
    sessionArr.push(person);
    localStorage.setItem('session', JSON.stringify(sessionArr));
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();
        formData.append('file', this.fileName)

        console.log(formData)
    }
}

}
