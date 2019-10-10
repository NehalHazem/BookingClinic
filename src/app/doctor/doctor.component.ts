import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  public clinics = [
    'أمـراض القلب', 'الباطنية والجهاز الهضـمي', 'الأمـراض الصــدريـة', 'الـجراحـة الـعـامـة',
    'جـراحـة الــصــدر', 'جــراحة المخ والأعصــاب', 'جراحة الأوعية الـدموية', 'جـراحـة الـتـجـمـيـل', 'أنـف وأذن وحـنـجــرة ',
    'الـتخـاطــب', 'الـســمـعـيـات', 'السـكر والغدد الـصماء', 'الأمراض النفسية والعصبية', 'أمـراض الكـلـى', 'أمـراض الـدم '
  ];
  public doctors = ['طبيب 1', 'طبيب 2', 'طبيب 3', 'طبيب 4', 'طبيب 5', 'طبيب 6', 'طبيب 7', 'طبيب 8', 'طبيب 9', 'طبيب 10'];
  public formGroup: FormGroup;
  public scheduleForm: FormGroup;
  public doctorName = '';
  public clinicName = '';
  public scheduleArr = [];
  public scheduleStatusArr = ['متاح', 'محجوز', 'تم الكشف', 'متاح', 'محجوز', 'تم الكشف', 'متاح'];
  public servicesArr = [];
  public today;
  public day2;
  public day3;
  public day4;
  public day5;
  public day6;
  public day7;
  public displayDoctorField = false;
  public docterSelect;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      clinic: ['', Validators.required],
      doctor: ['', Validators.required]
    });

    this.scheduleForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      mobile: ['', Validators.required],
      services: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.getServicesArr();
  }

  onChoosingClinic() {
    this.clinicName = this.formGroup.get('clinic').value;
    this.displayDoctorField = true;
    if (this.doctorName === '') {
      return;
    } else {
      this.docterSelect = document.getElementById('doctorSelect') as HTMLSelectElement;
      this.docterSelect.selectedIndex = '';
      this.doctorName = '';

    }
  }

  onChoosingDoctor() {
    this.doctorName = this.formGroup.get('doctor').value;
    this.scheduleStatusArr.sort(() => Math.random() - 0.5);
    this.getDate();
    this.getClinicsTime();
  }

  getDate() {
    const today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    this.today = dd + '/' + mm + '/' + yyyy;
    this.day2 = parseInt(dd, 10) + 1 + '/' + mm + '/' + yyyy;
    this.day3 = parseInt(dd, 10) + 2 + '/' + mm + '/' + yyyy;
    this.day4 = parseInt(dd, 10) + 3 + '/' + mm + '/' + yyyy;
    this.day5 = parseInt(dd, 10) + 4 + '/' + mm + '/' + yyyy;
    this.day6 = parseInt(dd, 10) + 5 + '/' + mm + '/' + yyyy;
    this.day7 = parseInt(dd, 10) + 6 + '/' + mm + '/' + yyyy;

  }

  getClinicsTime() {
    let hours;
    let minutes;
    let ampm;

    for (let i = 540; i <= 900; i += 15) {

      hours = Math.floor(i / 60);
      minutes = i % 60;

      if (minutes < 10) {
        minutes = '0' + minutes; // adding leading zero
      }

      ampm = hours % 24 < 12 ? 'AM' : 'PM';
      hours = hours % 12;

      if (hours === 0) {
        hours = 12;
      }

      this.scheduleArr.push(hours + ':' + minutes + ' ' + ampm);
    }

  }

  getServicesArr() {
    for (let i = 1; i < 51; i++) {
      this.servicesArr.push(`الخدمة ${i}`);
    }
  }

  onSubmitScheduleForm() {
    console.log(this.scheduleForm.value);
    this.scheduleForm.reset();
    // Show Alert
    const myAlert = document.querySelector('.myAlert');
    myAlert.classList.add('alert', 'alert-info');
    myAlert.innerHTML = 'تم تسجيل الحجز بنجاح';
    // Hide Alert
    setTimeout(() => {
      myAlert.classList.remove('alert', 'alert-info');
      myAlert.innerHTML = '';
    }, 3000);
  }

  onMeetingSchedule() {
    // Show Alert
    const myAlert = document.querySelector('.myAlert');
    myAlert.classList.add('alert', 'alert-info');
    myAlert.innerHTML = 'تم تنفيذ الكشف بنجاح';
    // Hide Alert
    setTimeout(() => {
      myAlert.classList.remove('alert', 'alert-info');
      myAlert.innerHTML = '';
    }, 3000);
  }

  onCancellingSchedule() {
    // Show Alert
    const myAlert = document.querySelector('.myAlert');
    myAlert.classList.add('alert', 'alert-info');
    myAlert.innerHTML = 'تم الغاء الكشف بنجاح';
    // Hide Alert
    setTimeout(() => {
      myAlert.classList.remove('alert', 'alert-info');
      myAlert.innerHTML = '';
    }, 3000);
  }

}
