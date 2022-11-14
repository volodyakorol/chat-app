export type Profile = {
  id: number;
  about?: string;
  avatar?: string;
  banner?: string;
};

export type UserPresence = {
  id: number;
  statusMessage?: string;
  showOffline: boolean;
};

export type UserPeer = {
  id: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: Profile;
  presence?: UserPresence;
  peer: UserPeer;
};

export type StatusMessage = {
  statusMessage: string;
};
