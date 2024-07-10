export type GetCoworkersListRequest = {
  page: number;
  per_page: number;
  name: string;
};

export type UserDetails = {
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  grade: string;
  designation: string;
  profile_image_url: string;
};

export type GetCoworkersListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    user_list: UserDetails[];
    metadata: {
      total_count: number;
      current_page: number;
      page_count: number;
    };
  };
};

export type CoreValue = {
  id: number;
  name: string;
  description: string;
  parent_core_value_id: number;
};

export type GetCoreValuesResponse = {
  data: CoreValue[];
};

export type PostAppreciationRequestBody = {
  receiver: number;
  core_value_id: number;
  description: string;
};

export type PostAppreciationResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    id: number;
    core_value_id: number;
    description: string;
    quarter: number;
    sender: number;
    receiver: number;
    created_at: number;
    updated_at: number;
  };
};
