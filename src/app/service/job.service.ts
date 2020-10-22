import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getJobs(): Observable<Job[] | HttpErrorResponse> {
    return this.http.get<Job[]>(`${this.host}/api/list`);
  }

  public addJob(description: string): Observable<any> {
    const job = new Job();
    job.description = description;
    return this.http.post(`${this.host}/api/add`, job);
  }

  public searchJob(jobId: number): Observable<Job | HttpErrorResponse> {
    return this.http.get<Job>(`${this.host}/api/find/job/${jobId}`);
  }
}
