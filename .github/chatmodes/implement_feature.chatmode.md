---
description: 'Guidelines for implementing new features and extending functionality in the Zaspa Baby Tracker app.'
model: Claude Sonnet 4.5
tools: [
        'edit',
        'search',
        'vscodeAPI',
        'problems',
        'changes',
        'todos',
        'goman-mcp/*',
    ]
---

In this mode:

-   Analyze existing code structure and patterns before implementing
-   Reuse existing components, hooks, and utilities wherever possible
-   Extend existing functionality rather than duplicating code
-   Maintain backward compatibility and data integrity
-   Focus on clean, maintainable, and testable code
-   Follow established patterns and conventions
-   use mcp-server-3525db95 for manipulate of localization

# Zaspa Baby Tracker - Feature Implementation Guidelines

When implementing new features or extending functionality in the Zaspa Baby Tracker app, follow these guidelines to ensure consistency and quality.

## Before Implementation

1. **Search First**: Use semantic search to find similar existing functionality
2. **Analyze Patterns**: Study how similar features are implemented
3. **Check Dependencies**: Identify existing hooks, components, and utilities you can reuse
4. **Plan Structure**: Determine which files need to be created or modified
5. **i18n Keys**: Plan localization keys following existing naming patterns

## Implementation Principles

-   **Reuse First**: Always check if similar functionality exists before creating new code
-   **Extend, Don't Duplicate**: If something similar exists, extend it rather than copying
-   **Functional Components**: Use functional components with hooks (no class components)
-   **Type Safety**: Write TypeScript with strict types, avoid `any`
-   **Data Safety**: Never lose or corrupt existing user data
-   **Backward Compatible**: Ensure new code works with existing data structures
-   **Composition**: Prefer small, composable functions and components

## Implementation Workflow

1. **Search**: Find similar components/hooks in the codebase
2. **Reuse**: Use existing utilities, types, and patterns
3. **Create**: Build new code following established conventions
4. **Localize**: Add i18n keys for all user-facing text (be + en)
5. **Type**: Add proper TypeScript types and interfaces
6. **Test**: Verify functionality works in both languages
7. **Document**: Add JSDoc comments for complex logic

## Common Patterns to Follow

-   Custom hooks in `hooks/` for shared logic
-   Reusable components in `components/`
-   Screen components in `screens/[feature]/`
-   Utilities in `utils/`
-   Types in `types/`
-   Use `SafeText` component for all displayed text
-   Use `useAnalytics` hook for tracking
-   Use AsyncStorage for data persistence
-   Use Expo Router for navigation

## Feature Checklist

-   [ ] Searched for similar existing functionality
-   [ ] Reused existing components/hooks where possible
-   [ ] All user-facing text uses i18n (be + en translations)
-   [ ] TypeScript types are complete and accurate
-   [ ] Data persistence works correctly
-   [ ] Backward compatible with existing data
-   [ ] Navigation integrated properly
-   [ ] Analytics tracking added (if applicable)
-   [ ] Code follows project conventions
-   [ ] Works in both Belarusian and English

## After Implementation

-   Don't create documentation files for minor features
-   Only document controversial decisions or complex architectures
-   Add JSDoc comments for complex or reusable logic
-   Update existing documentation if making architectural changes
-   Test thoroughly in both languages (be/en)
