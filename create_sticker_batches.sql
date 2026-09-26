CREATE TABLE IF NOT EXISTS sticker_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT,
    product_name TEXT,
    warranty_duration TEXT,
    manufacturing_date TEXT,
    quantity INTEGER,
    prefix_key TEXT,
    start_sequence INTEGER,
    end_sequence INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE sticker_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public full access to sticker_batches"
ON sticker_batches
FOR ALL
TO public
USING (true)
WITH CHECK (true);
