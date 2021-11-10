export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  phone?: string;
  gender?: number;
  first_name?: string;
  last_name?: string;
  birth?: string;
};

export type ImageData = {
  imageable_id: number;
  imageable_type: number;
  url: string;
  type?: number;
};

export type TopicData = {
  title?: string;
  images?: ImageData[];
};

export type LoginFacebook = {
  id: string;
  token: string;
};

export type paramDevice = {
  user_id?: number;
  token?: string;
  platform?: string;
};

export declare type paramGroup = {
  user_id?: number;
  groupIds?: number[];
  page_index?: number;
  page_size?: number;
};

export declare type GroupData = {
  creator_id?: number;
  name?: string;
  avatar?: string;
};

export declare type messageGroup = {
  user_id?: number;
  group_id?: number;
  page_index?: number;
  page_size?: number;
};

export declare type MessageData = {
  sender_id?: number;
  group_id?: number;
  messgae?: string;
};
