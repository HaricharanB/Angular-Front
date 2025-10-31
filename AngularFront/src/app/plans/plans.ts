import { Component, OnInit } from '@angular/core';
import { Plan } from '../shared/plan';
import { PlanRestApiService } from '../shared/plan-rest-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../shared/bookings';
import { BookingsRestApiService } from '../shared/bookings-rest-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plans',
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit {
bookings : Booking[] = [];
redirectToConfirmation() {
  this.saveBooking();
  
}
  
  plans: Plan[] = [];
  isOpen: boolean = false;
  booking: Booking = {
    id: '',
    name: '',
    city: '',
    phone: '',
    email: '',
    age: '',
    planId: '',
    planName: '',
    validity: '',
    paymentMode: '',
    cardNumber: '',
    premiumAmt: 0,
    paymentFreq: ''
  };

  ngOnInit(): void {
      this.loadPlans();
      this.loadBookings();
  }
  constructor(
    private planService: PlanRestApiService,
    private bookingService: BookingsRestApiService,
    private router: Router
  ){}
  loadPlans(): void {
      this.planService.getAllPlans().subscribe(plans => {
          this.plans = plans;
          console.log('Plans loaded:', this.plans);
      });
  }
  openForm(planId: string): void {
    console.log('Selected planId:', planId);
      const plan = this.plans.find(p => p.id === planId);
      if (!plan) return;
      this.booking = {
        id: String(this.bookings.length + 1),
        name: '',
        city: '',
        phone: '',
        email: '',
        age: '',
        planId: plan.id,
        planName: plan.planName,
        validity: plan.validity,
        paymentMode: '',
        cardNumber: '',
        premiumAmt: plan.baseAmt ?? 0,
        paymentFreq: ''
      };
      this.isOpen = true;
  }

  closeForm(): void {
    this.isOpen = false;
  }

  saveBooking(): void {
    // replace with real save logic (call booking API)
    console.log('Saving booking:', this.booking);
    this.bookingService.createBooking(this.booking).subscribe(response => {
      console.log('Booking saved successfully:', response);
    } );
    this.isOpen = false;

    this.router.navigate(['/confirmation/', this.booking.id]);
  }
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(bookings => {
      console.log('Bookings loaded:', bookings);
      this.bookings = bookings;


    }); 
  }
}
