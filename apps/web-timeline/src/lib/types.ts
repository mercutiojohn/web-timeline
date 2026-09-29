export type Region = "overseas" | "china" | "policy";

export interface Milestone {
  /** "YYYY-MM" */
  date: string;
  label: string;
  desc: string;
}

export interface Vendor {
  id: string;
  name: string;
  region: Region;
  color: string;
  milestones: Milestone[];
}

export interface TimelineData {
  title: string;
  subtitle: string;
  range: { start: string; end: string };
  vendors: Vendor[];
}
