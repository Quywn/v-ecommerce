// Validator not blank
export const required = (fieldName: string) => {
  return (value: string): boolean | string =>
    !!value || `${fieldName} không được để trống`;
};

// Validator limit length
export const maxLength = (max: number) => {
  return (value: string): boolean | string =>
    value.length <= max || `Không được vượt quá ${max} ký tự`;
};

// Validator number > 0
export const positiveNumber = (fieldName: string) => {
  return (value: number): boolean | string =>
    value > 0 || `${fieldName} phải lớn hơn 0`;
};
