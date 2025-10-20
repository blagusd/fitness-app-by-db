"""
Helper functions for database operations, e.g. including GUI prompts for credentials.
If using Linux, ensure that tkinter is installed on your system.
    For Debian/Ubuntu: sudo apt-get install python3-tk
"""

import tkinter as tk
from tkinter import simpledialog

def get_db_credentials():
    root = tk.Tk()
    #root.withdraw()  # Hide the main window
    root.title("Database Setup")

    # Entry fields
    db_name = tk.Entry(root)
    user = tk.Entry(root)
    password = tk.Entry(root, show='*')
    host = tk.Entry(root)
    port = tk.Entry(root)

    credentials = {}

    def submit():
        credentials['dbname'] = db_name.get()
        credentials['user'] = user.get()
        credentials['password'] = password.get()
        credentials['host'] = host.get() or 'localhost'
        credentials['port'] = int(port.get()) if port.get() else 5432
        root.destroy()

    def cancel():
        credentials.clear()
        root.destroy()

    # Labels and entries for database credentials
    tk.Label(root, text="Database name").grid(row=0, column=0, padx=10, pady=5)
    db_name.grid(row=0, column=1, padx=10, pady=5)

    tk.Label(root, text="Username").grid(row=1, column=0, padx=10, pady=5)
    user.grid(row=1, column=1, padx=10, pady=5)

    tk.Label(root, text="Password").grid(row=2, column=0, padx=10, pady=5)
    password.grid(row=2, column=1, padx=10, pady=5)

    tk.Label(root, text="Host (default: localhost)").grid(row=3, column=0, padx=10, pady=5)
    host.grid(row=3, column=1, padx=10, pady=5)

    tk.Label(root, text="Port (default: 5432)").grid(row=4, column=0, padx=10, pady=5)
    port.grid(row=4, column=1, padx=10, pady=5)

    # Submit button
    tk.Button(root, text="Submit", command=submit).grid(row=5, column=0, columnspan=2, pady=10)
    tk.Button(root, text="Cancel", command=cancel).grid(row=5, column=1, columnspan=2, pady=10)

    root.mainloop()
    return credentials if credentials else None

