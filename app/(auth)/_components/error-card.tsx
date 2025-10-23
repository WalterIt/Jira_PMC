import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Opps Something went wrong!!" backButtonHref="/login" backButtonLabel="Back To Login">
            <div className="w-full rounded-lg bg-destructive/15 py-3 px-4 flex items-center gap-3">
             <ExclamationTriangleIcon className="text-destructive w-6 h-6" /> 
              <p className="text-destructive text-xl">Something went wrong!!</p> 
            </div>
        </CardWrapper>
    )
}