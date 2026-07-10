import React, { useEffect, useLayoutEffect, useMemo, Suspense } from "react";

// Suspense and lazy loading example
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export default function LazyApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

