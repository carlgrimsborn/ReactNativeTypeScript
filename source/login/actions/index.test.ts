// login/actions/index.test
// @ts-ignore
import configureMockStore, { MockStore } from 'redux-mock-store';
import AxiosMockFactory from 'axios-mock-adapter';

import { Store } from '../../Store';
import * as loginTypes from '../types';
import * as types from '../../Types';
import {FacebookLogin, axios } from '../actions';
import { UtilityTypes } from '../../utility/';
import { StorageTypes } from '../../storage';

/**
 * Mock Redux store
 */
const storeMock = configureMockStore<Store>();
/**
 * Mocks Axios HTTP requests for FacebookActions
 */
const axiosMock = new AxiosMockFactory(axios);

describe('Facebook actions', () => {
  beforeEach(() => {
    // @ts-ignore
    storeMock.clearActions();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('FacebookLogin returns SUCCESS when done', async () => {
    const token = 'fbTokenMock';
    const expectedReply = {
      name: 'MockName',
      picture: {
        data: {
          url: 'http://mockImageUrl/',
        },
      },
    };

    axiosMock
      .onGet(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`
      )
      .reply(200, expectedReply);

    const expectedPayload = {
      name: expectedReply.name,
      picture: expectedReply.picture.data.url,
      accessToken: token,
      type: 'Facebook',
    };

    const NoError = (
      sender: string,
      reason: string = null,
      exception: string = null
    ) => {
      return {
        sender,
        type: UtilityTypes.UtilityConstants.APP_NO_ERROR,
        reason,
        exception,
      };
    };

    const AppLoading = (sender: string, reason: string) => {
      return {
        sender,
        reason,
        type: UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
      };
    };

    const AppLoadDone = (sender: string, reason: string = null) => {
      return {
        sender,
        type: UtilityTypes.UtilityConstants.APP_LOAD_DONE,
        reason,
      };
    };

    const expectedActions = [
      AppLoading('FacebookLogin', loginTypes.LoginConstants.LOGIN_BUSY),
      {
        type: loginTypes.LoginConstants.LOGIN_SUCCESS,
        payload: expectedPayload,
      },
      AppLoading('SaveByKey', StorageTypes.StorageConstants.STORAGE_BUSY),
      {
        type: StorageTypes.StorageConstants.STORAGE_SAVED,
        key: StorageTypes.StorageConstants.STORAGE_USER_KEY,
        value: expectedPayload,
      },
      NoError('SaveByKey'),
      AppLoadDone('SaveByKey'),
      NoError('FacebookLogin'),
      AppLoadDone('FacebookLogin'),
    ];

    // Dispatch action
    // @ts-ignore
    await storeMock.dispatch(FacebookLogin());

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();

    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });
});
