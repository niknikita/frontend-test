import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private _selectedDate: Date;

  constructor() {
    this._selectedDate = new Date();
  }

  getSelectedDate(): Date {
    return this._selectedDate;
  }
  setSelectedDate(date: Date) {
    this._selectedDate = date;
  }
}
