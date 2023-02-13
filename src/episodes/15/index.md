---
number: 15
title: "Разбор пытанняў з рэальных сумоўяў JS Core - 4."
dateArticle: "04.02.2023"
author: "loveJS"
chapters: 1
layout: episode.njk
tags: episode
---

**Пытанне**

Які тып дадзеных будзе ў кожнам радку?

- ```typeof undefined```

- ```typeof 0```

- ```typeof Infinity```

- ```typeof NaN```

- ```typeof 10n```

- ```typeof true```

- ```typeof "foo"```

- ```typeof Symbol("id")```

- ```typeof ['sss']```

- ```typeof Math```

- ```typeof null```

- ```typeof alert```

**Адказ**

- ```typeof undefined // undefined```

- ```typeof 0  // number```

- t```ypeof Infinity // number``` (`Infinity` - спецыяльнае лічбавае значэнне)

- ```typeof NaN // number``` (`Infinity` - спецыяльнае лічбавае значэнне)

- ```typeof 10n // bigint```

- ```typeof true // boolean```

- ```typeof "foo" // string```

- ```typeof Symbol("id") // symbol```

- ```typeof ['sss'] // object``` (няма тыпу `array`)

- ```typeof Math // object``` (гэта ўбудаваны аб'ект. Да яго можна звярнуцца праз кропку, напрыклад, `Math.random()`)

- ```typeof null // object``` (Вядомая памылка. Не выпраўлена, каб не сапсаваць вялізную колькасць ужо існуючага коду. Насамрэч `null` не з'яўляецца аб'ектам.)

- ```typeof alert // function``` (такога тыпу дадзеных не існуе. `function` у JS з'яўляецца аб'ектам. Але з дапамогай `typeof` можна зручна паглядзець тып дадзеных)

**_На заўвагу:_**

Тып дадзеных можна праверыць з дапамогай аператара `typeof x` і з дапамогай функцыі `typeof(x)`. Розніцы ў адказах няма.
