import { NewVerificationForm } from '../_components/new-verification-form'
import React, { Suspense } from 'react'

const NewVerification = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerification