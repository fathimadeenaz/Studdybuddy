// app/result/page.tsx
import { Suspense } from 'react';
import ResultContent from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-10">Loading result...</p>}>
      <ResultContent />
    </Suspense>
  );
}
