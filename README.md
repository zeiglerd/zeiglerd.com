# zeiglerd/zeiglerd.com



## zeiglerd/php-engine library

More information about this project can be found in `./vendor/zeiglerd/php-engine/README.md`.



## Setup dotenv

- For each environment, clone and rename the respective `./.env.*.example` file; possible .env files include:
  - `./.env.local`
  - `./.env.prod`
  - `./.env.qa`
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
- `composer build:prod`
- `composer build:qa`
- **Options**
  - `-- --env={local,qa,prod}`
  - `-- --verbose`


### Local Development
- `composer dev:local`
- `composer dev:prod`
- `composer dev:qa`
- *Options*
  - `-- --env={local,qa,prod}`
  - `-- --verbose`


### Deploy
- `composer deploy:prod`
- `composer deploy:qa`
- *Options*
  - `-- --env={qa,prod}`
  - `-- --verbose`



## Dependencies
- See **Dependencies** in `./vendor/zeiglerd/php-engine/README.md`.
