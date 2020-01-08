export interface Server {
  uid: string;
  displayName?: string;
  address: string;
  userUid: string;
}

export interface ServerUsage {
  CPU: number;
  GPU: number;
  Disk: number;
  Running: boolean;
}