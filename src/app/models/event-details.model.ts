import { Time } from '@angular/common';

export class EventDetails {
  id: string;
  title: string;
  club: string;
  des: string;
  img: string;
  date: string;
  status: number;
}

export class eventData {
  id: string;
  eventName: string;
  startDate: Date;
  endDate: string;
  startTime: any;
  endTime: string;
  venue: string;
  description: string;
  clubID: string;
  startTimeStamp: number;
  endTimeStamp: number;
  image: string;
  status: number;
  registeredStudents: Array<string>;
  participatedStudent: Array<string>;
}

export class sponsorData {
  id:string;
  sponsorName: string;
}
