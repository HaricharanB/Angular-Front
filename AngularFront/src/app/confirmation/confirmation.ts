import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingsRestApiService } from '../shared/bookings-rest-api.service';
import { Booking } from '../shared/bookings';
import { CommonModule } from '@angular/common';
import { PlanRestApiService } from '../shared/plan-rest-api.service';
import { Plan } from '../shared/plan';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-confirmation',
  imports: [CommonModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation implements OnInit {
  booking: Booking = {} as Booking;
  plan: Plan | null = null;
  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.getBookingDetails(id);

    // this.getPlanDetails(this.booking?.planId);
  }
  constructor(private route: ActivatedRoute, private bookingService: BookingsRestApiService , private planService: PlanRestApiService)  { }

  getBookingDetails(id: number): void { 
    this.bookingService.getBookingById(id).subscribe(booking => {
   
      this.booking = booking;
         console.log('Booking details:', booking);
    });
  }
  getPlanDetails(planId: string | undefined): void {
    if (planId === undefined) return;
    this.planService.getPlanById(Number(planId)).subscribe(plan => {
      console.log('Plan details:', plan);
      this.plan = plan;
    });
  }
}
