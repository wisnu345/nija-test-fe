export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
      <p className="text-muted-foreground font-medium">{message}</p>
    </div>
  );
}