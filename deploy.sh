#! /bin/bash
echo "Install dependencies"
npm install --production --silent

echo "Deactivate CI"
unset CI

echo "Build"
npm run build

echo "Zipping and server upload"
zip -r /tmp/your_life.zip . -x node_modules\*
scp -r /tmp/your_life.zip $HOST_PROD_USER@$HOST_PROD_IP:/home/Projects/your_life.zip

ssh $HOST_PROD_USER@$HOST_PROD_IP 'cd /home/Projects; sudo rm -rf your_life; unzip -o your_life.zip -d your_life;'

echo "Stash, pull and build"
ssh $HOST_PROD_USER@$HOST_PROD_IP 'cd /home/Projects/your_life; sudo docker-compose -f docker-compose.yml up -d --build;'

echo "Remove zip and folder"
ssh $HOST_PROD_USER@$HOST_PROD_IP 'cd /home/Projects; rm -rf your_life.zip; rm -rf your_life;'

echo "Removing orphan images"
ssh $HOST_PROD_USER@$HOST_PROD_IP 'sudo docker rmi -f $(sudo docker images -a -q --filter "dangling=true")'
ssh $HOST_PROD_USER@$HOST_PROD_IP 'sudo docker rm $(sudo docker ps -a -q --filter status=exited)'

echo "Success"

exit 0