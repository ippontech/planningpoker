import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IStory, defaultValue } from 'app/shared/model/story.model';

export const ACTION_TYPES = {
  FETCH_STORY_LIST: 'story/FETCH_STORY_LIST',
  FETCH_STORY: 'story/FETCH_STORY',
  CREATE_STORY: 'story/CREATE_STORY',
  UPDATE_STORY: 'story/UPDATE_STORY',
  DELETE_STORY: 'story/DELETE_STORY',
  RESET: 'story/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StoryState = Readonly<typeof initialState>;

// Reducer

export default (state: StoryState = initialState, action): StoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STORY):
    case REQUEST(ACTION_TYPES.UPDATE_STORY):
    case REQUEST(ACTION_TYPES.DELETE_STORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STORY):
    case FAILURE(ACTION_TYPES.CREATE_STORY):
    case FAILURE(ACTION_TYPES.UPDATE_STORY):
    case FAILURE(ACTION_TYPES.DELETE_STORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STORY):
    case SUCCESS(ACTION_TYPES.UPDATE_STORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/stories';

// Actions

export const getEntities: ICrudGetAllAction<IStory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STORY_LIST,
  payload: axios.get<IStory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STORY,
    payload: axios.get<IStory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STORY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
