export interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  status: string;
  lastLogin?: string;
  driveUsage?: string;
  device?: string;
}

export interface Ticket {
  id: number;
  user: string;
  issue: string;
  description: string;
  status: string;
  created: string;
  fileName?: string;
  fileData?: string | ArrayBuffer | null;
}

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}