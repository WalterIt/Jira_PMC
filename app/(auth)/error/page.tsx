import { ErrorCard } from '@/app/(auth)/_components/error-card'
import React, { Suspense } from 'react'

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

const ErrorPage = async ({ searchParams }: PageProps) => {
  const error = (await searchParams).error;


  return (
    <Suspense>
      <ErrorCard error={error} />
    </Suspense>
  );
}

export default ErrorPage