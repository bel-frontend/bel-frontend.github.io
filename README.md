This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Урокі

Каталог: `/lessons`. Першы ўрок: `/lessons/aws/aif-c01`.
Матэрыялы AWS знаходзяцца ў `public/lessons/aws/aif-c01/` і перанесены з
`lessons/RAG/AWS_lessons/aif-c01-study`. Лакальны неабавязковы `data_udemy.js`
не публікуецца. Для абнаўлення скапіруй публічныя файлы ўрока, захаваўшы
`base`, апісанне і спасылку на каталог у `index.html`.
Новыя ўрокі дадавай у `public/lessons/<тэма>/<урок>/` і ў каталог
`src/app/(non-auth)/lessons/page.tsx`; для чыстага адраса дадай rewrite у `next.config.js`.
