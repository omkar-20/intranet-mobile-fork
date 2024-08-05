export type APIError = {
  message: string;
  status: number;
};

export type FormInput = {
  receiver: number;
  core_value_id: number;
  description: string;
};

export type KeyValueType = string | number;

export type DropDownKeyValue = {
  label: KeyValueType;
  value: KeyValueType;
};
