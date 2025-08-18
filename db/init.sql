CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (name REGEXP '^[A-Za-zÁ-ú ]+$'),
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email REGEXP '^[^@]+@[^@]+\\.[^@]{2,}$'),
  password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8),
  phone VARCHAR(20) CHECK (phone REGEXP '^[0-9+() -]{8,20}$'),
  address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, phone, address)
SELECT 'Alice', 'alice@example.com', 'abcdefgh', '12775984','avv 1, calle 1, estado anzoategui'
FROM dual
WHERE NOT EXISTS (SELECT 1 FROM users LIMIT 1)