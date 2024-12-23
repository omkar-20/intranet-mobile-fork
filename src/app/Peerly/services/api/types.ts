interface UserDetails {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
  role_id: number;
  reward_quota_balance: number;
  designation: string;
  grade_id: number;
  grade: string;
  created_at: number;
}

export interface PeerlyLoginResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    User: UserDetails;
    NewUserCreated: false;
    AuthToken: string;
  };
}
