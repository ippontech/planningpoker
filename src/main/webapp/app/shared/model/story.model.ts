import { IVote } from './vote.model';

export interface IStory {
  id?: number;
  name?: string;
  description?: string;
  estimate?: number;
  stories?: IVote[];
}

export const defaultValue: Readonly<IStory> = {};
