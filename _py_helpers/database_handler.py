""""
Handles database connections and operations.

Requires the psycopg2 library for PostgreSQL database interactions.
    Install via pip: pip install psycopg2
        Pre-condition: Ensure PostgreSQL development libraries are installed on your system.
            For Debian/Ubuntu: sudo apt-get install libpq-dev
Requires pandas for CSV handling.
    Install via pip: pip install pandas
"""

import os
import pandas as pd
import psycopg2
from db_helpers import get_db_credentials

ISOLATION_LEVEL_AUTOCOMMIT = psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT

class DatabaseHandler:

    def __init__(self):
        self.connected = False
        self.connection = None
        self.cursor = None

    def connect(self, dbname, user, password, host='localhost', port=5432):
        """Establishes a connection to the PostgreSQL database."""
        try:
            self.connection = psycopg2.connect(
                dbname=dbname,
                user=user,
                password=password,
                host=host,
                port=port
            )
            self.connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            self.cursor = self.connection.cursor()
            self.connected = True
            print("Database connection established.")
            self.store_csv_into_database()

        except Exception as e:
            print(f"Failed to connect to the database: {e}")

    def store_csv_into_database(self, csv_data_path='./_data/csv-files/'):
        """Stores CSV data into the database."""
        if not self.connected:
            print("Not connected to any database.")
            return

        for csv_file in os.listdir(csv_data_path):
            if csv_file.endswith('.csv'):
                workout = csv_file.split('-')[-1].replace('.csv', '')
                schema_name = f"{workout}_data".lower().replace(' ', '_')
                table_name = csv_file.split(f"-{workout}")[0]
                workout = workout.lower().replace(' ', '_')
                df = pd.read_csv(os.path.join(csv_data_path, csv_file))

                # Create schema if it doesn't exist
                self.cursor.execute(f"CREATE SCHEMA IF NOT EXISTS {schema_name};")

                # Dynamically create table based on DataFrame (CSV) columns
                columns = df.columns
                column_defs = ', '.join([f'"{col}" TEXT' for col in columns])
                self.cursor.execute(f"""CREATE TABLE IF NOT EXISTS {schema_name}."{table_name}" \
                                    (id SERIAL PRIMARY KEY, {column_defs});""")
                
                # Add missing columns if any
                self.cursor.execute(f"""SELECT column_name FROM information_schema.columns \
                                    WHERE table_name=%s AND table_schema=%s;""", \
                                        (table_name, schema_name.lower()))
                existing_columns = {row[0] for row in self.cursor.fetchall()}
                for col in columns:
                    if col not in existing_columns:
                        self.cursor.execute(f'ALTER TABLE {schema_name}."{table_name}" \
                                            ADD COLUMN "{col}" TEXT;')
                
                # Insert data into the table (rows)
                quoted_columns = [f'"{col}"' for col in columns]
                for _, row in df.iterrows():
                    values = [str(row[col]) for col in columns]
                    placeholders = ', '.join(['%s'] * len(values))
                    self.cursor.execute(f"""INSERT INTO {schema_name}."{table_name}" \
                                        ({', '.join(quoted_columns)}) VALUES ({placeholders})""", values)
                    
                print(f'📩 Stored {csv_file} into table {schema_name}."{table_name}"')

        self.connection.commit()
        self.disconnect()

    def disconnect(self):
        """Closes the database connection."""
        if self.connected:
            self.cursor.close()
            self.connection.close()
            self.connected = False
            print("Database connection closed.")

if __name__ == "__main__":
    db_handler = DatabaseHandler()
    db_credentials = get_db_credentials()
    if db_credentials:
        db_handler.connect(**db_credentials)
