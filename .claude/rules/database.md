## Database

Target: **Supabase (Postgres)**.

### Migrations

- Place SQL migration files in `server/migrations/` named `NNNN_description.sql` (e.g. `0001_create_bills.sql`).
- Every migration must have an **UP** section and a **DOWN** (rollback) section.
- Use `snake_case` for all table and column names.
- All tables must include `created_at TIMESTAMPTZ NOT NULL DEFAULT now()` and `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`.
- Use `UUID` primary keys (`id UUID PRIMARY KEY DEFAULT gen_random_uuid()`).

### Schema (target state)

Derived from the TypeScript domain types in `src/types/`:

**bills**
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| name | text | not null |
| amount_monthly | numeric(10,2) | not null |
| due_day | int | 1–31 |
| paid_months | text[] | array of YYYY-MM keys |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**boundaries** (finance target)
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| amount | numeric(10,2) | not null |
| period | text | 'daily' \| 'weekly' \| 'monthly' |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**rides**
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| fare | numeric(10,2) | not null |
| timestamp | timestamptz | not null |
| created_at | timestamptz | |

### Rules

- Never run `DROP TABLE`, `TRUNCATE`, or data-mutating SQL via Claude — the `guard-sql.ps1` hook blocks this automatically.
- All monetary values are stored as `numeric(10,2)` (PHP ₱). No multi-currency support.