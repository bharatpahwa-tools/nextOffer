export interface Jobs {
  id?: string;
  companyName: string;
  jobLink: string;
  notes?: string;
  email?: string;
  position: string;
  deadline?: string;
  status: Status;
}

export interface Status {
  status:
    | 'new'
    | 'applied'
    | 'accepted'
    | 'rejected'
    | 'interviewing'
    | 'closed'
    | 'referred';
}
