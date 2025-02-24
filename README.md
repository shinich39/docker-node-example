# docker-node-example

docker, nginx, nodejs, mongodb, mongo-express(GUI), tfjs-node

## AWS EC2

#### Basic usage on Amazon Linux

```sh
sudo yum update -y
sudo yum install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
sudo service docker restart
git clone https://github.com/shinich39/docker-node-example miku
cd miku
sudo cp startup.service /etc/systemd/system/miku.service
sudo systemctl daemon-reload
sudo systemctl enable miku
sudo systemctl start miku
journalctl -fu miku.service

# update
cd miku
git pull
sudo docker-compose up -d --build
```

1. Install docker on EC2

```sh
# update package manager
sudo yum update -y  # Amazon Linux
sudo apt update -y  # Ubuntu

# install docker
sudo yum install -y docker     # Amazon Linux
sudo apt install -y docker.io  # Ubuntu

# start & enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# add EC2 user to docker group
sudo usermod -aG docker $USER

# apply EC2 user
sudo service docker restart
```

2. Install git

```sh
# install git
sudo yum install -y git # Amazon Linux
sudo apt install -y git # Ubuntu

# clone repo to /home/ec2-user/miku
# startup.service WorkingDirectory is set to /home/ec2-user/miku
cd /home/ec2-user
git clone https://github.com/shinich39/docker-node-example miku
# git clone https://<USERNAME>:<ACCESS_TOEKN>@github.com/shinich39/docker-node-example.git miku
cd miku
```

3. Test docker-compose

```sh
sudo docker-compose up -d --build
```

4. Auto start on boot

```sh
sudo cp startup.service /etc/systemd/system/miku.service
sudo systemctl daemon-reload
sudo systemctl enable miku
sudo systemctl start miku
sudo systemctl status miku

# https://www.commandlinux.com/man-page/man1/journalctl.1.html
#  Print live tail Logs
journalctl -fu miku.service
# Print last logs
journalctl -xeu miku.service
```

## Docker

```sh
# attach to existing shell
docker attach <container id|name>
docker attach --sig-proxy=false <container id|name> 

# attach to new shell
docker exec -it <container id|name> /bin/sh
docker exec -it <container id|name> /bin/bash

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
sudo docker-compose up -d

sudo docker-compose down
sudo docker-compose restart
sudo docker-compose logs -f

# update(rebuild)
sudo docker-compose up -d --build
```

## Trouble Shootings

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