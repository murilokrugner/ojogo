import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '../../../services/api';

import {signInSuccess, signFailure} from './actions';
import {updateProfileSuccess} from '../user/actions';

export function* signIn({payload}) {
  try {
    const {company, email, password} = payload;

    const response = yield call(api.post, 'session', {
      company_name: company,
      user_name: email,
      password: password,
    });

    const {token, user, config} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));

    yield put(updateProfileSuccess(user, config));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
