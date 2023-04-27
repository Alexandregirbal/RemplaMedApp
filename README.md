# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

-   [Documentation](https://create.t3.gg/)
-   [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I init the repo?

-   Install dependencies:
    ```bash
    npm i
    ```
-   Create a `.env` file by copy/pasting the `.env.example` file and replace the values.

-   Init the database:
    ```bash
    npx prisma migrate dev --name init
    ```

## How to I start developing?

-   Start docker services
    ```bash
    npm run start:docker-services
    ```
-   Start development server (with hot reload)
    ```bash
    npm run dev
    ```

## Hox to add/modify a DB model?

-   Add your model
-   Format the prisma schema file
    ```bash
    prisma format
    ```
-   Push the changes to the Database
    ```bash
    prisma db push
    ```
-   Generate the Prisma Client (for types)
    ```bash
    prisma generate
    ```

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
