export class StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  faculty: string;
  academicYear: number;
  participatingEvents: Array<string>;
  presidentIn: Array<{id: string, name: string}>;
  eventPlannerIn: Array<{id: string, name: string}>;
}
