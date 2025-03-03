import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {webClientId} from 'config/env';

import EncryptedStorage from 'react-native-encrypted-storage';
import Keychain from 'react-native-keychain';

export const saveWebClientId = async () => {
  try {
    const key = await Keychain.setGenericPassword(
      webClientId,
      'your_encrypted_webClientId',
    );

    if (key) {
      retrieveWebClientId();
    }
  } catch (error) {
    console.error('Error saving:', error);
  }
};

export const retrieveWebClientId = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const decryptedWebClientId = credentials.username;

      GoogleSignin.configure({
        webClientId: decryptedWebClientId,
        forceCodeForRefreshToken: true,
        offlineAccess: true,
      });
    } else {
      console.log('No webClientId found.');
    }
  } catch (error) {
    console.error('Error retrieving webClientId:', error);
  }
};

export const storeUserSession = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const retrieveUserSession = async (key: string) => {
  try {
    const session = await EncryptedStorage.getItem(key);

    return session;
  } catch (error) {
    throw error;
  }
};

export const removeUserSession = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};
