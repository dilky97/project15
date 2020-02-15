export class AdvisorDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  advisorIn: Array<{id: string, name: string}>;
  newClubRequests: Array<string>;
}
