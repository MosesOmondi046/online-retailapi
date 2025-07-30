--trigger function that sets last_updated to the current timestamp on UPDATE:
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--the trigger that uses this function:
CREATE TRIGGER trg_update_last_updated
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();

-- DEMONSTRATION
UPDATE products
SET unit_price = 399.99
WHERE product_id = 'P20003';

-- Checking
SELECT name, unit_price, last_updated
FROM products
WHERE product_id = 'P20003';