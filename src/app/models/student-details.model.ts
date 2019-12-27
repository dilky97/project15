export class StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  faculty: string;
  academicYear: number;
  participatingEvents: Array<string>;
  myClubs: Array<{id: string, isPresident: boolean, isEventPlanner: boolean}>;
}
