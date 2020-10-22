import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from '../model/job';
import {JobService} from '../service/job.service';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-job-main',
  templateUrl: './job-main.component.html',
  styleUrls: ['./job-main.component.css']
})
export class JobMainComponent implements OnInit, OnDestroy {
  public show = false;
  public searchedJob: Job[];
  public jobs: Job[];
  private subscriptions: Subscription[] = [];
  private updateSubscription: Subscription;
  displayedColumns: string[] = ['id', 'description', 'status'];
  public searchMessage = 'Job description';
  public submitMessage = 'New Job Description';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.updateSubscription = interval(5000).subscribe(
      () => { this.getJobs(); }
    );
    this.getJobs();
    this.searchedJob = [];
  }

  public getJobs(): void {
    this.subscriptions.push(
      this.jobService.getJobs().subscribe(
        (response: Job[]) => {
          this.jobs = response;
        },
        () => {
          console.log('No users loaded!!!');
        }
      )
    );
  }

  public addJob(data): void {
    this.subscriptions.push(
      this.jobService.addJob(data.jobId).subscribe(
        () => {
          alert('Submitted ' + data.jobId + ' successful.');
          this.getJobs();
          this.submitMessage = '';
        },
        () => {
          alert('Failed to submit ' + data.jobId);
        }
      )
    );
  }

  public searchJob(data): void {
    this.searchedJob = [];
    this.subscriptions.push(
      this.jobService.searchJob(data.jobId).subscribe(
        (response: Job) => {
          this.searchedJob.push(
            {
              id: response.id,
              description: response.description,
              status: response.status
            }
          );
          this.show = true;
          this.searchMessage = '';
        },
        () => {
          this.show = false;
          console.log('Something wrong...');
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
