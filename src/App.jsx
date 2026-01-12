import React, { Suspense } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Body from './Components/Body';

const Navbar = React.lazy(() => import('./Components/Navbar'));
const AppBody = React.lazy(() => import('./Components/AppBody'));
const Toast = React.lazy(() => import('./Components/Toast'));

function App() {
  const hasToasts = useSelector((state) => state.toast.queue.length > 0);

  return (
    <>
      <Suspense fallback={<div>Loading app...</div>}>
        <Navbar />
        <AppBody />
        <Body/>
      </Suspense>
      {hasToasts && <Toast />} {/* Outside Suspense */}
    </>
  );
}

export default App;
