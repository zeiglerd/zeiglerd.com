# zeiglerd/zeiglerd.com



## zeiglerd/php-engine library

More information about this project can be found in `./vendor/zeiglerd/php-engine/README.md`.



## Setup dotenv

- For each environment, clone and rename the respective `./.env.*.example` file; possible .env files include:

  - `./.env.local`

  - `./.env.dev`

  - `./.env.qa`

  - `./.env.prod`

- > **NOTE:** `./dist/.env` is created by Grunt and will be overwritten at build time.



## Commands

> **NOTE:** Use `Bash` to run commands.


### Install

- `composer install`


### Update

- `composer update`


### Grunt

- `composer grunt`


### Build

- `composer build:local`

- `composer build:dev`

- `composer build:qa`

- `composer build:prod`

- **Options**

  - `-- --env={local,dev,qa,prod}`

  - `-- --verbose`


### Local Development

- `composer dev:local`

- `composer dev:dev`

- `composer dev:qa`

- `composer dev:prod`

- *Options*

  - `-- --env={local,dev,qa,prod}`

  - `-- --verbose`


### Deploy

- `composer deploy:dev`

- `composer deploy:qa`

- `composer deploy:prod`

- *Options*

  - `-- --env={dev,qa,prod}`

  - `-- --verbose`



## Dependencies

- See **Dependencies** in `./vendor/zeiglerd/php-engine/README.md`.
