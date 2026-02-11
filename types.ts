
export interface UserData {
  name: string;
  maleSkinTone: string;
  femaleSkinTone: string;
  phone: string;
  likes: string;
  poemStyle: string;
}

export interface GeneratedContent {
  poem: string;
  imageUrl: string;
}

export interface AppQuota {
  count: number;
  monthYear: string;
}

export enum AppStep {
  FORM = 'FORM',
  GENERATING = 'GENERATING',
  PREVIEW = 'PREVIEW',
  LIMIT_REACHED = 'LIMIT_REACHED'
}

export type ThemeType = 'serenity' | 'nocturne' | 'twilight';
