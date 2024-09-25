import type { Metadata } from "next";
import { metadata as rootMetadata } from "./metadata.root-layout";

const dashboardName = "NoteVault Dashboard";
const dashboardDescription =
  "Manage your notes and account in the NoteVault dashboard";

export const dashboardMetadata: Metadata = {
  ...rootMetadata,
  title: {
    default: dashboardName,
    template: `%s | ${dashboardName}`,
  },
  description: dashboardDescription,
  openGraph: {
    ...rootMetadata.openGraph,
    title: dashboardName,
    description: dashboardDescription,
    images: [
      {
        url: `${rootMetadata.metadataBase}/dashboard-og-image.png`,
        width: 1200,
        height: 630,
        alt: "NoteVault Dashboard",
      },
    ],
  },
  twitter: {
    ...rootMetadata.twitter,
    title: dashboardName,
    description: dashboardDescription,
    images: [`${rootMetadata.metadataBase}/dashboard-twitter-image.png`],
  },
};
