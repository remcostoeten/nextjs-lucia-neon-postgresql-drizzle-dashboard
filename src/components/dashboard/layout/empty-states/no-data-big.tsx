/* Inspiration
https://app.midday.ai/transactions
*/

import React, { ButtonHTMLAttributes } from 'react';

type ConnectBankAccountProps = {
    titl?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <button
        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
        {...props}
    >
        {children}
    </button>
);

const ConnectBankAccount: React.FC<ConnectBankAccountProps> = ({
    title,
    description,
    buttonText,
    onButtonClick,
}) => {
    return (
        <section className="absolute w-full h-[calc(100vh-300px)] top-0 left-0 flex items-center justify-center z-20">
            <div className="text-center max-w-sm mx-auto flex flex-col items-center justify-center">
                <h2 className="text-xl font-medium mb-2">{title}</h2>
                <p className="text-sm text-gray-500 mb-6">{description}</p>
                <Button
                    onClick={onButtonClick}
                    data-event="Add account"
                    data-icon="🏦"
                    data-channel="bank"
                >
                    {buttonText}
                </Button>
            </div>
        </section>
    );
};

export default ConnectBankAccount;
/*Usage
  const handleAddAccount = () => {
    // Handle account addition logic
    console.log('Adding account...');
  };

  return (
    <main>
      <ConnectBankAccount
        title="Connect bank account"
        description="Get instant transaction insights. Easily spot missing receipts, categorize expenses, and reconcile everything seamlessly for accounting."
        buttonText="Add account"
        onButtonClick={handleAddAccount}
      />
    </main>
  );
  */
