import { IStory } from './story.model';
import { IUser } from './user.model';

export interface IVote {
  id?: number;
  estimate?: number;
  story?: IStory;
  vote?: IUser;
}

export const defaultValue: Readonly<IVote> = {};
