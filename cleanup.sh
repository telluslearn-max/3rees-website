#!/bin/bash
echo "Checking for unused Button..."
if ! grep -r "import.*Button" --include="*.tsx" app/ components/sections/ | grep -v "Button.tsx"; then
  echo "No imports found, deleting Button.tsx"
  rm components/ui/Button.tsx
fi

echo "Checking for unused Badge..."
if ! grep -r "import.*Badge" --include="*.tsx" app/ components/sections/ | grep -v "Badge.tsx"; then
  echo "No imports found, deleting Badge.tsx"
  rm components/ui/Badge.tsx
fi

echo "Cleaning types..."
rm -f types/customPlan.ts

echo "Done!"
