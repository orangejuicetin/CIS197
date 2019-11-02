# Developed by Cameron Cabo
echo "Compiling assets for submission and testing..."
echo "================================================"

# Remove existing compiled files
rm -rf compiled

# Scaffold compiled build folders
echo "Scaffolding directories..."
mkdir compiled
mkdir compiled/seeds
mkdir compiled/actions
mkdir compiled/reducers
echo "Finished scaffolding directories."

# Compile JS files via babel
echo "Compiling JavaScripts..."
babel public/components/*.jsx -d compiled/components/
babel public/actions/*.js -d compiled/actions/
babel public/reducers/*.js -d compiled/reducers/
babel public/main.jsx -d compiled/
babel public/*.js -d compiled/

# JSON does not need to be transpiled
cp -rf public/seeds/ compiled/seeds/
echo "Finished compiling JavaScripts."

echo "Compiling tests..."
babel test/*.jsx -d test/
echo "Finished compiling tests."

echo "================================================"
echo "Finished compiling assets."
