SELECT products.name
FROM products JOIN users ON seller_id = users.id
WHERE sold = 'false';
