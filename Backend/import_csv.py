import sqlite3
import csv

# Connect to SQLite database
conn = sqlite3.connect('Data/vulnerabilities.db')
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''
    CREATE TABLE IF NOT EXISTS vulnerabilities (
        id TEXT PRIMARY KEY,
        product_name TEXT,
        oem_name TEXT,
        description TEXT,
        security_score REAL,
        severity_level TEXT,
        published_date TEXT
    )
''')

# Open the CSV file and insert data
with open('Data/vulnerabilities.csv', 'r', encoding='utf-8') as file:
    reader = csv.reader(file)
    next(reader)  # Skip header row
    for row in reader:
        cursor.execute('''
            INSERT INTO vulnerabilities (id, product_name, oem_name, description, security_score, severity_level, published_date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', row)

# Commit and close
conn.commit()
conn.close()

print("CSV data successfully imported into SQLite!")
