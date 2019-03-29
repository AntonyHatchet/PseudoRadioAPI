# rickandmorty

Challenge project for draewil

## Requirments

- Node.js v10.15.0 or higher
- yarn 1.13.0 or higher

## Run Dev-mode

`yarn && yarn start:dev`

After a build finished, you can find the result on localhost:3001.

## Build

`yarn && yarn build`

The result can be found on the 'dist' directory.

## API methods

All API methods available on localhost:3001 after server has started.

### [GET] /

This is a root directory, you can find some info about available routes.

#### Response schema

`{ routes: { <key>: <string>, ... } }`

#### Request exapmle

`http://localhost:3001`

#### Response example

`{routes: { "/": "You are here now =)", "/playlist": "This route will return 10 random tracks.", "/playlist/:count": "This route will return a playlist with requested count tracks", "/playlist/shortest/:duration": "This route will return the shortest count of tracks playlist, in a given duration." }}`

### [GET] /playlist

This route will return 10 chain sorted tracks.

#### Response schema

`[ <string>, <string> ]`

#### Request exapmle

`http://localhost:3001/playlist`

#### Response example

`[ "While We're In Love", "Evenstar (Featuring Isabel Bayrakdarian)" ]`

### [GET] /playlist/:count

This route will return a playlist with requested count tracks

#### Response schema

`[ <string>, <string> ]`

#### Request exapmle

`http://localhost:3001/playlist/2`

#### Response example

`[ "While We're In Love", "Evenstar (Featuring Isabel Bayrakdarian)" ]`

### [GET] /playlist/shortest/:duration

This route will return the shortest count of tracks playlist, in a given minutes duration.

#### Response schema

`[ { name: <string>, diration: <number> // in milliseconds } ]`

#### Request exapmle

`http://localhost:3001/playlist/shortest/10`

#### Response example

`[ { "name": "Venus, The Bringer of Peace", "duration": 518687 }, { "name": "Easy Flyer", "duration": 77647 } ]`
