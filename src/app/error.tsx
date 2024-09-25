"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Home,
  RotateCcw,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    console.error(error);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          reset();
          return 0;
        }
        return prevProgress - 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [error, reset]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background animate-in fade-in duration-500">
      <Card className="w-[420px] bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive animate-pulse" />
            <CardTitle className="text-xl font-semibold">
              Something went wrong!
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            We encountered an error while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {error.message ||
              "We apologize for the inconvenience. Our team has been notified and is working on a fix."}
          </p>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center w-full justify-between p-0"
              >
                <span>Error details</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <p className="text-xs text-muted-foreground">
                Error Name: {error.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Error Message: {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Stack Trace:
                <span className="block mt-1 font-mono text-[10px] whitespace-pre-wrap">
                  {error.stack}
                </span>
              </p>
            </CollapsibleContent>
          </Collapsible>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Automatic retry in {Math.ceil(progress / 10)} seconds
            </p>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => reset()}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
