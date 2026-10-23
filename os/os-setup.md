[<- OS](os-quick.md)

## Windows 11
1. Dark Mode
2. Night Light
3. Windows Update
4. Chrome
5. Git
    1. Install git
    2. ssh-keygen -t ed25519 -C "pankaj.corp@gmail.com"
    3. Add above generated public key to GitHub account
    4. ssh -T git@github.com
    5. git config --global user.name "pankaj wakchaure"
    6. git config --global user.email "pankaj.corp@gmail.com"
    7. git config --global pull.rebase false
    8. git config --global init.defaultBranch main
6. Install Node
7. Install VS Code
    1. Settings Sync
    2. Login via GitHub
8. Install Java
9. MiniTool Partition Wizard

---

## Ubuntu Linux Setup
1. Dark Mode
2. Night Light
3. Ubuntu Update
    1. sudo apt update && sudo apt upgrade -y
    2. sudo apt autoremove -y
    3. sudo snap refresh
4. Chrome: Download and install .deb file
5. Git
    1. sudo apt install git
    2. ssh-keygen -t ed25519 -C "pankaj.corp@gmail.com"
    3. Add above generated public key to GitHub account
    4. ssh -T git@github.com
    5. git config --global user.name "pankaj wakchaure"
    6. git config --global user.email "pankaj.corp@gmail.com"
    7. git config --global pull.rebase false
    8. git config --global init.defaultBranch main
6.  Node
    1. sudo apt install nodejs
    2. sudo apt install npm
    3. sudo apt list | grep ^node
    4. sudo apt remove nodejs
7. VS Code (App Center) -> Settings Sync: Login using GitHub
8. Antigravity IDE (App Center)
9. gsettings set org.gnome.shell app-picker-layout "[]"
10. Enable Ubuntu Pro
11. Java : sudo apt install default-jdk
12. IntelliJ (App Center)
13. MySQL
    1. sudo apt install mysql-server
    2. sudo systemctl start mysql
    3. sudo mysql # enter the Ubuntu login password for sudo if prompted
    4. CREATE USER IF NOT EXISTS 'pankaj'@'localhost' IDENTIFIED BY 'root';
    5. ALTER USER 'pankaj'@'localhost' IDENTIFIED BY 'root';
    6. GRANT ALL PRIVILEGES ON *.* TO 'pankaj'@'localhost' WITH GRANT OPTION;
    7. FLUSH PRIVILEGES;
    8. exit
14. Sakila Sample Database
    1. wget https://downloads.mysql.com/docs/sakila-db.tar.gz
    2. tar -xvf sakila-db.tar.gz
    3. cd sakila-db
    4. sudo mysql < sakila-schema.sql
    5. sudo mysql < sakila-data.sql
    6. sudo mysql
    7. SHOW DATABASES;
    8. USE sakila;
    9. SHOW TABLES;
15. DBeaver Community (App Center)
    1. Create new connection to MySQL Server on localhost using user `pankaj` and the password set above
    2. If DBeaver shows `Public Key Retrieval is not allowed`, edit connection -> Driver properties -> set `allowPublicKeyRetrieval=true`
    3. For a local-only connection, also set `useSSL=false` if needed
16. Insomnia (App Center)
17. MongoDB Compass (.deb)
18. Docker Desktop (.deb)
19. Get all installed apps list starting with code
    1. sudo apt list | grep ^code
    2. dpkg -l | grep code

[<- OS](os-quick.md)
