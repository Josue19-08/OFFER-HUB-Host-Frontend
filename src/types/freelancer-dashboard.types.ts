export interface FreelancerStatCard {
  label: string;
  value: string | number;
  iconPath: string;
  color: string;
}

export type FreelancerActivityType =
  | "service_created"
  | "proposal_accepted"
  | "message"
  | "payment_received"
  | "review_received";

export interface FreelancerActivity {
  id: string;
  type: FreelancerActivityType;
  title: string;
  description: string;
  time: string;
}
