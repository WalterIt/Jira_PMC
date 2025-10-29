// import { ReturnButton } from "@/components/return-button";

export default function Page() {
  return (
    <div className="px-8 py-16 mt-40 mb-40 bg-white  border border-gray-300 rounded-lg container mx-auto max-w-2xl space-y-8">
      <div className="space-y-4">
        {/* <ReturnButton href="/auth/login" label="Login" /> */}

        <h1 className="text-3xl font-bold">Success</h1>

        <p className="text-muted-foreground">
          Success! You have re-sent a verification link to your email.
        </p>
      </div>
    </div>
  );
}