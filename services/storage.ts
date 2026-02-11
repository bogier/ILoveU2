
import { AppQuota, UserData, GeneratedContent } from '../types';
import { STORAGE_KEY_QUOTA, STORAGE_KEY_USER, STORAGE_KEY_DRAFT, MAX_MONTHLY_CALLS } from '../constants';

export const getQuota = (): AppQuota => {
  const now = new Date();
  const monthYear = `${now.getMonth()}-${now.getFullYear()}`;
  const stored = localStorage.getItem(STORAGE_KEY_QUOTA);
  
  if (stored) {
    const quota: AppQuota = JSON.parse(stored);
    if (quota.monthYear === monthYear) {
      return quota;
    }
  }
  
  return { count: 0, monthYear };
};

export const incrementQuota = () => {
  const quota = getQuota();
  quota.count += 1;
  localStorage.setItem(STORAGE_KEY_QUOTA, JSON.stringify(quota));
};

export const saveUser = (data: UserData) => {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data));
};

export const getUser = (): UserData | null => {
  const stored = localStorage.getItem(STORAGE_KEY_USER);
  return stored ? JSON.parse(stored) : null;
};

export const saveDraft = (content: GeneratedContent) => {
  localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(content));
};

export const getDraft = (): GeneratedContent | null => {
  const stored = localStorage.getItem(STORAGE_KEY_DRAFT);
  return stored ? JSON.parse(stored) : null;
};
