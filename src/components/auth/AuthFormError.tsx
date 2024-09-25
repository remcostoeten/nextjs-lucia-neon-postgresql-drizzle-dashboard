export default function AuthFormError({ state }: { state: { error: string } }) {
  if (state.error)
    return (
      <div className="w-full p-4 bg-destructive my-4 text-destructive-foreground text-xs">
        <h3 className="font-bold">Error</h3>
        <p>{state.error}</p>
      </div>
    );
  return null;
}
