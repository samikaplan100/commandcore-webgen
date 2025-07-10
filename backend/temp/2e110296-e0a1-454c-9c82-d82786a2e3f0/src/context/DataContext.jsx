import React, { createContext, useContext, useState } from 'react';
import { fetchData } from '../utils/apiHelpers.js';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const loadData = async () => {
    const result = await fetchData();
    setData(result);
  };