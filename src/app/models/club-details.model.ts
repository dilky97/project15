export class ClubDetails {
  id: string;
  name: string;
  logo: string;
  advisor: string;
  president: string;
  eventPlanner: string;
  des: string;
  events: Array<string> = [];
  isActivated: boolean;
}
