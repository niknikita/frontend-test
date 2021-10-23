import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/api/Order/order';
import { OrderService } from 'src/app/api/Order/order.service';
import { RegistrationService } from '../../registration.service';

interface slotTime {
  id?: number;
  hour: number;
  isFree: boolean;
}

@Component({
  selector: 'app-selectorTime',
  templateUrl: './selectorTime.component.html',
  styleUrls: ['./selectorTime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorTimeComponent implements OnInit, OnChanges {
  @Input() orders: Order[];
  @Output() select = new EventEmitter<number>();
  ordersDay: Order[];
  slotsTime: slotTime[] = [];
  selectedSlot: slotTime;

  constructor(
    private orderService: OrderService,
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef) {
    this.updateViewSlots();
  }
  ngOnChanges(): void {
    this.updateViewSlots();
  }
  updateViewSlots() {
    this.slotsTime = [];
    this.orderService.getAll().subscribe((data) => {
      for (let i = 0; i < 12; i++) {
        this.slotsTime.push({
          id: i,
          hour: i + 9,
          isFree: true,
        });
      }
      this.ordersDay = data;
      this.ordersDay.forEach((d) => {
        let hh = new Date(d.timeOrder).getHours();
        let _idSlot = this.slotsTime.findIndex((f) => f.hour === hh);
        if (
          this.getDate().getFullYear() === d.timeOrder.getFullYear() &&
          this.getDate().getDate() === d.timeOrder.getDate() &&
          this.getDate().getMonth() === d.timeOrder.getMonth()
        ) {
          this.slotsTime[_idSlot].isFree = false;
        }
      });
    });
  }
  selectTime(slot: slotTime) {
    if (slot.isFree) {
      this.selectedSlot = slot;
      this.select.emit(this.selectedSlot.hour)
    }
  }
  getDate(): Date {
    return this.registrationService.getSelectedDate();
  }
  ngOnInit() {}
}
