import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './bookings';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class BookingsRestApiService {
    private apiUrl = 'http://localhost:3000/bookings'; // Replace with your actual API endpoint
      httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    constructor(private http: HttpClient) { }

    getAllBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiUrl, this.httpOptions);
    }

    getBookingById(id: number): Observable<Booking> {
        return this.http.get<Booking>(`${this.apiUrl}/${id}`, this.httpOptions);
    }

    createBooking(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(this.apiUrl, booking, this.httpOptions);
    }

    // updateBooking(id: number, booking: any): Observable<any> {
    //     return this.http.put<any>(`${this.apiUrl}/${id}`, booking);
    // }

    // deleteBooking(id: number): Observable<any> {
    //     return this.http.delete<any>(`${this.apiUrl}/${id}`);
    // }
}