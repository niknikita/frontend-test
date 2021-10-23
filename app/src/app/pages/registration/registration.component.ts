import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from 'src/app/api/Brand/brand';
import { BrandService } from 'src/app/api/Brand/brand.service';
import { Model } from 'src/app/api/Model/model';
import { ModelService } from 'src/app/api/Model/model.service';
import { Order } from 'src/app/api/Order/order';
import { OrderService } from 'src/app/api/Order/order.service';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  selectedDate: Date;
  registrationForm: FormGroup;
  brands$ = new BehaviorSubject<Brand[]>([]);
  models$ = new BehaviorSubject<Model[]>([]);
  orders$: Order[];
  isSaved: boolean = false;
  isShowModal: boolean = false;
  Name = new FormControl();
  Phone = new FormControl();
  BrandCar = new FormControl();
  ModelCar = new FormControl();
  GovernmentNumbers = new FormControl();
  TimeOrder = new FormControl();
  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private orderService: OrderService,
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef
  ) {
    this.brandService.getAll().subscribe((data) => {
      this.brands$.next(data);
    });
    this.orderService.getAll().subscribe((data) => {
      this.orders$ = data.filter(
        (f) =>
          f.timeOrder.getDate() === new Date().getDate() &&
          f.timeOrder.getMonth() === new Date().getMonth() &&
          f.timeOrder.getFullYear() === new Date().getFullYear()
      );
    });
    this._createForm();
  }
  private _createForm() {
    this.registrationForm = new FormGroup({
      Name: new FormControl('Name', Validators.required),
      Phone: new FormControl('Phone', Validators.required),
      BrandCar: new FormControl('BrandCar', [
        Validators.required,
        this.ValidateUrl,
      ]),
      ModelCar: new FormControl('ModelCar', [
        Validators.required,
        this.ValidateUrl,
      ]),
      GovernmentNumbers: new FormControl(
        'GovernmentNumbers',
        Validators.required
      ),
      TimeOrder: new FormControl('TimeOrder', Validators.required),
    });
    this.registrationForm.setValue({
      Name: '',
      Phone: '',
      GovernmentNumbers: '',
      BrandCar: 0,
      ModelCar: 0,
      TimeOrder: null,
    });
    console.log('this.registrationForm', this.registrationForm);
  }
  selectBrandCar(brand: Event) {
    this.modelService.getAll().subscribe((data) => {
      this.models$.next(data.filter((f) => f.brandId === +brand));
    });
  }
  selectDate(date: Date) {
    this.selectedDate = date;
    this.registrationService.setSelectedDate(date);
    this.orderService.getAll().subscribe((data) => {
      this.orders$ = data.filter(
        (f) =>
          f.timeOrder.getDate() ===
            this.registrationService.getSelectedDate().getDate() &&
          f.timeOrder.getMonth() ===
            this.registrationService.getSelectedDate().getMonth() &&
          f.timeOrder.getFullYear() ===
            this.registrationService.getSelectedDate().getFullYear()
      );
    });
    console.log(this.selectedDate);
  }
  selectHour(hour: number) {
    let _date = new Date(this.registrationService.getSelectedDate());
    _date.setHours(hour);
    this.registrationForm.patchValue({
      TimeOrder: _date,
    });
  }
  save() {
    console.log("this.registrationForm", this.registrationForm)
    if (this.registrationForm.status==="VALID") {
      this.orders$ = this.orders$.concat(this.registrationForm.value);
    }
    this.isSaved = true;
    this.isShowModal = true;
    this.cdr.detectChanges();
  }
  isValid(control: string): boolean {
    return this.registrationForm.controls[control].valid;
  }
  ValidateUrl(control: AbstractControl) {
    if (control.value === 0) {
      return { invalidSelector: 'no list item is selected' };
    }
    return null;
  }
  ngOnInit() {}
}
