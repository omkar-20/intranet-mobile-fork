export type ProfileIconDetail = {
  id: number;
  badge: string;
  total_rewards: number;
  image_url: string;
  created_at: number;
  updated_at: number;
};

export type GetProfileIconResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: ProfileIconDetail;
};

export type TopUsersDetails = {
  id: number;
  badge: string;
  total_rewards: number;
  first_name: string;
  last_name: string;
  image_url: string;
  created_at: number;
  updated_at: number;
};

export type GetTopUsersListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    top_users: TopUsersDetails[];
  };
};

export type ActiveUsersDetails = {
  id: number;
  badge: string;
  total_rewards: number;
  first_name: string;
  last_name: string;
  image_url: string;
  created_at: number;
  updated_at: number;
};

export type GetActiveUsersListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    active_users: ActiveUsersDetails[];
  };
};

export type AppreciationDetails = {
  id: number;
  core_value_name: string;
  description: string;
  total_rewards: number;
  quarter: string;
  sender_first_name: string;
  sender_last_name: string;
  sender_image_url: string;
  sender_designation: string;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_image_url: string;
  receiver_designation: string;
  created_at: number;
  updated_at: number;
};

export type GetAppreciationListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    appreciations: AppreciationDetails[];
    next: number;
    previous: number;
    record_per_page: number;
    current_page: number;
    total_page: number;
    total_records: number;
  };
};
