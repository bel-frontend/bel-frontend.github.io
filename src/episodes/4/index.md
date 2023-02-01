---
number: 4
title: "Разбор пытанняў з рэальных сумоўяў JS - 2."
dateArticle: "30.01.2023"
author: "loveJS"
chapters: 1
layout: episode.njk
tags: episode
---

**Пытанне:**

Ці ёсць **_hoisting_** для `let, const, classes`? Што такое \*\*_Temporal Dead Zone (часовая мертвая зона)_\*\*?

**Кароткі адказ**

_let, const і classes_ таксама ўсплываюць, але, у адрозненні ад `var`, трапляюць у так званую _Temporal Dead Zone_, калі яны знаходзяцца ў воласці бачнасці, але яшчэ не аб'яуленыя.

**Падрабязны адказ**

JS-двіжок разбірае наш код у _2 этапы_:

-счытвае ўсе _аб'явы пераменных_ і _function declaration_ (таму ведае пра іх да іх аб'вы ў кодзе) ды пераносіць іх на верх лексічнай вобласці бачнасці.

-выконвае код

Аб'явы пераменных `let` і `const` таксама счытваюцца і пападаюць ці ў пачатак кода (у выпадку глабальнай вобласці бачнасці), ці ў пачатак блока, але пападаюць у _часовую мертвую зону_ (лічацца мертвымі). Таму інтэрпрэтатар ведае пра іх да пачатку выканання кода, але яны недасяжныя да моманту іх аб'яўлення.

Так у кансолі можам назіраць розныя памылкі, якія з'яўляюцца ў першым радку кода, калі пераменная аб'яўлена ніжэй, і калі наогул не аб'яўлена:

> `console.log(a)`;
>
> `// Uncaught ReferenceError: a is not defined`

> `console.log(a);`
>
> `const a = 1;`
>
> `// ReferenceError: Cannot access 'a' before initialization`

Трэба адзнацыць, што аб'яўленне функцый праз `function f(){}` ды `const f = function(){}` або `const f = ()=>{}` працуюць парознаму:

> `f()`
>
> `const  f = function (){console.log('Hello! World')}`
>
> `//Uncaught ReferenceError: Cannot access 'f' before initialization`

ці

> `f()`
>
> `function f(){console.log('Hello! World')}`
>
> `//"Hello! World"`
