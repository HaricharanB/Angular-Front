import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from './plan';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class PlanRestApiService {
    private baseUrl = 'http://localhost:3000'; // adjust this to your API endpoint
          httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    constructor(private http: HttpClient) { }

    // Get all plans
    getAllPlans(): Observable<Plan[]> {
        return this.http.get<Plan[]>(`${this.baseUrl}/plans`, this.httpOptions);
    }

    // Get plan by ID
    getPlanById(id: number): Observable<Plan> {
        return this.http.get<Plan>(`${this.baseUrl}/plans/${id}`, this.httpOptions);
    }

    // // Create new plan
    // createPlan(plan: any): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/plans`, plan);
    // }

    // // Update plan
    // updatePlan(id: number, plan: any): Observable<any> {
    //     return this.http.put(`${this.baseUrl}/plans/${id}`, plan);
    // }

    // // Delete plan
    // deletePlan(id: number): Observable<any> {
    //     return this.http.delete(`${this.baseUrl}/plans/${id}`);
    // }
}