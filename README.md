# fitness-app-by-db
⚠️ Note: This project is currently in early development. The structure, features, and implementation are subject to change as the application evolves.

📌 Overview
This application is designed to collect, process, and analyze fitness activity data - with a focus on running, but adaptable to other activities such as cycling, walking, and workouts. It aims to provide meaningful insights like distance covered, calories burned, activity duration, and route patterns.

🛠️ Technologies Used
Python – for data processing and backend logic
PostgreSQL – for structured data storage and querying
JavaScript – for dynamic frontend interactions
HTML & CSS – for user interface and styling

📂 Planned Workflow
1. Database Creation
  Store .fit files in a dedicated folder
  Use a Python script to convert .fit files to .csv
  Create a PostgreSQL database using the processed data

2. Data Extraction & Analysis
  Calculate key metrics:
    Maximum and average distance (weekly, monthly, yearly)
    Calories burned (daily, weekly, monthly, yearly)
    Most frequent routes (possibly visualized via GPS hologram or map)
    Activity categories (running, cycling, gym, etc.)
  Average and total duration of activities
  Enable filtering and selection based on time periods and activity types

3. Data Visualization
  Present all metrics in a clean and interactive dashboard
  Use charts, graphs, and maps to enhance user experience

4. New File Upload & Reprocessing
  Allow users to upload new .fit files
  Automatically process and update the database and visualizations

5. Additional Features
  More ideas will be added during development as needed

📈 Goals
Provide users with a clear overview of their physical activity
Help track progress and identify patterns
Make data exploration intuitive and visually appealing
