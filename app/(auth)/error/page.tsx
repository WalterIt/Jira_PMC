import { ErrorCard } from '@/app/(auth)/_components/error-card'
import React, { Suspense } from 'react'

const ErrorPage = () => {
  return (
    <Suspense>
      <ErrorCard />
    </Suspense>
  );
}

export default ErrorPage