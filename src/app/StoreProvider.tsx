// src/app/StoreProvider.tsx
'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/loginSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null); // Initialize with null

  // Create the store instance only once
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Now that the store is available, you can use dispatch in a child component
  return (
    <Provider store={storeRef.current}>
      <ChildComponent>{children}</ChildComponent>
    </Provider>
  );
}

function ChildComponent({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the checkAuth action to verify if the user is logged in
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>; // Render the children passed down from StoreProvider
}
