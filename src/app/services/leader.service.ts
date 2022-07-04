import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor() {}

  // getLeaders(): Leader[] {
  //   return LEADERS;
  // }

  // getLeaders(): Promise<Leader[]> {
  //   return Promise.resolve(LEADERS);
  // }

  // getLeaders(): Promise<Leader[]> {
  //   return new Promise(resolve => {
  //     setTimeout(()=>resolve(LEADERS), 2000)});
  // }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(400));
  }

  // getLeader(id: string): Leader {
  //   return LEADERS.filter((leader) => (leader.id === id))[0];
  // }

  // getLeader(id: string):Promise< Leader> {
  //   return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  // }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));
  }



  // getFeaturedLeader(): Leader {
  //   return LEADERS.filter((leader) => leader.featured)[0];
  // }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
