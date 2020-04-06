# La Ferme - Server

This package contains the server application using GraphQL and PostgreSQL.

## Install

Check **INSTALL.md**

## Getting started

Use **yarn** as package manager.

Start postgresql:

```
brew services start postgresql
```

Then:

```
yarn
yarn dev
```

## Debug

You can open node devtools in chrome following [this URL](chrome://inspect/#devices) when dev server starts.

## GraphQL playground

You can access to the GraphQL playground at `http://localhost:4000`. However, you should be able to authenticate using the HTTP headers tab and set your auth params in it.

## Knex and GraphQL

Here is a cool cheatsheet to use [knex](https://devhints.io/knex) and [graphql](https://devhints.io/graphql).
