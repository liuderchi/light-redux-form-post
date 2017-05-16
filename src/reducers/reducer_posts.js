import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state={}, action) {
  switch (action.type) {

  case FETCH_POST:
    // NOTE keep pervious posts in state

    // const post = action.payload.data;
    // const newState = { ...state };
    // newState[post.id] = post;
    // return newState;

    // es6 key interpolation
    return { ...state, [action.payload.data.id]: action.payload.data }

  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
    // NOTE map array of obj into big object with specified values as new keys
    // if values has dup, last one overwites

  case DELETE_POST:
    const id = action.payload;
    return _.omit(state, id);    // cleanup state by omitting target id

  default:
    return state;
  }
}
