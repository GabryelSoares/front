'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

interface Props {
  children: any;
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
