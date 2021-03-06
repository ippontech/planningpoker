import { expect } from 'chai';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as sinon from 'sinon';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';

import { SUCCESS, FAILURE, REQUEST } from 'app/shared/reducers/action-type.util';
import activate, { ACTION_TYPES, activateAction } from 'app/modules/account/activate/activate.reducer';

describe('Activate reducer tests', () => {
  it('should return the initial state', () => {
    expect(activate(undefined, {})).to.contain({
      activationSuccess: false,
      activationFailure: false
    });
  });

  it('should reset', () => {
    expect(activate({ activationSuccess: true, activationFailure: false }, { type: ACTION_TYPES.RESET })).to.contain({
      activationSuccess: false,
      activationFailure: false
    });
  });

  it('should detect a success', () => {
    expect(activate(undefined, { type: SUCCESS(ACTION_TYPES.ACTIVATE_ACCOUNT) })).to.contain({
      activationSuccess: true,
      activationFailure: false
    });
  });

  it('should detect a failure', () => {
    expect(activate(undefined, { type: FAILURE(ACTION_TYPES.ACTIVATE_ACCOUNT) })).to.contain({
      activationSuccess: false,
      activationFailure: true
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware()]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches ACTIVATE_ACCOUNT_PENDING and ACTIVATE_ACCOUNT_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.ACTIVATE_ACCOUNT)
        },
        {
          type: SUCCESS(ACTION_TYPES.ACTIVATE_ACCOUNT),
          payload: resolvedObject
        }
      ];
      await store.dispatch(activateAction('')).then(() => expect(store.getActions()).to.eql(expectedActions));
    });
  });
});
