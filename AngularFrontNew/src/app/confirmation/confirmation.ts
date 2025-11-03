import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingsRestApiService } from '../shared/bookings-rest-api.service';
import { Booking } from '../shared/bookings';
import { CommonModule } from '@angular/common';
import { PlanRestApiService } from '../shared/plan-rest-api.service';
import { Plan } from '../shared/plan';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-confirmation',
  imports: [CommonModule,RouterModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation implements OnInit {
  booking: Booking | null = null;
  plan: Plan | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingsRestApiService,
    private planService: PlanRestApiService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.getBookingDetails(id);
    }
  }

  getBookingDetails(id: number): void {
    this.bookingService.getBookingById(id).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.loading = false;
        console.log('Booking details:', booking);

        // Optionally fetch plan details if needed
        if (booking.planId) {
          this.getPlanDetails(booking.planId);
        }
      },
      error: (err) => {
        console.error('Error loading booking:', err);
        this.loading = false;
      },
    });
  }

  getPlanDetails(planId: string | number): void {
    this.planService.getPlanById(Number(planId)).subscribe({
      next: (plan) => {
        console.log('Plan details:', plan);
        this.plan = plan;
      },
      error: (err) => console.error('Error loading plan:', err),
    });
  }
}