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
  bookings: Booking[] = [];
  plans: Plan[] = [];
  isOpen: boolean = false;
  baseAmt: number = 0; // store base amount of selected plan

  booking: Booking = {
    id: '',
    name: '',
    city: '',
    phone: '',
    email: '',
    age: '',
    earnings: 0,
    healthCondition: '',
    planId: '',
    planName: '',
    validity: '',
    paymentMode: '',
    cardNumber: '',
    premiumAmt: 0,
    paymentFreq: ''
  };

  constructor(
    private planService: PlanRestApiService,
    private bookingService: BookingsRestApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlans();
    this.loadBookings();
  }

  loadPlans(): void {
    this.planService.getAllPlans().subscribe(plans => {
      this.plans = plans;
      console.log('Plans loaded:', this.plans);
    });
  }

  openForm(planId: string): void {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) return;

    this.baseAmt = plan.baseAmt ?? 0; // store base amount

    this.booking = {
      id: String(this.bookings.length + 1),
      name: '',
      city: '',
      phone: '',
      email: '',
      age: '',
      earnings: 0,
      healthCondition: '',
      planId: plan.id,
      planName: plan.planName,
      validity: plan.validity,
      paymentMode: '',
      cardNumber: '',
      premiumAmt: 0, // start empty, will be calculated
      paymentFreq: ''
    };
    this.isOpen = true;
  }

  closeForm(): void {
    this.isOpen = false;
  }

  calculatePremium(): void {
    let premium = this.baseAmt; // always start fresh from baseAmt

    const age = Number(this.booking.age);
    const earnings = Number(this.booking.earnings);

    // Age factor
    if (age > 50) {
      premium += 500;
    } else if (age < 30) {
      premium -= 200;
    }

    // Earnings factor
    if (earnings && earnings > 50000) {
      premium += 300;
    }

    // Health condition factor
    if (this.booking.healthCondition === 'Yes') {
      premium += 700;
    }

    this.booking.premiumAmt = premium;
  }

  saveBooking(): void {
    this.calculatePremium(); // ensure premium is updated
    console.log('Saving booking:', this.booking);

    this.bookingService.createBooking(this.booking).subscribe(response => {
      console.log('Booking saved successfully:', response);
    });

    this.isOpen = false;
    this.router.navigate(['/confirmation/', this.booking.id]);
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings;
      console.log('Bookings loaded:', bookings);
    });
  }
}
