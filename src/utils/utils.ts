import { Priority } from '../models/common';

export const getLocalStorageValue = <T>(key: string, initialValue: T) => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : initialValue;
};

export const getBadgeColor = (label: string) => {
  return label === Priority.Low
    ? 'success'
    : label === Priority.Middle
    ? 'warning'
    : 'danger';
};
