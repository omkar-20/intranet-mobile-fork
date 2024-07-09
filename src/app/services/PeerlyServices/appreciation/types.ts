export type PostAppreciationRequestBody = {
  receiver: string;
  core_value_id: string;
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
