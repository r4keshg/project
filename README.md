#project heimdal



Welcome to fish, the friendly interactive shell
Type help for instructions on how to use fish
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/project (main)> cd Heimdal/
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/Heimdal (main)> cd client
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/client (main)> cd public/
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/c/public (main)> touch login.html
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/c/public (main)> touch index.html
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/c/public (main)> touch style.css
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/c/public (main)> cd ..
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/client (main)> cd ..
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/Heimdal (main)> cd server/
…shg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/server (main)  
sudo systemctl start postgresql
                                                               
sudo systemctl enable postgresql

[sudo] password for rakeshg:    
Synchronizing state of postgresql.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable postgresql
…shg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/server (main)  
sudo -u postgres psql

psql (16.8 (Ubuntu 16.8-0ubuntu0.24.04.1))
Type "help" for help.

postgres=# -- Create a new user
CREATE USER heimdal_user WITH PASSWORD 'heimdal123';

-- Create a new database
CREATE DATABASE heimdal_db;

-- Grant access
GRANT ALL PRIVILEGES ON DATABASE heimdal_db TO heimdal_user;
\q
CREATE ROLE
CREATE DATABASE
GRANT
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/server (main)> sudo -u postgres psql
 -d heimdal_db

psql (16.8 (Ubuntu 16.8-0ubuntu0.24.04.1))
Type "help" for help.

heimdal_db=# CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pan_aadhar TEXT NOT NULL,
  vehicle_type TEXT,
  vehicle_no TEXT,
  intime TIME,
  duration INTEGER,
  date_of_visit DATE,
  status TEXT DEFAULT 'not complete',
  approved BOOLEAN DEFAULT FALSE
\q
CREATE TABLE
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/server (main)> mkdir heimdal-server 
&& cd heimdal-server
                                                                  npm init -y
                                                                  npm install express p
g body-parser

Wrote to /home/rakeshg/project/Heimdal/server/heimdal-server/package.json:

{
  "name": "heimdal-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}




added 80 packages, and audited 81 packages in 5s

14 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main)> sudo systemctl start postgresql

…g-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main)  
cd heimdal-server
                                                               
node index.js

cd: The directory 'heimdal-server' does not exist
/home/rakeshg/project/Heimdal/heimdal-server/node_modules/router/index.js:392
      throw new TypeError('argument handler must be a function')
      ^

TypeError: argument handler must be a function
    at Function.use (/home/rakeshg/project/Heimdal/heimdal-server/node_modules/router/index.js:392:13)
    at Function.<anonymous> (/home/rakeshg/project/Heimdal/heimdal-server/node_modules/express/lib/application.js:222:21)
    at Array.forEach (<anonymous>)
    at Function.use (/home/rakeshg/project/Heimdal/heimdal-server/node_modules/express/lib/application.js:219:7)
    at Object.<anonymous> (/home/rakeshg/project/Heimdal/heimdal-server/index.js:12:5)
    at Module._compile (node:internal/modules/cjs/loader:1529:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Module._load (node:internal/modules/cjs/loader:1096:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)

Node.js v20.19.0
…-Pavilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main) [1]  
npm install express pg body-parser


up to date, audited 81 packages in 811ms

14 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
…g-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main)  
npde index.js
Command 'npde' not found, did you mean:
  command 'npd6' from deb npd6 (1.1.0-5)
  command 'node' from deb nodejs (18.13.0+dfsg1-1ubuntu2)
Try: sudo apt install <deb name>
…avilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main) [127]  
node index.js
Server running at http://localhost:3000
Error: ENOENT: no such file or directory, stat '/home/rakeshg/project/Heimdal/public/index.html'
^C⏎                                            
…g2xxx ~/p/H/s/heimdal-server (main) [SIGINT]  
node index.js
Server running at http://localhost:3000
error: permission denied for table visitors
    at /home/rakeshg/project/Heimdal/heimdal-server/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /home/rakeshg/project/Heimdal/heimdal-server/routes.js:22:20
error: permission denied for table visitors
    at /home/rakeshg/project/Heimdal/heimdal-server/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /home/rakeshg/project/Heimdal/heimdal-server/routes.js:22:20
^C⏎                                            
…g2xxx ~/p/H/s/heimdal-server (main) [SIGINT]  
sudo -u postgres psql
psql (16.8 (Ubuntu 16.8-0ubuntu0.24.04.1))
Type "help" for help.

postgres=# \c heimdal_db
You are now connected to database "heimdal_db" as user "postgres".
heimdal_db=# GRANT SELECT, INSERT,UPDATE, DELETE ON visitors TO heimdal_user;
GRANT
heimdal_db=# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO heimdal_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO heimdal_user;
GRANT
GRANT
heimdal_db=# \q
…ptop-15-eg2xxx ~/p/H/s/heimdal-server (main)  
sudo systemctl restart postgresql
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/s/heimdal-server (main)> node index.js
Server running at http://localhost:3000
^A

Welcome to fish, the friendly interactive shell
Type help for instructions on how to use fish
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/project (main)> cd Heimd
al/
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/Heimdal (main)> cd hei
mdal-server/
…shg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/heimdal-server (main)  
psql
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "rakeshg" does not exist
…op-15-eg2xxx ~/p/H/heimdal-server (main) [2]  
sudo -u postgres psql -d heimdal_db
[sudo] password for rakeshg:    
psql (16.8 (Ubuntu 16.8-0ubuntu0.24.04.1))
Type "help" for help.

heimdal_db=# select * from visitors
heimdal_db-# select * from visitors;
ERROR:  syntax error at or near "select"
LINE 2: select * from visitors;
        ^
heimdal_db=# SELECT * FROM visitors;
heimdal_db=# delete from visitors where id = 1;
DELETE 0
heimdal_db=# delete * from visitors;
ERROR:  syntax error at or near "*"
LINE 1: delete * from visitors;
               ^
heimdal_db=# alter table visitors add column purpose text;
ALTER TABLE
heimdal_db=# \q
rakeshg@rakeshg-HP-Pavilion-Laptop-15-eg2xxx ~/p/H/heimdal-server (main)> sudo -u postgres psql -d heimdal_db
[sudo] password for rakeshg:    
psql (16.8 (Ubuntu 16.8-0ubuntu0.24.04.1))
Type "help" for help.

heimdal_db=# delete from visitors where id =1,2,3,4,5;
ERROR:  syntax error at or near ","
LINE 1: delete from visitors where id =1,2,3,4,5;
                                        ^
heimdal_db=# delete from visitors where id = '1','2','3','4','5';
ERROR:  syntax error at or near ","
LINE 1: delete from visitors where id = '1','2','3','4','5';
                                           ^
heimdal_db=# DELETE FROM visitors WHERE id IN (1, 2, 3, 4, 5);
DELETE 0
heimdal_db=# SELECT setval('visitors_id_seq', COALESCE((SELECT MAX(id) FROM visitors), 1), false);
 setval 
--------
      1
(1 row)

heimdal_db=# SELECT id, name FROM visitors;
 id | name 
----+------
(0 rows)

heimdal_db=# SELECT * FROM visitors;
 id | name | pan_aadhar | vehicle_type | vehicle_no | intime | duration | date_of_visit | status | approved | purpose 
----+------+------------+--------------+------------+--------+----------+---------------+--------+----------+---------
(0 rows)

heimdal_db=# 