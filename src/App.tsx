import React, { useCallback, useEffect } from 'react';
import './App.scss';
import { TablePage } from './pages/TablePage';
import { setProducts } from './features/products';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Header } from './components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductInfo } from './pages/ProductInfo';

export function App() {
  const { count } = useAppSelector(state => state.count);
  const dispatch = useAppDispatch();

  const getProducts = useCallback(async () => {
    const url = 'https://dummyjson.com/products';
  
    const result = await fetch(url + `?limit=${count}`)
      .then(response => response.json())
      .then(data => data.products);

      dispatch(setProducts(result));
  }, [count, dispatch])

  useEffect(() => {
    getProducts();
  }, [getProducts])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/products">
          <Route index element={<TablePage />} />
          <Route path=":id" element={<ProductInfo />} />
        </Route>
      </Routes>
  
    </div>
  );
}

export default App;
