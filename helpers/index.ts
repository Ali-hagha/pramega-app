import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncStorageKeys } from '../constants/asyncStorageKeys';

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export const getCartUniqueIdFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(asyncStorageKeys.CART_UNIQUE_ID);

    return value;
  } catch (e) {
    console.log('error getting async storage', e);
  }
};

export const setCartUniqueIdToAsyncStorage = async (uuid: string) => {
  try {
    await AsyncStorage.setItem(asyncStorageKeys.CART_UNIQUE_ID, uuid);
  } catch (e) {
    console.log('error setting async storage', e);
  }
};

export const getCartIdFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(asyncStorageKeys.CART_ID);

    return value;
  } catch (e) {
    console.log('error getting async storage', e);
  }
};

export const setCartIdToAsyncStorage = async (id: string) => {
  try {
    await AsyncStorage.setItem(asyncStorageKeys.CART_ID, id);
  } catch (e) {
    console.log('error setting async storage', e);
  }
};
