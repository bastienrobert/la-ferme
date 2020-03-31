# La Ferme

La Ferme is a mobile-app board game to denounce issues of everyday life.

## Install

Check **README.md** in both packages:

- [mobile](packages/mobile/README.md)
- [server](packages/server/README.md)
- [components](packages/components/README.md)

## Getting started

### Mobile

Use **yarn** as package manager. Then:

```
yarn
```

Launch the application using:

```
yarn dev
```

Or use your device as debugger using the **xcworkspace**

### Server

```
yarn server
```

Server and iOS simulator should open.

## Managing dependencies

To manage dependencies, please use the following command:

```
yarn lerna add YOUR_DEPENDENCY --scope=@la-ferme/TARGET
```

You should add dependency one by one until [this issue](https://github.com/lerna/lerna/issues/2004) has been reseolved.

Or you can add your packages using the `yarn add` command in the targetted package dir, but you should run `lerna clean`, `rm -rf node_modules` and `yarn` at root.

## Workspaces

This repo is using Yarn Workspaces. Please see more [here](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#how-can-i-use-autolinking-in-a-monorepo) about autolinking a monorepo with yarn workspaces.

To fix simlinks we used this solution [on facebook metro #1 issue](https://github.com/facebook/metro/issues/1#issuecomment-527863738).
