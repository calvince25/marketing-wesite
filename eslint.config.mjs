import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy server files not part of Next.js build
    "legacy/**",
  ]),
  {
    rules: {
      // These are widespread in the existing codebase and pre-existing pages.
      // Downgrade to warn to avoid blocking the build; new files should still avoid any.
      "@typescript-eslint/no-explicit-any": "warn",

      // Content strings in JSX naturally contain apostrophes and quotes — cosmetic only.
      "react/no-unescaped-entities": "off",

      // Sanity schema files use anonymous default exports by convention.
      "import/no-anonymous-default-export": "off",

      // Allow require() in legacy .js test files (only .ts/.tsx enforce ESM).
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
]);

export default eslintConfig;
