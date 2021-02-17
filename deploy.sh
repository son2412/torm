echo "Changing directory to ~/torm"
cd torm
echo "Pulling from git"
git pull
echo "Install"
npm install
echo "Restarting pm2 instances"
pm2 restart all