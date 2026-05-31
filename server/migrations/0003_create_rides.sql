-- UP
CREATE TABLE rides (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fare       NUMERIC(10,2) NOT NULL,
  timestamp  TIMESTAMPTZ NOT NULL,
  note       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- DOWN
DROP TABLE IF EXISTS rides;
