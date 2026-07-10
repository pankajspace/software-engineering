import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Rendering1, Rendering2 } from './Rendering';
import LazyApp from './LazyApp';
import UseState from './UseState';
import UseEffect from './UseEffect';
import { UseRef1, UseRef2, UseRef3, UseRef4 } from './UseRef';
import ReactMemo from './ReactMemo';
import UseMemo from './UseMemo';
import UseCallback from './UseCallback';
import UseContext from './UseContext';
import { Logger, LocalStorage, Toggle, Debounce, Async } from './CustomHooks';
import ErrorBoundaryApp from './ErrorBoundary';
import RenderProp from './RenderProp';
import UseReducer from './UseReducer';
import Portal from './Portal';
import UseDefferedValue from './UseDefferedValue';
import UseTransition from './UseTransition';
import UseId from './UseId';
import UseLayoutEffect from './UseLayoutEffect';
import UseImperativeHandle from './UseImperativeHandle';
import UseSyncExternalStore from './UseSyncExternalStore';
import UseDebugValue from './UseDebugValue';
import Timer from './Timer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Rendering1 /> */}
    {/* <Rendering2 /> */}
    <LazyApp />
    {/* <UseState /> */}
    {/* <UseEffect /> */}
    {/* <UseRef1 /> */}
    {/* <UseRef2 /> */}
    {/* <UseRef3 /> */}
    {/* <UseRef4 /> */}
    {/* <ReactMemo /> */}
    {/* <UseMemo /> */}
    {/* <UseCallback /> */}
    {/* <UseContext /> */}
    {/* <ErrorBoundaryApp /> */}
    {/* <RenderProp /> */}
    {/* <UseReducer /> */}
    {/* <Portal /> */}
    {/* <UseDefferedValue /> */}
    {/* <UseTransition /> */}
    {/* <UseId /> */}
    {/* <UseImperativeHandle /> */}
    {/* <Logger /> */}
    {/* <LocalStorage /> */}
    {/* <Toggle /> */}
    {/* <Debounce /> */}
    {/* <Async /> */}
    {/* <UseLayoutEffect /> */}
    {/* <UseSyncExternalStore /> */}
    {/* <UseDebugValue /> */}
    {/* <Timer /> */}
  </React.StrictMode>
)