import { ValidationErrors } from 'validatorjs';
export type DateValuePair = [string, number];

export interface Tracking {
  trackingType: string;
  local: boolean;
  keyword: string;
  rankings: DateValuePair[];
}
export interface InputData {
  domain: string;
  tracking: Tracking[];
}
export interface Keyword {
  keyword: string;
  currentRanking: number | string;
  previousRanking: ImprovedRanking;
  initialRanking: ImprovedRanking;
  rankings: number[];
}

export interface Data {
  domain?: string;
  totalKeywords: string | number;
  improvedRanking: string | number;
  currentDate: string | Date;
  previousDate: string | Date;
  xAxis: string[];
  keywords: Keyword[];
}

export interface ValidationResult {
  valid: boolean;
  message?: ValidationErrors;
}

export interface ImprovedRanking {
  flag: "Same" | "Improved" | "Decreased";
  value: string | number;
  change: number;
}