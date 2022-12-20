export type TProfile = {
  id: number;
  about?: string;
  avatar?: string;
  banner?: string;
};

export type TUserPresence = {
  id: number;
  statusMessage?: string;
  showOffline: boolean;
};

export type TUserPeer = {
  id: string;
};

export type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profile?: TProfile;
  presence?: TUserPresence;
  peer: TUserPeer;
};

export type TStatusMessage = {
  statusMessage: string;
};

export type TSearchUserRequest = {
  query: string;
};

export type TUpdateUserProfile = {
  banner?: File;
  avatar?: File;
  about?: string;
};
