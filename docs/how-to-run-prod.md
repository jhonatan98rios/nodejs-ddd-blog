# Running on EC2

## Installing docker

```sh
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```

## Make docker auto-start

`sudo chkconfig docker on`

## Installing git

`sudo yum install -y git`

## Restarting

`sudo reboot`

## docker-compose install

`sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`

## docker-compose update

`sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`

## Changing the permissions: 

`sudo chmod +x /usr/local/bin/docker-compose`

## Verify success: 

`docker-compose version`