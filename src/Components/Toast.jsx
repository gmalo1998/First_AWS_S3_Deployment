import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/toastSlice";
import { IoCloseOutline } from "react-icons/io5";
import "./Toast.css";

const Toast = () => {
  const dispatch = useDispatch();
  const { queue, position } = useSelector((state) => state.toast);
  const containerRef = useRef(null);

  const handleDismiss = useCallback((toastId) => {
    dispatch(hideToast(toastId));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      queue.forEach(toast => {
        if (toast.dismissAt <= now) {
          dispatch(hideToast(toast.id));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [queue, dispatch]);

  if (!queue.length) return null;

  return ReactDOM.createPortal(
    <div className={`toast-container ${position}`} ref={containerRef}>
      {queue.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.status} enter`}
          style={{ 
            transitionDelay: `${queue.indexOf(toast) * 0.1}s`,
            '--dismiss-time': `${toast.duration}ms`
          }}
        >
          <div className="toast-content">
            <span className={`status-icon ${toast.status}`}></span>
            <p>{toast.message}</p>
          </div>
          <button 
            className="close-btn"
            onClick={() => handleDismiss(toast.id)}
            aria-label="Close toast"
          >
            <IoCloseOutline />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default React.memo(Toast);
