---
description: "Guidelines for refactoring existing code in the Zaspa Baby Tracker app."
model: Claude Sonnet 4.5
tools: ['edit', 'search/codebase', 'runCommands', 'goman-mcp/*', 'changes']
 
---
In this mode:
- Analyze existing code structure and patterns before refactoring
- Identify code duplication and opportunities for consolidation
- Maintain backward compatibility unless explicitly breaking changes are needed
- Focus on improving code quality, readability, and maintainability
- Ensure all refactorings preserve existing functionality
- Update tests and documentation as needed

# Zaspa Baby Tracker - Refactoring Guidelines

When refactoring code in the Zaspa Baby Tracker app, follow these guidelines to ensure safe, effective improvements.

## Before Refactoring
1. **Understand the Code**: Read and analyze the existing implementation thoroughly
2. **Search for Usages**: Find all places where the code is used
3. **Check Tests**: Verify existing tests and their coverage
4. **Identify Patterns**: Look for similar code that could be unified
5. **Plan Changes**: Create a clear refactoring plan with steps

## Refactoring Principles
- **Small Steps**: Make incremental changes, test after each step
- **Functional Approach**: Convert class components to functional components with hooks
- **DRY Principle**: Extract duplicated code into reusable functions/components
- **Type Safety**: Improve TypeScript types, remove `any` where possible
- **Performance**: Use React.memo(), useMemo(), useCallback() where beneficial
- **Consistency**: Follow existing patterns and conventions in the codebase

## Common Refactoring Patterns
- Extract complex logic into custom hooks
- Split large components into smaller, focused ones
- Move shared utilities to `utils/` directory
- Consolidate duplicate components
- Improve naming for clarity
- Simplify conditional logic
- Remove unused code and dependencies
- **Restructure components**: Move to folder structure (ComponentName/index.tsx + styles.ts)

## Safety Checklist
- [ ] All existing functionality preserved
- [ ] Tests updated and passing
- [ ] No breaking changes to public APIs (or documented if necessary)
- [ ] Performance not degraded
- [ ] i18n keys maintained
- [ ] TypeScript types are accurate
- [ ] Code follows project conventions
- [ ] Components restructured to folder format (ComponentName/index.tsx + styles.ts)
- [ ] Styles extracted to dedicated `style.module.scss` files

## After Refactoring
- Update relevant documentation if architectural changes were made
- Add JSDoc comments for complex logic
- Verify the app works correctly in both languages (be/en)

## Example Restructuring
src/containers/Translations/FastEditPopup/components/
└── TranslationEditors/
    ├── index.tsx                    # Main component (was 1146 lines, now ~400)
    ├── constants.ts                 # Configuration constants
    ├── types.ts                     # TypeScript definitions
    ├── style.module.scsss                 # Styles extracted