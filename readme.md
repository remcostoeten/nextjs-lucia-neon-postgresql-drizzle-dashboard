---
title: Notevault - by Remco Stoeten
---

This is an application that in the future will be a collection of all kinds of application, features, and utility tools I've made over the past year(s) for easy personal access. This won't be a SaaS for others, although, if others want to use the features I'm building or use code as an example for their own projects you're free to. Hence I'm developing it in open source.

I have a lot of dashboard repositories and build dozens of dashboards, each have individual features in them which will slowly get merged over time into here. For now, I'm focusing on note creation. Hence the Notevault.

### Small to-do list for the Notevault (far from complete): https://excalidraw.com/#json=4C-pL1uB98nUyzA0OV_kR,LqFlFCnFiexyEOFjyOQ9rg

### Future features

Like I said I will slowly be merging features into here and you can expect the following over time:
- Kanban board
- Chromedriver (want to migrate to puppeteer) WhatsApp scraper
- CSV mutate tool
- Text mutate tool
- Diff checker with diffs stored to a db
- View and mutate personal WhatsApp history
- HTML to JSX/TSX converter + component creator
- Finance logger/dashboard
- Filevault Storage
- Utility scripts Storage
- Config manager (.zshrc with partials easily listed out)
- Blog through mdx
- Transition easing helper tool (CSS and Framer motion)
- Knowledge base
- Personal code (Vercel, Github, Gitlab) statistics
- Personal homepage (e.g., a section to have as newtab with an overview of your favorite bookmarks)
- .env storage/sharing
- Whiteboard/creative dump your thoughts feature
- SVG to CSS-pseudo selector/SVG to react component converter
... And many more I can't remember.

### Tech stack

- Nextjs 14+
- React 18-19
- Database managed through drizzleORM
   - Postgress through Neon.tech's service.
   - For WhatsApp, I might incorporate a second one, SQLite through Turso.tech

### UI

- TailwindCSS
- ShadCN/other misc. libraries and a lot of own coded components.
- Framer motion

### Authentication

-Lucia auth
   - Email and password registration 
         -   ToDo: integrate email verification/reset password
         -   ToDo: Integrate oAuth2 social login
Stored in postgress database with hashed password and relation tables.

### Core packages

- DrizzleORM
- Zustand - state management
- Zod - validation
- TipTap - richtexteditor

tl;dr - another application which I say will be the end all.

Much love xxxx,

Remco Stoeten
💗 remcostoeten.com

