import { Loader2 } from "lucide-react";
import "./Loading.scss"

type PleaseWaitProps = {
  className?: string;
};

export const PleaseWait = ({ className = "" }: PleaseWaitProps) => {
  return (
    <div className={`please-wait ${className}`}>
      <Loader2 className="loader-icon" />
      <span>Please Wait</span>
    </div>
  );
};
