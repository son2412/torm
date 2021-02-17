echo "Changing directory to ~/torm"
cd torm
echo "Pulling from git"
git pull origin dev
echo "Install"
npm install
echo "Build"
npm run build
echo "Restarting pm2 instances"
pm2 restart all