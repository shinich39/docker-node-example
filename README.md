# docker-node-example

docker, nginx, nodejs, mongodb, mongo-express(GUI), tfjs-node

## Getting Started

### Build

- win

```sh
git clone https://github.com/shinich39/docker-node-example new-docker-compose && cd new-docker-compose && rm -r -Force .git && cd ..
```

- mac

```sh
git clone https://github.com/shinich39/docker-node-example new-docker-compose && cd new-docker-compose && rm -rf .git && cd ..
```

### Edit files

- ./nginx/nginx.conf
- ./docker-compose.yml
- ./node/

### Install on AWS EC2 (Amazon Linux)

```sh
sudo yum update -y
sudo yum install -y docker

sudo systemctl start docker
sudo systemctl enable docker

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker $USER
sudo service docker restart

sudo yum install -y git 
git config --global credential.helper store

cd /home/ec2-user
git clone https://github.com/shinich39/docker-node-example miku
# git clone https://shinich39:<ACCESS_TOEKN>@github.com/shinich39/docker-node-example.git miku
cd miku

sudo docker-compose up -d --build
sudo docker-compose logs -f
# check logs...

sudo cp startup.service /etc/systemd/system/miku.service
sudo systemctl daemon-reload
sudo systemctl start miku
sudo systemctl enable miku
sudo systemctl status miku
```

### Install on AWS EC2 (Ubuntu)

```sh
sudo apt update -y
sudo apt install -y docker.io

sudo systemctl start docker
sudo systemctl enable docker

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker $USER
sudo service docker restart

sudo apt install -y git 
git config --global credential.helper store

cd /home/ec2-user
git clone https://github.com/shinich39/docker-node-example miku
# git clone https://shinich39:<ACCESS_TOEKN>@github.com/shinich39/docker-node-example.git miku
cd miku

sudo docker-compose up -d --build
sudo docker-compose logs -f
# check logs...

sudo cp startup.service /etc/systemd/system/miku.service
sudo systemctl daemon-reload
sudo systemctl start miku
sudo systemctl enable miku
sudo systemctl status miku
```

## Rebuild after update github repo

```sh
# /home/ec2-user/miku
cd node && git pull && cd .. && sudo docker-compose up -d --build
```

## journalctl

```sh 
# Print live tail Logs
journalctl -fu miku.service
# Print last logs
journalctl -xeu miku.service
```

## Docker

```sh
# show containers
docker ps

# show images
docker images

# attach to existing shell
docker attach \<CONTAINER\>
docker attach --sig-proxy=false \<CONTAINER\> 

# attach to new shell
docker exec -it \<CONTAINER\> /bin/sh
docker exec -it \<CONTAINER\> /bin/bash

# remove all dangling images 
docker image prune

# remove all stopped containers
docker container prune

# remove all containers
docker rm -v -f $(docker ps -qa)

# remove all images
docker image remove -f $(docker images -a -q)

# local hostname in container(NOT localhost, 127.0.0.1)
host.docker.internal
```

## Docker Compose

```sh
docker-compose up -d

docker-compose down
docker-compose restart
docker-compose logs -f

# rebuild when file changes
docker-compose up -d --build
```

## Trouble Shooting

- Permission denied on macbook after run docker-compose with sudo in Mac OS

```sh
sudo chown -R $(whoami) ~/.docker
```

- Could not detach from docker process in Mac OS

```sh
docker attach --sig-proxy=false <container id|name>
# The use Ctrl + C to detach
```

## References

- [docker-compose](https://docs.docker.com/compose/)
- [docker-node](https://hub.docker.com/_/node)
- [docker-mongo](https://hub.docker.com/_/mongo)
- [docker-mongo-express](https://hub.docker.com/_/mongo-express)
- [docker-nginx](https://hub.docker.com/_/nginx)
- [journalctl](https://www.commandlinux.com/man-page/man1/journalctl.1.html)