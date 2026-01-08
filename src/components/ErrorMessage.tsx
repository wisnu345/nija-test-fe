interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <p className="text-red-600 font-medium text-center mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}