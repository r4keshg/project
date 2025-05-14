import os

# Define the base project name and structure
project_name = "Vallet"

folders = [
    f"{project_name}/client/public",
    f"{project_name}/client/src/components",
    f"{project_name}/client/src/pages",
    f"{project_name}/client/src/redux/slices",
    f"{project_name}/client/src/assets",
    f"{project_name}/client/src/utils",
    f"{project_name}/client/src/services",
    f"{project_name}/client/src/layouts",
    f"{project_name}/server/controllers",
    f"{project_name}/server/routes",
    f"{project_name}/server/models",
    f"{project_name}/server/middleware",
    f"{project_name}/server/config",
]

files = [
    f"{project_name}/client/src/main.jsx",
    f"{project_name}/client/src/App.jsx",
    f"{project_name}/client/src/index.css",
    f"{project_name}/client/tailwind.config.js",
    f"{project_name}/client/postcss.config.js",
    f"{project_name}/client/vite.config.js",
    f"{project_name}/server/index.js",
    f"{project_name}/server/.env.example",
    f"{project_name}/README.md"
]

# Create folders and files
for folder in folders:
    os.makedirs(folder, exist_ok=True)

for file in files:
    with open(file, 'w') as f:
        f.write("")

project_name
