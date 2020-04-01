# Install

Copy `.env.sample` as `.env` and setup your environment variables.

Start postgresql:

```
brew services start postgresql
```

and create database:

```
psql postgres
# CREATE DATABASE laferme;
# \q
```

if it's a clean install, don't forget to create a user:
_this is not recommanded for production_

```
psql postgres
# CREATE USER root WITH SUPERUSER;
# \q
```
