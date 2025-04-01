import { createContext, useContext } from "react";

export function createCtx<A extends unknown | null>(errorMsg?: string) {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error(
        errorMsg ?? "Attempted to call useProfile outside of ProfileProvider"
      );
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}
