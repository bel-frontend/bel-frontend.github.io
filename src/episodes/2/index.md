---
number: 2
title: 'Як усталяваць Node.js'
dateArticle: '11.01.2023'
author: 'Admin'
chapters: 1
layout: episode.njk
tags: episode
---

Найбольш зручным спосабам для ўсталявання ноды на гэты час з'яўляецца ўсталяванне праз NVM (node version manager). У гэтым артыкуле мы разгледзім менавіта гэты спосаб. Так як NVM дазваляе выкарыстоўваць на адным кампутары некалькі версій ноды, ды хутка пераключацца паміж імі.

**_Усталяванне_**

Шляхі для ўсталявання NVM на кампутары з Windows ды з Linux / Mac OS адрозніваюцца.
Разгледзім абодва.

**Windows**

Зпампоўваем з рэпазіторыю https://github.com/coreybutler/nvm-windows/releases файл `nvm-setup.exe`, ды ўсталеўваем яго.
Пасля ўсталявання ў кансолі праверце вынікі камандай `nvm -v`

**Linux / Mac OS**

Для ўсталявання праграммы трэба ў тэрменале выканаць наступную каманду:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

Калі CURL не усталяваны можна паспрабаваць праз WGET:

`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

Паспрабуйце вызваць каманду `nvm -v`. Калі яна не спрацавала - Прагледзьце файлы `~/.bash_profile , ~/.zshrc, ~/.profile` або `~/.bashrc` (залежыць ад OS) ды дадайце наступны код:

`export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s
"${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`

ды абнавіце пераменныя асяроддзя наступнай камандай:

`source ~/.bash_profile` - (назва файла залежыць ад OS).

У выніку пасля вызаву каманды `nvm -v` вы атрымаеце нешта падобнае да

    `nvm -v`

    `0.39.1`

На гэтым усталяванне NVM скончана.

**_NodeJS_**

Каб усталяваць NodeJs, выкарыстайце ў тэрмінале наступныя каманды:

1.  `nvm install latest` ці `nvm install 14` або іншую версію ноды.
2.  `nvm use 14` дзе 14 - нумар усталяванай да гэтага версіі.

Усё, нода павінна працаваць. Каб праверыць зрабіце `node -v` . У выніку вы пабачыце версію ноды.
Больш каманд, якія дазваляе выконваць NVM, можна прагледзець камандай `nvm -h`
Падрабязней пра NVM можна паглядзець [тут (Гітхаб праекта)](https://github.com/nvm-sh/nvm) ды [тут (Гітхаб праекта для windows)](https://github.com/coreybutler/nvm-windows)
