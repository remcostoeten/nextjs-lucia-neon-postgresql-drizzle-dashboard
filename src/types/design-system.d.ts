export type DesignSystemWrapperProps = {
  title: string;
  description?: string;
  actionButtons?: { label: string; onClick: () => void }[];
  children: React.ReactNode;
};
