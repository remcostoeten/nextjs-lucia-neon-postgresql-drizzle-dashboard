"use client";

import CodeHighlight from "@/components/elements/code-highlight/code-highlight";
import NoticeBox from "@/components/elements/notice-box";
import { AlertCircle, AlertOctagon } from "lucide-react";
import DesignSystemWrapper from "../_components/DesignSystemWrapper";
import { HoverCard } from "@/components/effects/hover-card";

const NoticeBoxsPage = () => {
  const handleTryAgain = () => {
    console.log("Trying again...");
  };

  return (
    <DesignSystemWrapper
      language="tsx"
      title="Error Alerts"
      description="Customizable error alert components for various scenarios."
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Default Error Alert</h3>
          <NoticeBox onAction={handleTryAgain} />
          <CodeHighlight language="tsx" title="Default Error Alert Usage">
            {`<NoticeBox onAction={handleTryAgain} />`}
          </CodeHighlight>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Custom Message Error Alert
          </h3>
          <NoticeBox
            title="Unable to save changes"
            actionText="Retry Save"
            onAction={handleTryAgain}
          />
          <CodeHighlight
            language="tsx"
            title="Custom Message Error Alert Usage"
          >
            {`<NoticeBox 
  title="Unable to save changes" 
  actionText="Retry Save"
  onAction={handleTryAgain}
/>`}
          </CodeHighlight>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Custom Icon Error Alert
          </h3>
          <NoticeBox
            icon={<AlertCircle />}
            title="Critical system error"
            actionText="Contact Support"
            onAction={() => console.log("Contacting support...")}
          />
          <CodeHighlight language="tsx" title="Custom Icon Error Alert Usage">
            {`<NoticeBox 
  icon={<AlertCircle />}
  title="Critical system error" 
  actionText="Contact Support"
  onAction={() => console.log('Contacting support...')}
/>`}
          </CodeHighlight>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Warning Alert</h3>
          <NoticeBox
            icon={<AlertOctagon />}
            title="Your session is about to expire"
            actionText="Extend Session"
            onAction={() => console.log("Extending session...")}
          />
          <CodeHighlight language="tsx" title="Warning Alert Usage">
            {`<NoticeBox 
  icon={<AlertOctagon />}
  title="Your session is about to expire" 
  actionText="Extend Session"
  onAction={() => console.log('Extending session...')}
/>`}
          </CodeHighlight>
        </div>
      </div>
      <HoverCard>
        <NoticeBox
          icon={<AlertOctagon />}
          title="Your session is about to expire"
          actionText="Extend Session"
          onAction={() => console.log("Extending session...")}
        />
      </HoverCard>
    </DesignSystemWrapper>
  );
};

export default NoticeBoxsPage;
