import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  formDetail: any;
  isAdmin: string = ''
  existPersonList: any = []
  columnField: any = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "mobileNumber" },
    { label: "Company", field: "company" },
    { label: "DOB", field: "dob" },
    {label:"Action",field:"action"}
  ]

  constructor(private router: Router, private fb: FormBuilder) {
    this.formDetail = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[a-zA-Z]*')]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conpassword: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.user = this.getData('userData') || {}
    this.existPersonList = this.getData('person') || []
  }
  getData(key:string){
    let value:any=localStorage.getItem(key)
    try{
        return JSON.parse(value)
    }catch(err){
        return value
    }
}
  handleSave(id: any) {
    let handleExistPerson: any = this.getData('person') || []
    let payload: any = []
    if (id) {
      handleExistPerson = handleExistPerson.map((person: any) => {
        if (person.id === id) {
          person = this.formDetail.value
        }
        return person
      })
      payload = handleExistPerson
    } else {
      payload = [{
        ...this.formDetail.value,
        id: Date.now()
      },
      ...handleExistPerson]
    }
    this.saveData('person', payload)
    this.existPersonList = payload;
    this.clearData();
  }
  clearData() {
    this.formDetail.reset()
  }
  editData(person: any) {
    this.formDetail.patchValue(person)
  }

  handleDelete(id: any) {
    this.existPersonList = this.existPersonList.filter((person: any) => {
      return person.id !== id
    })
    this.saveData('person', this.existPersonList)
  }
  Reset() {
    this.removeData('userData')

  }
  removeData(key:string) {
    localStorage.removeItem(key)
    
}
isAlpha(event:any){
  let keycode=event.which
  if(!(keycode >=65 && keycode <=90 || keycode>=97 && keycode<=122)){
      event.preventDefault()
  }
  

}
isNum(event:any){
  let keycode=event.which
  if(!(keycode>=48 && keycode <= 57)){
      event.preventDefault()
  }

}
saveData(key:string,data:any){
  let value:any=data
  if(value){
      value=JSON.stringify(value)
  }
  localStorage.setItem(key,value)
}

}
