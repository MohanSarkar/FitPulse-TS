'use client';

import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export interface ToastMessage {
  id: number;
  message: string;
  type?: 'success' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: number) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-h-screen overflow-hidden pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#16181C] border border-gray-800/90 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 min-w-[200px]">
      {toast.type === 'error' ? (
        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
      )}
      <span className="text-xs font-semibold text-white tracking-wide flex-1">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-white transition-colors p-0.5 ml-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}