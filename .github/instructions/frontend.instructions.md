---

applyTo: "**/*.ts,**/*.tsx"

---

# Frontend Development Instructions - GOman Live

## Project Overview

**GOman Live** is an AI-powered localization/translation manager web application built with Next.js for managing translations, with MCP (Model Context Protocol) support for IDE integration, context-aware AI translations with prompt management, and support for multiple languages and export formats.

### Tech Stack
- Next.js 14 with App Router
- TypeScript 5.1.6
- Material-UI (MUI) v5
- Redux Toolkit + Redux Saga
- i18next + react-i18next + next-i18next
- Firebase (Authentication + Database)
- SCSS modules + Emotion (MUI styling)
- Custom analytics tracking

### Project Structure
```
src/
  app/                 # Next.js App Router pages
    (auth)/           # Authentication routes
    (authorized)/     # Protected routes
    (non-auth)/       # Public routes
  components/          # Reusable UI components
  containers/          # Feature-specific containers
  modules/            # Redux slices and sagas
    hooks/            # Custom hooks
  providers/          # React context providers
  helpers/            # Helper functions
  utils/              # Utility functions
  styles/             # Global styles
  constants/          # App constants
```

### Key Patterns
- **Routing**: Next.js App Router with route groups
- **State**: Redux Toolkit + Redux Saga for async operations
- **Localization**: i18next with next-i18next
- **Styling**: Material-UI components + SCSS modules + Emotion
- **Authentication**: Firebase Auth

## Coding Standards

### TypeScript
- ✅ **Strict types**: `type: 'breast' | 'formula'`, not `type: string`
- ✅ **No `any`**: Use proper types
- ✅ **Enums**: `enum EventType { FEEDING = 'feeding' }`
- ✅ **Interface props**: 
  ```typescript
  interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
  }
  export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {...}
  ```

### Component Structure
```typescript
// 1. Imports (React, Next.js, MUI, types, hooks)
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './Card.module.scss';

// 2. Props Interface
interface CardProps { 
  title: string; 
  onPress?: () => void; 
}

// 3. Component
export const Card: React.FC<CardProps> = ({ title, onPress }) => {
  const { t } = useTranslation();  // Hooks
  const [expanded, setExpanded] = useState(false);  // State
  
  // Handlers
  const handleClick = () => onPress?.();
  
  return (
    <Box className={styles.container} onClick={handleClick}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};
```

### File Naming
- Components: `EventCard.tsx` (PascalCase)
- Pages: `page.tsx` (Next.js convention)
- Utils: `formatDate.ts` (camelCase)
- Hooks: `useAnalytics.ts` (use prefix)
- Types: `EventCard.types.ts`
- Styles: `Component.module.scss` (SCSS modules)

### Component Structure (File Organization)

**All new components SHOULD follow this folder structure:**

```
components/
  MyComponent/
    index.tsx          # Component logic
    MyComponent.module.scss  # SCSS module styles
    MyComponent.types.ts  # TypeScript interfaces (optional)
```

**Example: EventCard Component**
```
components/
  EventCard/
    index.tsx
    EventCard.module.scss
    EventCard.types.ts
```

**MyComponent.module.scss pattern:**
```scss
.container {
  background-color: var(--background-color);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}
```

**index.tsx pattern:**
```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.types';

export const EventCard: React.FC<EventCardProps> = ({ title, subtitle }) => {
  const { t } = useTranslation();
  
  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.subtitle}>{subtitle}</Typography>
    </Box>
  );
};
```

**Why this structure?**
- ✅ **Separation of Concerns**: Logic and styles are separated
- ✅ **Reusability**: Styles can be reused across similar components
- ✅ **Maintainability**: Easier to find and update styles
- ✅ **CSS Modules**: Scoped styles prevent naming conflicts
- ✅ **Testability**: Component logic is easier to test without style clutter
- ✅ **Consistency**: All components follow the same pattern

**DON'T:**
```typescript
// ❌ Inline styles in component file
export const MyComponent = () => {
  return (
    <Box sx={{ backgroundColor: 'white', padding: '16px' }}>
      <Typography sx={{ fontSize: 16, color: 'black' }}>Hello</Typography>
    </Box>
  );
};
```

**DO:**
```typescript
// ✅ Styles in dedicated SCSS module
import styles from './MyComponent.module.scss';

export const MyComponent = () => {
  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Hello</Typography>
    </Box>
  );
};
```

### Styling System (Material-UI + SCSS)

**IMPORTANT: Use Material-UI components with SCSS modules for custom styling**

```typescript
import { Box, Typography, Button } from '@mui/material';
import styles from './MyComponent.module.scss';

export const MyComponent = () => {
  return (
    <Box className={styles.container}>
      <Typography variant="h6" className={styles.title}>
        Title
      </Typography>
      <Button variant="contained" color="primary">
        Action
      </Button>
    </Box>
  );
};
```

**SCSS Module patterns:**
```scss
// Use CSS variables for theming
.container {
  background-color: var(--mui-palette-background-paper);
  padding: 16px;
  border-radius: 8px;
}

.title {
  color: var(--mui-palette-text-primary);
  margin-bottom: 8px;
}

// Or use MUI theme values directly in component with sx prop
```

**Material-UI sx prop for dynamic styling:**
```typescript
<Box
  sx={{
    backgroundColor: 'background.paper',
    color: 'text.primary',
    p: 2,
    borderRadius: 1,
  }}
>
  Content
</Box>
```

**Available MUI Theme Values:**
- Colors: `primary.main`, `secondary.main`, `error.main`, `warning.main`, `success.main`
- Text: `text.primary`, `text.secondary`, `text.disabled`
- Background: `background.default`, `background.paper`
- Spacing: Use `p`, `m`, `px`, `py`, `pt`, `pb`, `pl`, `pr` (1 unit = 8px)
- Typography: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body1`, `body2`, `caption`

### Internationalization (i18n)

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Typography>{t('home.welcome')}</Typography>  // "Welcome to GOman Live"
<Button>{t('common.save')}</Button>   // "Save"
```

**Keys structure:** Managed through the GOman Live application itself
```json
{
  "common": { "save": "Save", "cancel": "Cancel" },
  "home": { "welcome": "Welcome to GOman Live" },
  "translations": { "edit": { "title": "Edit Translation" } }
}
```

**Adding translations:**
1. Add through the GOman Live web interface
2. Or use MCP (Model Context Protocol) integration
3. Use: `t('your.new.key')` in code

### Common Patterns

**Custom Hook:**
```typescript
import { useCallback, useState } from 'react';

export const useLocalizationManagement = () => {
  const [localizations, setLocalizations] = useState<Localization[]>([]);
  
  const addLocalization = useCallback(async (localization: Localization) => {
    try {
      // API call to save localization
      const response = await fetch('/api/localizations', {
        method: 'POST',
        body: JSON.stringify(localization),
      });
      const data = await response.json();
      setLocalizations([...localizations, data]);
    } catch (error) {
      console.error('Failed:', error);
    }
  }, [localizations]);
  
  return { localizations, addLocalization };
};
```

**Dialog Component:**
```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  open, 
  title, 
  onConfirm, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Content here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('common.cancel')}</Button>
        <Button onClick={onConfirm} variant="contained">
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
```

**List Item with memo:**
```typescript
import { memo } from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface LocalizationItemProps {
  localization: Localization;
  onPress: (id: string) => void;
}

export const LocalizationItem = memo<LocalizationItemProps>(
  ({ localization, onPress }) => {
    return (
      <ListItem button onClick={() => onPress(localization.id)}>
        <ListItemText 
          primary={localization.key} 
          secondary={localization.value} 
        />
      </ListItem>
    );
  }
);

LocalizationItem.displayName = 'LocalizationItem';
```

### Performance

**1. Use `memo` for list items:**
```typescript
import { memo } from 'react';

export const LocalizationCard = memo<LocalizationCardProps>(
  ({ localization }) => <Box>...</Box>
);
```

**2. Use `useCallback` for handlers:**
```typescript
const handleClick = useCallback(() => {}, []);  // ✅
const handleClick = () => {};  // ❌ Re-creates on every render
```

**3. Optimize Lists with virtualization:**
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <LocalizationItem item={items[index]} />
    </div>
  )}
</FixedSizeList>
```

**4. Use Redux selectors with memoization:**
```typescript
import { createSelector } from '@reduxjs/toolkit';

const selectLocalizations = (state: RootState) => state.localizations.items;
const selectFilter = (state: RootState) => state.localizations.filter;

export const selectFilteredLocalizations = createSelector(
  [selectLocalizations, selectFilter],
  (localizations, filter) => localizations.filter(l => l.key.includes(filter))
);
```

### Analytics

```typescript
import { useAnalytics } from '@/modules/hooks/useAnalytics';

export const MyComponent = () => {
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    trackEvent('page_view', { page: 'translations' });
  }, []);
  
  const handleSave = () => {
    trackEvent('translation_saved', { 
      key: 'app.title',
      language: 'en',
    });
  };
  
  return <Button onClick={handleSave}>Save</Button>;
};
```

### Error Handling

**Always use try-catch-finally:**
```typescript
const saveLocalization = async (localization: Localization) => {
  try {
    setLoading(true);
    await fetch('/api/localizations', {
      method: 'POST',
      body: JSON.stringify(localization),
    });
  } catch (error) {
    console.error('Failed:', error);
    showNotification({
      type: 'error',
      message: error.message || 'Failed to save',
    });
  } finally {
    setLoading(false);
  }
};
```

**Error Boundary:** Use React Error Boundaries for component error handling

### Testing

**Component test:**
```typescript
import { render, fireEvent } from '@testing-library/react';
import { LocalizationCard } from './LocalizationCard';

it('renders and handles click', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <LocalizationCard 
      localization={mockLocalization} 
      onClick={onClick} 
    />
  );
  
  expect(getByText('app.title')).toBeTruthy();
  fireEvent.click(getByText('app.title'));
  expect(onClick).toHaveBeenCalled();
});
```

**Hook test:**
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalizationManagement } from './useLocalizationManagement';

it('adds localization', async () => {
  const { result } = renderHook(() => useLocalizationManagement());
  
  await act(async () => {
    await result.current.addLocalization(mockLocalization);
  });
  
  expect(result.current.localizations).toHaveLength(1);
});
```

### Code Review Checklist

Before submitting code, ensure:

- [ ] **TypeScript**: All types are properly defined, no `any` types
- [ ] **Material-UI**: Using MUI components appropriately
- [ ] **Styling**: SCSS modules for custom styles, sx prop for dynamic styling
- [ ] **i18n**: All user-facing strings use translations via `t()`
- [ ] **Component Structure**: New components follow folder structure (component folder → index.tsx + .module.scss)
- [ ] **Performance**: Memo, useCallback used where appropriate
- [ ] **Accessibility**: Components have proper ARIA labels and semantic HTML
- [ ] **Error Handling**: Try-catch blocks for async operations
- [ ] **Analytics**: Important user actions are tracked
- [ ] **Testing**: Unit tests written for new features
- [ ] **Documentation**: JSDoc comments for complex functions
- [ ] **Naming**: Consistent naming conventions followed (PascalCase for components, camelCase for functions)
- [ ] **File Organization**: Files in correct directories
- [ ] **Imports**: Grouped and ordered correctly (React, Next.js, third-party, local)
- [ ] **Code Style**: ESLint rules followed
- [ ] **Redux**: Using Redux Toolkit patterns, selectors with memoization

### Common Mistakes

1. **DON'T mutate state:**
   ```typescript
   localizations.push(newItem); setLocalizations(localizations);  // ❌
   setLocalizations([...localizations, newItem]);  // ✅
   ```

2. **Cleanup in useEffect:**
   ```typescript
   useEffect(() => {
     const interval = setInterval(() => {}, 1000);
     return () => clearInterval(interval);  // ✅ cleanup
   }, []);
   ```

3. **DON'T create functions in render:**
   ```typescript
   <List>
     {items.map(item => (
       <ListItem key={item.id} onClick={() => handleClick(item)}>  // ❌
         {item.name}
       </ListItem>
     ))}
   </List>
   
   // Instead use useCallback:
   const handleItemClick = useCallback((item) => {}, []);  // ✅
   ```

4. **Use SCSS modules or MUI sx, not inline styles:**
   ```typescript
   <Box style={{ padding: '16px' }}>Text</Box>  // ❌
   <Box className={styles.container}>Text</Box>  // ✅
   <Box sx={{ p: 2 }}>Text</Box>  // ✅
   ```

5. **Always use translation keys:**
   ```typescript
   <Typography>Save</Typography>  // ❌
   <Typography>{t('common.save')}</Typography>  // ✅
   ```

### Commands

```bash
# Development
npm run dev                                      # Dev server (Next.js)
npm start                                        # Production server

# Code Quality
npm run lint                                     # ESLint

# Building
npm run build                                    # Production build

# Testing (if configured)
npm test                                         # Run tests
npm test -- --watch                              # Watch mode
```

### Resources & Help

- **Docs**: Check existing code in `src/` for patterns
- **Next.js**: https://nextjs.org/docs
- **Material-UI**: https://mui.com/material-ui/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **i18next**: https://www.i18next.com/

---

**Main Rule**: Use Material-UI components with SCSS modules for styling, `useTranslation()` for text, strict TypeScript types, and `memo`/`useCallback` for performance. Follow Redux Toolkit patterns for state management.
