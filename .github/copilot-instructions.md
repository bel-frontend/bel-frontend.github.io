# Repository Coding Standards

## Core Principles

-   **Never Lose User Data**: Always preserve existing user data during updates and migrations
-   **Backward Compatibility**: Ensure new code works with existing data structures and APIs
-   **Reuse First**: Always analyze existing components, hooks, and utilities before creating new ones
-   **Functional Approach**: Prefer functional programming patterns and composition over classes
-   **DRY (Don't Repeat Yourself)**: If similar structure exists, reuse and extend it
-   **Search Before Create**: Use semantic search to find existing solutions in the codebase
-   **Consistency**: Follow established patterns from existing similar components

## Project Overview

-   AI-powered localization/translation manager web application
-   MCP (Model Context Protocol) support for IDE integration
-   Context-aware AI translations with prompt management
-   Supports multiple languages and export formats
-   Uses TypeScript with strict mode
-   Next.js with App Router for server-side rendering

## Tech Stack

-   **Framework**: Next.js 14 with App Router
-   **Language**: TypeScript 5.1.6
-   **UI Library**: Material-UI (MUI) v5
-   **State Management**: Redux Toolkit + Redux Saga
-   **Localization**: i18next + react-i18next + next-i18next
-   **Authentication**: Firebase
-   **Database**: Firebase + AsyncStorage persistence
-   **Styling**: SCSS modules + Emotion (MUI)
-   **Analytics**: Custom analytics tracking

## Development Workflow

1. **Analyze**: Search codebase for similar functionality before starting
2. **Reuse**: Use existing components, hooks, and utilities when possible
3. **Extend**: If existing code is close but not exact, extend it
4. **Create**: Only create new code when nothing similar exists
5. **Document**: Add JSDoc comments for complex or reusable logic

## Build & Run Policy

-   **DO NOT** attempt to build or run the project automatically
-   **DO NOT** execute build commands (`npm run build`, `expo build`, etc.)
-   **DO NOT** start the development server automatically
-   The developer will handle all builds and runs manually

## Documentation Policy

-   **Don't Over-Document**: Do NOT create documentation files after every small update
-   **Document When Needed**: Only create docs for:
    -   Controversial or non-obvious architectural decisions
    -   Complex features requiring explanation
    -   Breaking changes or major refactors
    -   New patterns being introduced to the codebase
-   **Prefer Code Comments**: Use JSDoc and inline comments for most documentation needs
-   **Keep Existing Docs Updated**: Update existing documentation rather than creating new files
-   Don't create documentation without users allowing it

## Commit Standards

-   Use Conventional Commits format
-   Keep PRs small and focused
-   Update `CHANGELOG.md` in every release PR

## Common Commands

```bash
# Development
npm run dev                                      # Dev server (Next.js)
npm start                                        # Production server

# Code Quality
npm run lint                                     # ESLint

# Building
npm run build                                    # Production build
```

## File Organization

-   App Routes: `src/app/` organized by route groups ((auth), (authorized), (non-auth))
-   Components: `src/components/` for reusable UI components
-   Containers: `src/containers/` for feature-specific containers
-   Modules: `src/modules/` for Redux slices and sagas
-   Hooks: `src/modules/hooks/` for custom hooks
-   Utils: `src/utils/` for utilities
-   Helpers: `src/helpers/` for helper functions
-   Types: TypeScript types defined inline or in respective module files
-   Locales: Translation files managed through the application
-   Providers: `src/providers/` for React context providers

## Key Guidelines

-   All user-facing text must use i18next translations
-   TypeScript strict mode - no `any` types
-   Functional components with hooks only
-   Use path alias `@/` for imports (maps to `src/`)
-   Use Material-UI components for UI consistency
-   Follow Redux Toolkit patterns for state management
-   See `.github/instructions/frontend.instructions.md` for detailed code style guidelines
