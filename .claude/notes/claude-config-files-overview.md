# Claude Config Files Overview

| File | What was added | Purpose |
|---|---|---|
| [agents/api-designer.json](../agents/api-designer.json) | Agent that designs Express REST contracts matching the mock API | Used when you need to plan or review API endpoints before implementing them in the server |
| [agents/db-architect.json](../agents/db-architect.json) | Agent that designs Supabase/Postgres migrations from the domain types | Used when creating or modifying database tables to keep schema in sync with TypeScript types |
| [agents/security-auditor.json](../agents/security-auditor.json) | Agent that audits code for OWASP Top 10 issues | Used to review code changes for vulnerabilities before pushing to production |
| [agents/test-generator.json](../agents/test-generator.json) | Agent that writes Vitest + RTL tests following the feature-folder pattern | Used to generate test files for new features or components automatically |
| [agents/ui-engineer.json](../agents/ui-engineer.json) | Agent that builds MUI v9 components following frontend-style rules | Used when scaffolding new UI components to ensure they follow project conventions |
| [hooks/post-edit-lint.js](../hooks/post-edit-lint.js) | Runs ESLint `--fix` on any TypeScript file Claude edits | Automatically keeps code style clean after every edit without manual intervention |
| [hooks/pre-edit-check.sh](../hooks/pre-edit-check.sh) | Blocks Claude from editing `.env` files | Prevents accidental exposure or overwrite of sensitive environment variables |
| [hooks/test-runner.sh](../hooks/test-runner.sh) | Runs Vitest on a test file after Claude edits it | Gives instant feedback on whether a test passes right after Claude writes or modifies it |
| [rules/database.md](../rules/database.md) | Supabase schema, migration conventions, and SQL rules | Keeps Claude consistent when generating migrations — correct types, naming, and structure every time |
| [rules/backend-style.md](../rules/backend-style.md) | Express structure, route conventions, and env var rules | Ensures Claude follows the same patterns for every new route or middleware it writes |
| [rules/testing.md](../rules/testing.md) | Vitest/RTL test patterns for both frontend and backend | Guides Claude to write tests that match the project's mocking strategy and assertion style |