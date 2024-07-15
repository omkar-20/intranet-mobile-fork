export type ProfileDetailsDetail = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
  designation: string;
  reward_quota_balance: number;
  grade_id: number;
  employee_id: number;
  total_points: number;
  badge: string;
  badge_created_at: number;
};

export type GetProfileDetailsResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: ProfileDetailsDetail;
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

export type ActiveOrTopUsersDetails = {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  badge_name: string;
  appreciation_points: number;
};

export type GetActiveOrTopUsersListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: ActiveOrTopUsersDetails[];
};

export interface AppreciationDetails {
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
}

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
    page_count: number;
    total_count: number;
  };
};
