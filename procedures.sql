-- 1. Total Sales within a Date Range
CREATE OR REPLACE FUNCTION get_total_sales(start_date DATE, end_date DATE)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC := 0;
BEGIN
    SELECT SUM(od.quantity * p.unit_price)
    INTO total
    FROM order_details od
    JOIN orders o ON od.order_id = o.order_id
    JOIN products p ON od.product_id = p.product_id
    WHERE o.order_date BETWEEN start_date AND end_date;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

-- 2. All Orders by a Specific Customer
CREATE OR REPLACE FUNCTION get_customer_orders(cid INT)
RETURNS TABLE(order_id VARCHAR, order_date TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    SELECT o.order_id, o.order_date
    FROM orders o
    WHERE o.customer_id = cid;
END;
$$ LANGUAGE plpgsql;

-- 3. Top N Best-Selling Products
CREATE OR REPLACE FUNCTION get_top_selling_products(limit_num INT)
RETURNS TABLE(product_id VARCHAR, name TEXT, total_quantity INT) AS $$
BEGIN
    RETURN QUERY
    SELECT p.product_id, p.name, SUM(od.quantity) as total_quantity
    FROM order_details od
    JOIN products p ON od.product_id = p.product_id
    GROUP BY p.product_id, p.name
    ORDER BY total_quantity DESC
    LIMIT limit_num;
END;
$$ LANGUAGE plpgsql;

-- 4. Average Order Value
CREATE OR REPLACE FUNCTION get_average_order_value()
RETURNS NUMERIC AS $$
DECLARE
    avg_value NUMERIC := 0;
BEGIN
    SELECT AVG(order_total) INTO avg_value
    FROM (
        SELECT o.order_id, SUM(od.quantity * p.unit_price) AS order_total
        FROM orders o
        JOIN order_details od ON o.order_id = od.order_id
        JOIN products p ON od.product_id = p.product_id
        GROUP BY o.order_id
    ) AS totals;

    RETURN COALESCE(avg_value, 0);
END;
$$ LANGUAGE plpgsql;
