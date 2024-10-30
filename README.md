> [!NOTE]  
> Currently refactoring the entire api, dashboard, server side. Depreecating every single feature since I want to rebuild with SOLID principles and finish feature by fgeature instead of building dozens of half-assed features.. Current master branch is the old version which i'm refactoring.

<sub>tl;dr - another application which I say will be the end all.</sub>

## Notevault - by Remco Stoeten

This is an application that in the future will be a collection of all kinds of application, features, and utility tools I've made over the past year(s) for easy personal access.

This won't be a SaaS for others or an attempt to monotize anything. Although, if others want to use the features I'm building or use code as an example for their own projects you're free to. Hence I'm developing it in open source.

## Features

Most are not totally done as I switch from one feature to another if I feel like it. But im activly worlikg om these and most are commkng to am MVP. Features include authentication and use server actions only for mutating data in a postgres db.

-   sick new landing and megemenu
-   Folder creation (for notes, files, anything that meeds sn parent)
-   Text parse tool (personal needs but bas some generic features like remove duplicates, sort etc)
-   Peripherals tester (cam&mic test)
    -   record audio and edit, download mp3, speach to text
-   user settings
-   user profile
-   diff checker
-   tasks creation and view in list & kanban
-   finance board

## Tech stack

-   Nextjs 14+
-   React 18-19
-   Database(s)
    -   Postgresql - Through cloud provider: [Neon](https://neon.tech/)
    -   SQLite - Not implemented yet. Will be a cloud provider: [Turso](https://turso.tech).  
         <sub>In the future I might implement a second database
        for the Whatsapp-chat function due to the 1 billion free reads.</sub>

### UI

-   TailwindCSS
-   ShadCN/other misc. libraries and a lot of own coded components.
-   Framer motion

### Authentication

-   [lucia](https://lucia-auth.com) authentication  
    <sub>Stored in postgress database with hashed password, sessions table and relation tables.</sub>
-   Email and password registration
    ToDo: integrate email verification/reset password
    ToDo: Integrate oAuth2 social login

### Core packages

-   DrizzleORM
-   Zustand - state management
-   Zod - validation
-   TipTap - richtexteditor

I have a lot of dashboard repositories and build dozens of dashboards, each have individual features in them which will slowly get merged over time into here. For now, I'm focusing on note creation. Hence the Notevault.

## Idea, todo, sketch whiteoard

A small dump thought's/todo whiteoard which is far from complete. [View here](https://excalidraw.com/#json=uNBSS85x6CsiYGm-v1bKa,eN2Z5Zav4QdBsfw5LuDKtw)

## Future features

Like I said I will slowly be merging features into here and you can expect the following over time:

-   Kanban board
-   Chromedriver (want to migrate to puppeteer) WhatsApp scraper
-   CSV mutate tool
-   Text mutate tool
-   Diff checker with diffs stored to a db
-   View and mutate personal WhatsApp history
-   HTML to JSX/TSX converter + component creator
-   Finance logger/dashboard
-   Filevault Storage
-   Utility scripts Storage
-   Config manager (.zshrc with partials easily listed out)
-   Blog through mdx
-   Transition easing helper tool (CSS and Framer motion)
-   Knowledge base
-   Personal code (Vercel, Github, Gitlab) statistics
-   Personal homepage (e.g., a section to have as newtab with an overview of your favorite bookmarks)
-   .env storage/sharing
-   Whiteboard/creative dump your thoughts feature
-   SVG to CSS-pseudo selector/SVG to react component converter
    ... And many more I can't remember.

Much love xxxx,

Remco Stoeten  
<sub>[remcostoeten.com](https://remcostoeten.com)</sub>

<sub>A ✨ is appreciated for growning my e-penor</sub>
