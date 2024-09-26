import { AlertTriangle } from "lucide-react";

const NoticeBox = ({
  icon = <AlertTriangle className="h-4 w-4 shrink-0" />,
  title = "Unexpected error occurred.",
  actionText = "Try again",
  onAction = () => {},
}) => {
  return (
    <div className=" flex min-h-[350px] w-full items-center">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border bg-section text-card-foreground flex flex-col items-center justify-center gap-4 border-dashed px-12 py-6 shadow-none">
          <div className="flex items-center justify-center rounded-md border bg-background p-2 shadow-sm">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeBox;
