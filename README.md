<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/folder-api.svg" width="100" alt="alchemia-js">
</p>
<p align="center">
    <h1 align="center">AlchemiaJS</h1>
</p>
<p align="center">
    <em><quote>Fast, compact and lightweight Typescript API, built with Vike (previously vite-plugin-ssr) and Prisma.</quote></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/GauthierWebDev/AlchemiaJS?style=default&logo=opensourceinitiative&logoColor=white&color=9f6ddf" alt="license">
	<img src="https://img.shields.io/github/last-commit/GauthierWebDev/AlchemiaJS?style=default&logo=git&logoColor=white&color=9f6ddf" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/GauthierWebDev/AlchemiaJS?style=default&color=9f6ddf" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/GauthierWebDev/AlchemiaJS?style=default&color=9f6ddf" alt="repo-language-count">
<p>

<br><!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary><br>

- [Overview](##-overview)
- [Features](##-features)
- [Repository Structure](##-repository-structure)
- [Getting Started](##-getting-started)
  - [Installation](##-installation)
  - [Configuration](##-configuration)
  - [Usage](##-usage)
- [Contributing](##-contributing)
- [License](##-license)
</details>
<hr>

## Overview

<p>
   AlchemiaJS is a fast, compact and lightweight Typescript API, built with Vike (previously vite-plugin-ssr) and Prisma.
</p>
<p>
   The project is designed to provide a simple and efficient way to create and manage a web API using the Vike framework, which is a server-side rendering plugin for Vite.
</p>

---

## Features

<p>
   The AlchemiaJS project provides a number of features to help you build and manage your web API.
</p>

<ul>
   <li>
      <strong>Minimalist</strong>: AlchemiaJS is designed to be lightweight and fast, with a focus on simplicity and efficiency. Combined with `fastify` instead of other NodeJS frameworks, it provides a minimalist approach to building web servers.
   </li>
   <li>
      <strong>SEO Friendly</strong>: AlchemiaJS is built with Vike, a server-side rendering plugin for Vite, which allows you to create SEO-friendly web applications.
   </li>
   <li>
      <strong>Prisma Integration</strong>: AlchemiaJS is integrated with Prisma, a modern database toolkit for Node.js and TypeScript. This allows you to easily manage your database schema and interact with your database.
   </li>
   <li>
      <strong>Customizable</strong>: AlchemiaJS is highly customizable, allowing you to easily extend and modify the API to suit your needs.
   </li>
</ul>

---

## Repository Structure

```sh
└── AlchemiaJS/
    ├── alambic
    │   ├── commands
    │   ├── core
    │   ├── data
    │   ├── functions
    │   ├── index.ts
    │   └── template
    ├── config
    │   ├── errors.ts
    │   ├── index.ts
    │   ├── security.ts
    │   └── settings.ts
    ├── loader.js
    ├── logs
    │   └── .gitkeep
    ├── nodemon.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── prisma
    │   └── schema.prisma
    ├── register.js
    ├── server
    │   ├── alchemia.d.ts
    │   ├── app
    │   ├── core
    │   ├── functions
    │   ├── index.ts
    │   ├── root.ts
    │   ├── server.ts
    │   └── services
    ├── src
    │   ├── pages
    │   └── renderer
    ├── temp
    │   └── .gitkeep
    ├── tsconfig.json
    ├── types
    │   ├── alambic.ts
    │   ├── alchemia.ts
    │   └── index.ts
    ├── utils
    │   ├── API.ts
    │   ├── Logger.ts
    │   └── index.ts
    └── vite.config.ts
```

---

## Getting Started

**System Requirements:**

- **NodeJS**: `version 20.11.0 or higher`
- **PostgreSQL**: `version 15.6 or higher`

### Installation

<h4>From <code>npx</code></h4>

> 1. Create a new AlchemiaJS project using the command below:
>
> ```console
> $ npx create-alchemiajs-app my-alchemiajs-project
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd my-alchemiajs-project
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ npm install
> ```

<h4>From <code>source</code></h4>

> 1. Clone the AlchemiaJS repository:
>
> ```console
> $ git clone https://github.com/GauthierWebDev/AlchemiaJS
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd AlchemiaJS
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ npm install
> ```

### Configuration

> 1. Copy the `.env.example` file to `.env`:
>
> ```console
> $ cp .env.example .env
> ```
>
> 2. Update the `.env` file with your API configuration details.
>
> ```env
> # SETTINGS
> PORT=5000
> DOMAIN=localhost
> PROTOCOL=http
> NODE_ENV=development
> LOG_LEVEL=debug
>
> # SECURITY
> JWT_SECRET=secret
> JWT_EXPIRES_IN=1d
> SALT_ROUNDS=10
> COOKIE_DAYS_DURATION=1
> SESSION_SECRET=super_secret_key_of_min_32_chars
> ```
>
> 3. Update the `.env` file with your database connection details.
>
> ```env
> DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
> ```
>
> 4. Update the `prisma/schema.prisma` file with your database schema.
>
> ```prisma
> datasource db {
>   provider = "postgresql"
>   url      = env("DATABASE_URL")
> }
>
> generator client {
>   provider = "prisma-client-js"
> }
>
> model User {
>   id        String   @id @default(cuid())
>   email     String   @unique
>   password  String
>   created   DateTime @default(now())
>   updated   DateTime @updatedAt
> }
> ```
>
> 5. Run the Prisma migration to create the database schema:
>
> ```console
> $ npx prisma migrate dev
> ```

### Usage

> Run AlchemiaJS using the command below:
>
> ```console
> $ npm run dev
> ```

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/GauthierWebDev/AlchemiaJS/issues)**: Submit bugs found or log feature requests for the `AlchemiaJS` project.
- **[Submit Pull Requests](https://github.com/GauthierWebDev/AlchemiaJS/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/GauthierWebDev/AlchemiaJS/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/GauthierWebDev/AlchemiaJS
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/GauthierWebDev/AlchemiaJS/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=GauthierWebDev/AlchemiaJS">
   </a>
</p>
</details>

---

## License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [License](./LICENSE) file.

---

[**Return**](#-overview)

---
