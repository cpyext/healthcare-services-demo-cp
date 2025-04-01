export interface Ratings {
  filter: Filter;
  client: string;
  entities: Entity[];
}

export interface Filter {
  minWordCount: number;
  period: Period;
  minSurveyCount: number;
  perPage: number;
  configVersion: string;
  minRatingCount: number;
  days: number;
  minThreshold: number;
  showRatings: boolean;
  page: number;
  showComments: boolean;
}

export interface Period {
  from: string;
  to: string;
}

export interface Entity {
  totalSurveyCount: number;
  overallRating: OverallRating;
  comments: Comment[];
  totalRatingCount: number;
  ratings: any[];
  name: string;
  totalPages: number;
  totalCommentCount: number;
  id: string;
  PGSealOfIntegrity: PgsealOfIntegrity;
}

export interface OverallRating {
  name: string;
  categoryResponseCount: number;
  questionRatings: QuestionRating[];
  value: number;
}

export interface QuestionRating {
  name: string;
  value: number;
  responseCount: number;
}

export interface Comment {
  mentionTime: string;
  overallRating: OverallRating2;
  surveyKey: string;
  wordCount: number;
  ratings: any[];
  comment: string;
  id: number;
  source: string;
}

export interface OverallRating2 {
  name: string;
  value: number;
}

export interface PgsealOfIntegrity {
  sealOfIntegrity: SealOfIntegrity;
  dataIntegrity: DataIntegrity;
}

export interface SealOfIntegrity {
  darkBackground: DarkBackground;
  lightBackground: LightBackground;
}

export interface DarkBackground {
  jpg: string;
  png: string;
}

export interface LightBackground {
  jpg: string;
  png: string;
}

export interface DataIntegrity {
  horizontal: Horizontal;
  stacked: Stacked;
}

export interface Horizontal {
  darkBackground: DarkBackground2;
  lightBackground: LightBackground2;
  darkBackgroundHighResolution: DarkBackgroundHighResolution;
}

export interface DarkBackground2 {
  png: string;
}

export interface LightBackground2 {
  jpg: string;
  png: string;
}

export interface DarkBackgroundHighResolution {
  png: string;
}

export interface Stacked {
  darkBackground: DarkBackground3;
  lightBackground: LightBackground3;
}

export interface DarkBackground3 {
  png: string;
}

export interface LightBackground3 {
  jpg: string;
  png: string;
}
