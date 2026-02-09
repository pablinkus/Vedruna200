
export enum LetterMode {
  SCHOOL = 'school',
  INDIVIDUAL = 'individual',
  SISTER = 'sister'
}

export interface FormData {
  mode: LetterMode;
  centerName?: string;
  name?: string;
  community?: string;
  mission?: string;
  city: string;
  province: string;
  needValue: string;
  message?: string;
}

export interface LetterResult {
  content: string;
}

export type AppState = 'HOME' | 'FORM' | 'LOADING' | 'RESULT' | 'ERROR';
