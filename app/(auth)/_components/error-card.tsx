import { TriangleAlert } from "lucide-react";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = ({error} : {error  : string}) => {
    return (
      <CardWrapper
        headerLabel="Opps Something went wrong!!"
        backButtonHref="/login"
        backButtonLabel="Back To Login"
      >
        <div className="w-full rounded-lg bg-destructive/15 py-3 px-4 flex items-center gap-3">
          <TriangleAlert className="text-destructive w-6 h-6" />
          <p className="text-destructive text-xl">
            {error === "account_not_linked"
              ? "This account is already linked to another sign-in method."
              : "Oops! Something went wrong. Please try again."}
          </p>
        </div>
      </CardWrapper>
    );
}