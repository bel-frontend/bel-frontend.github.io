# AWS Certified AI Practitioner (AIF-C01) — падручнік

Сціслы падручнік на беларускай мове для падрыхтоўкі да экзамену **AWS Certified AI Practitioner (AIF-C01)**. Тэорыя па ўсіх пяці даменах экзамену з табліцамі параўнання, шпаргалка «ключавое слова → адказ» і тыповыя пасткі. Тэрміны падкрэслены пункцірам: навядзі на тэрмін (або націсні), каб убачыць тлумачэнне.

Практыка — у файле **`index.html`** (тэорыя са схемамі, трэнажор, сімуляцыя экзамену, карткі, слоўнік; адкрываецца ў браўзеры і працуе без інтэрнэту).

---

## 0. Як карыстацца матэрыяламі

| Крок | Што рабіць | Дзе |
|---|---|---|
| 1 | Прачытай тыповыя пасткі (раздзел 1), тэорыю па даменах і разбор тыповых памылак (раздзел 9). Найбольш часта памыляюцца ў D1 (базавыя паняцці ML), D4 (Responsible AI) і D5 (бяспека) | гэты файл |
| 2 | Прайдзі пытанні ў трэнажоры з разборам | `index.html` → Трэніроўка |
| 3 | Паўтарай **«Мае слабыя»** / **«Разумны рэжым»**, пакуль спіс слабых не апусцее | `index.html` |
| 4 | Зрабі некалькі **сімуляцый экзамену** (90 хв). Мэта — стабільна ≥ 80% | `index.html` → Экзамен |

Статыстыка трэнажора захоўваецца ў браўзеры (localStorage) — прагрэс не губляецца паміж сесіямі.

---

## 1. Тыповыя пасткі

Найчасцей на экзамене памыляюцца ў наступным:

1. **Блытаніна падобных сэрвісаў AWS**: Polly ↔ Lex, Macie ↔ Inspector, Trusted Advisor ↔ Config, CloudTrail ↔ invocation logging, Clarify ↔ Model Monitor, Rekognition ↔ SageMaker, Bedrock ↔ JumpStart.
2. **Базавыя паняцці ML**: тыпы навучання (supervised / RL / transfer), метрыкі (accuracy vs F1, confusion matrix vs MAE), overfitting, этапы ML-праекта (EDA, use case).
3. **Responsible AI**: тыпы bias, інтэрпрэтаванасць мадэляў, SHAP vs PDP, празрыстасць.
4. **Рэжымы inference SageMaker**: serverless vs async vs batch.
5. **Параметры і кастамізацыя FM**: Top K vs Top P, continued pre-training vs fine-tuning, self-supervised vs supervised.

> 💡 **Лайфхак для экзамену:** у кожным пытанні шукай *ключавыя словы-трыгеры* (раздзел 7). Большасць памылак — не ад няведання, а ад таго, што не заўважыў ключавое слова («less than 1 GB», «intermittent», «prompts and responses», «who called the API», «energy efficient»).

---

## 2. Домен 1 — Fundamentals of AI and ML (20%)

### 2.1. AI ⊃ ML ⊃ Deep Learning ⊃ Generative AI

- **AI** — любая сістэма, што імітуе інтэлект (у т.л. правілы).
- **ML** — мадэль вучыцца на даных, а не праграмуецца правіламі.
- **Deep Learning** — ML на шматслойных нейронных сетках (CNN для выяў, RNN/Transformers для паслядоўнасцей).
- **Generative AI** — DL-мадэлі, што *ствараюць* новы кантэнт (тэкст, выявы, код, аўдыё).

### 2.2. Тыпы навучання

| Тып | Даныя | Што робіць | Прыклады алгарытмаў / задач |
|---|---|---|---|
| **Supervised** | размечаныя (ёсць правільны адказ) | вучыцца прадказваць метку | Лінейная/лагістычная рэгрэсія, дрэвы рашэнняў, **нейронныя сеткі**, SVM. Класіфікацыя (spam/не spam), рэгрэсія (цана) |
| **Unsupervised** | без метак | шукае структуру | **K-means** (кластарызацыя), **PCA** (памяншэнне памернасці), выяўленне анамалій |
| **Semi-supervised** | трохі метак + шмат без | | |
| **Self-supervised** | меткі генеруюцца з саміх даных | | **Pre-training FM** (прадказаць наступны / прапушчаны токен) |
| **Reinforcement learning** | узаемадзеянне з асяроддзем | **агент** робіць **дзеянні**, атрымлівае **ўзнагароды/штрафы**, вучыць **палітыку**, каб максімізаваць сукупную ўзнагароду | Робататэхніка, гульні, AWS DeepRacer, **RLHF** (чат-бот вучыцца на зваротнай сувязі) |
| **Transfer learning** | | пераносіць веды з адной задачы на **сумежную** | Fine-tuning прадугледжанай мадэлі |

> ⚠️ Пастка: «чат-бот павінен пастаянна паляпшацца з узаемадзеянняў з кліентамі / зваротнай сувязі» → **RL**, а не incremental training.

### 2.3. Тыпы задач Computer Vision

| Задача | Што робіць |
|---|---|
| Image classification | адна метка на ўсю выяву («тут ёсць кот») |
| **Object detection** | знаходзіць **і** класіфікуе **кожны** аб'ект (bounding boxes) — «ідэнтыфікаваць і класіфікаваць кожную жывёлу» |
| Segmentation | метка для кожнага пікселя |
| OCR | тэкст з выявы (Textract) |

### 2.4. ML lifecycle (этапы праекта)

1. **Вызначэнне бізнес-задачы** — вузка і дакладна сфармуляваць use case і метрыку поспеху (напрыклад: «што спачатку папрасіць каманду?» → *define the use case narrowly*).
2. **Збор даных**.
3. **EDA (Exploratory Data Analysis)** — статыстыка, візуалізацыі, пошук патэрнаў і анамалій.
4. **Data preparation** — ачыстка, прапушчаныя значэнні, нармалізацыя, балансаванне.
5. **Feature engineering** — стварэнне/адбор прыкмет.
6. **Training** + **hyperparameter tuning**.
7. **Evaluation** — ацэнка і параўнанне мадэляў на тэставых даных.
8. **Deployment** → **Inference** (выкарыстанне мадэлі для прагнозаў на новых даных).
9. **Monitoring** (дрэйф даных/якасці) → перанавучанне.

> **Evaluation** = выбраць/ацаніць мадэль. **Inference** = выкарыстоўваць мадэль для прагнозаў.

**Parameters vs hyperparameters:** weights/biases мадэль вучыць сама (parameters); learning rate, epochs, batch size, глыбіню дрэва задаеш ты (hyperparameters).

### 2.5. Overfitting vs Underfitting

| | Overfitting (high variance) | Underfitting (high bias) |
|---|---|---|
| Сімптом | **Выдатна на train, дрэнна на новых даных** | Дрэнна і на train, і на test |
| Лячэнне | рэгулярызацыя (L1/L2), dropout, early stopping, **hyperparameter tuning**, больш даных, data augmentation, прасцейшая мадэль | больш складаная мадэль, больш прыкмет, вучыць даўжэй |

> ⚠️ «Reduce training data» — **ніколі** не лечыць overfitting.

### 2.6. Метрыкі — абавязкова вывучыць

**Confusion matrix** (класіфікацыя):

|  | Прагноз: + | Прагноз: − |
|---|---|---|
| **Факт: +** | TP | FN |
| **Факт: −** | FP | TN |

| Метрыка | Формула | Калі выкарыстоўваць |
|---|---|---|
| **Accuracy** | (TP+TN)/усе | «агульны % правільных прагнозаў», класы збалансаваныя |
| **Precision** | TP/(TP+FP) | ілжывыя трывогі дарагія (спам-фільтр) |
| **Recall** (sensitivity) | TP/(TP+FN) | нельга прапусціць (фрод, хваробы) |
| **F1** | 2·P·R/(P+R) | незбалансаваныя класы, баланс P і R |
| **AUC-ROC** | плошча пад ROC | якасць падзелу класаў па ўсіх парогах |
| **Confusion matrix** | | **дэталёвы** аналіз памылак класіфікацыі па класах |
| **MAE, RMSE, R²** | | **рэгрэсія** (неперарыўныя значэнні) |

Метрыкі GenAI — гл. раздзел 3.6. Бізнес-метрыкі — гл. 4.6.

### 2.7. Інтэрпрэтаванасць мадэляў

**White box** (лёгка тлумачыць): лінейная/лагістычная рэгрэсія, дрэвы рашэнняў.
**Black box**: нейронныя сеткі, вялікія ансамблі, LLM.
Trade-off: **больш складаная мадэль → звычайна дакладней, але менш інтэрпрэтавана**.

### 2.8. SageMaker — карта інструментаў

| Інструмент | Для чаго |
|---|---|
| **Studio** | IDE для ML (ноўтбукі, увесь цыкл) |
| **Canvas** | **no-code** ML для аналітыкаў |
| **Data Wrangler** | падрыхтоўка даных, візуалізацыі, **балансаванне класаў** (oversampling/undersampling/SMOTE) |
| **Ground Truth** | **разметка** даных (людзі + аўтаразметка) |
| **Feature Store** | сховішча прыкмет (online/offline) |
| **JumpStart** | ML-хаб: прадугледжаныя мадэлі (у т.л. FM) і гатовыя рашэнні, **one-click deploy**, кастамізацыя сваімі данымі, параўнанне FM па метрыках |
| **Autopilot** | AutoML (аўтаматычна выбірае алгарытм) |
| **Clarify** | **bias** (да і пасля навучання) + **explainability** (SHAP) |
| **Model Monitor** | маніторынг у прадакшне: дрэйф даных, якасці, bias, feature attribution |
| **Model Cards** | дакументацыя мадэлі (прызначэнне, рызыкі, метрыкі) |
| **Model Registry** | каталог версій мадэляў, зацвярджэнне |
| **Model Dashboard** | агульны агляд мадэляў і іх стану |
| **Pipelines** | MLOps / CI-CD для ML |
| **Role Manager** | хуткая налада IAM-роляў для ML-персон |

### 2.9. Рэжымы inference у SageMaker

| Рэжым | Трыгеры ў пытанні |
|---|---|
| **Real-time** | нізкая затрымка, пастаянны трафік, адказ за мілісекунды, пастаянны endpoint |
| **Serverless** | **перарывісты / непрадказальны** трафік, **не хочам кіраваць інфраструктурай**, **cold start прымальны**, эканомія |
| **Asynchronous** | вялікі payload (**да 1 ГБ**), доўгая апрацоўка (да ~1 гадз), **адказ не патрэбен адразу**, чарга, можна маштабаваць да 0 |
| **Batch transform** | прагноз для **ўсяго датасэта** ў S3, перыядычна/офлайн, **без endpoint** |

---

## 3. Домен 2 — Fundamentals of Generative AI (24%)

### 3.1. Базавыя паняцці

- **Token** — частка тэксту (слова/частка слова). Плата і ліміты — у токенах.
- **Context window** — колькі токенаў мадэль бачыць за раз (промпт + адказ).
- **Embedding** — вектар лікаў, які перадае сэнс; блізкія па сэнсе → блізкія вектары. Аснова semantic search і RAG.
- **Vector database** — захоўвае embeddings і хутка шукае падобныя (OpenSearch Serverless, Aurora PostgreSQL pgvector, Neptune Analytics, Pinecone, Redis, MongoDB Atlas).
- **Foundation Model (FM)** — вялікая мадэль, навучаная на велізарных даных, адаптуецца да многіх задач.
- **LLM** — FM для тэксту.
- **Multimodal** — некалькі тыпаў даных (тэкст + выявы + …).
- **Hallucination** — праўдападобны, але ілжывы адказ.

### 3.2. Як вучацца FM

- **Pre-training** — **self-supervised** на велізарных неразмечаных даных (прадказанне наступнага токена).
- **Fine-tuning** — **supervised** на размечаных прыкладах (prompt → completion).
- **Continued pre-training** — дадатковае self-supervised навучанне на **неразмечаных** дамэнных даных.
- **RLHF** — даводка па перавагах людзей (reinforcement learning from human feedback).

### 3.3. Архітэктуры мадэляў

| Мадэль | Як працуе | Для чаго |
|---|---|---|
| **Transformer** | self-attention | аснова ўсіх LLM |
| **BERT** | encoder, **bidirectional**, masked language modeling | разуменне тэксту, класіфікацыя, **запоўніць прапушчанае слова** |
| **GPT** | decoder, autoregressive | генерацыя тэксту |
| **Diffusion** | вучыцца прыбіраць шум | генерацыя выяў (Stable Diffusion) |
| **GAN** | генератар vs дыскрымінатар | **рэалістычныя сінтэтычныя даныя**, выявы |
| **VAE** | encoder → латэнтная прастора → decoder | генерацыя, выяўленне анамалій |
| **WaveNet** | | генерацыя **аўдыё/маўлення** |
| **CNN** | згорткі | выявы (класіфікацыя, детэкцыя) |
| **RNN/LSTM** | паслядоўна | старэйшы падыход для паслядоўнасцей |

### 3.4. Параметры inference

| Параметр | Што робіць | Нізкае значэнне | Высокае значэнне |
|---|---|---|---|
| **Temperature** | выпадковасць | дэтэрмінавана, кансерватыўна | крэатыўна, разнастайна |
| **Top K** | **колькасць** найбольш імаверных кандыдатаў | менш варыянтаў | больш варыянтаў |
| **Top P** | **кумулятыўная імавернасць** кандыдатаў (nucleus) | толькі самыя імаверныя | шырэйшы выбар |
| **Max tokens** | максімальная даўжыня адказу | | |
| **Stop sequences** | дзе спыніць генерацыю | | |

> Мнемоніка: **K — Kolькасць**, **P — Probability**.

### 3.5. Prompt engineering

- **Zero-shot** — без прыкладаў. **Few-shot** — некалькі прыкладаў «уваход → патрэбны выхад» (напрыклад: для класіфікацыі намеру прыклады = *паведамленне → intent*).
- **Chain-of-thought** — «разважай крок за крокам».
- **Role / system prompt** — задаць ролю і правілы.
- **Prompt template** — шаблон з інструкцыямі, у т.л. абарона ад атак.
- **Negative prompting** — што НЕ рабіць (часта ў генерацыі выяў).

**Атакі на промпты:**

| Атака | Сутнасць |
|---|---|
| **Prompt injection** | шкодная інструкцыя ў уводзе перапісвае паводзіны мадэлі |
| **Jailbreak** | абыход абмежаванняў бяспекі |
| **Prompt leaking** | выцягнуць сістэмны промпт |
| **Data poisoning** | шкодныя даныя трапляюць у **навучанне** |
| **Model inversion / extraction** | аднавіць навучальныя даныя / скапіяваць мадэль |

Абарона: Guardrails, prompt templates з інструкцыямі, валідацыя ўводу, мінімальныя правы, маніторынг.

### 3.6. Метрыкі GenAI

| Метрыка | Для чаго |
|---|---|
| **ROUGE** | сумарызацыя (recall n-gram) |
| **BLEU** | машынны пераклад (precision n-gram) |
| **BERTScore** | семантычнае падабенства праз embeddings |
| **Perplexity** | наколькі добра мадэль прадказвае тэкст (ніжэй — лепш) |
| Faithfulness / groundedness | ці абапіраецца адказ RAG на знойдзены кантэкст |

### 3.7. Плюсы і мінусы GenAI

Плюсы: адаптыўнасць, хуткасць, персаналізацыя, творчасць. Мінусы: hallucinations, недэтэрмінаванасць, складана тлумачыць, bias, кошт, пытанні IP і бяспекі.

---

## 4. Домен 3 — Applications of Foundation Models (28%, самы вялікі)

### 4.1. Amazon Bedrock vs SageMaker JumpStart

| | **Amazon Bedrock** | **SageMaker JumpStart** |
|---|---|---|
| Што гэта | **Serverless** доступ да FM праз **адзін API** | **ML-хаб** унутры SageMaker |
| Мадэлі | Anthropic, Amazon Nova/Titan, Meta, Mistral, Cohere, AI21, Stability AI і інш. | сотні open-source і прапрыетарных мадэляў + гатовыя рашэнні |
| Інфраструктура | не кіруеш зусім | разгортваеш на сваіх endpoint'ах (больш кантролю) |
| Ключавыя словы | «generative AI», «API», «no infrastructure», «guardrails», «agents», «knowledge bases» | «pre-built solutions», «one-click deploy», «customize with your data», «compare/evaluate FMs» |

### 4.2. Магчымасці Amazon Bedrock

| Функцыя | Для чаго |
|---|---|
| **Knowledge Bases** | **RAG**: дакументы (S3 і інш.) → chunking → embeddings → vector store. **Па змаўчанні — Amazon OpenSearch Serverless** |
| **Agents** | шматкрокавыя задачы, выклік API праз action groups (Lambda), выкарыстанне KB |
| **Guardrails** | denied topics, content filters (у т.л. prompt attacks), word filters, **PII redaction**, contextual grounding check — для ўваходу і выхаду |
| **Model evaluation** | аўтаматычная і human-ацэнка мадэляў на сваіх даных |
| **Custom models** | fine-tuning (размечаныя даныя), continued pre-training (неразмечаныя), distillation |
| **Model invocation logging** | логі **прамтаў і адказаў** у CloudWatch Logs / S3 |
| **Prompt management / Flows** | шаблоны промптаў, ланцужкі |

**Цэнаўтварэнне:** On-Demand (плата за токены) · **Batch** (танней для вялікіх аб'ёмаў, асінхронна) · **Provisioned Throughput** (гарантаваная прапускная здольнасць; патрэбна для многіх кастамізаваных мадэляў).

**Даныя кліента** не выкарыстоўваюцца для навучання базавых мадэляў і не перадаюцца правайдарам.

### 4.3. Як адаптаваць FM — ад таннага да дарагога

1. **Prompt engineering** (хутка, танна)
2. **RAG** — калі патрэбныя **актуальныя/свае** даныя, што часта мяняюцца, без перанавучання
3. **Fine-tuning** — змяніць стыль/фармат/паводзіны на канкрэтнай задачы (размечаныя даныя)
4. **Continued pre-training** — даведаць дамэн (неразмечаныя даныя)
5. **Навучанне з нуля** (вельмі дорага)

**Transfer learning** — агульная ідэя: перанесці навучаную мадэль на сумежную задачу.

### 4.4. Крытэрыі выбару FM

Кошт, **latency (→ памер мадэлі, )**, дакладнасць, памер кантэксту, мадальнасць, мовы, ліцэнзія, магчымасць кастамізацыі, адпаведнасць патрабаванням.

### 4.5. AI-сэрвісы AWS — шпаргалка (вельмі частыя пытанні)

| Сэрвіс | Што робіць | Ключавыя словы |
|---|---|---|
| **Amazon Comprehend** | NLP: sentiment, сутнасці, ключавыя фразы, мова, **PII detection/redaction**, класіфікацыя | «analyze text», «sentiment», «redact PII» |
| **Amazon Textract** | тэкст, табліцы, формы з дакументаў/сканаў | «extract text from documents/forms» |
| **Amazon Rekognition** | аналіз **выяў і відэа**: аб'екты, твары, модэрацыя, **Custom Labels** | «images», «video», «computer vision», «faces» |
| **Amazon Polly** | **тэкст → маўленне** | «text to speech», «audio courses» |
| **Amazon Transcribe** | **маўленне → тэкст** | «transcribe calls», «subtitles» |
| **Amazon Translate** | пераклад | «multilingual» |
| **Amazon Lex** | **чат-боты** (голас/тэкст, як Alexa) | «conversational interface», «chatbot» |
| **Amazon Kendra** | інтэлектуальны enterprise search | «search across documents» |
| **Amazon Personalize** | рэкамендацыі | «recommendations» |
| **Amazon Q Business** | GenAI-асістэнт на карпаратыўных даных | «employees», «enterprise data» |
| **Amazon Q Developer** | асістэнт распрацоўшчыка (код, AWS) | «code generation» |
| **Amazon A2I** | human review прагнозаў | «human-in-the-loop», «low confidence» |

### 4.6. Бізнес-метрыкі vs тэхнічныя

Пытанне пра **бізнес-каштоўнасць** → task completion rate, cost per interaction, customer satisfaction (CSAT), conversion rate, ROI, average revenue per user. Тэхнічныя (precision, recall, F1, latency) — не адказ на пытанне «ці дае гэта бізнесу больш каштоўнасці».

---

## 5. Домен 4 — Guidelines for Responsible AI (14%) — 🔴 частыя памылкі частыя памылкі

### 5.1. Вымярэнні responsible AI (AWS)

**Fairness, Explainability, Privacy & Security, Safety, Controllability, Veracity & Robustness, Governance, Transparency.**

### 5.2. Тыпы bias

| Bias | Сутнасць | Прыклад |
|---|---|---|
| **Sampling bias** | навучальная выбарка не рэпрэзентуе папуляцыю | групы пера/недапрадстаўлены → камера часцей «падазрае» адну этнічную групу |
| **Historical bias** | даныя адлюстроўваюць мінулую несправядлівасць | мадэль найму на старых рашэннях |
| **Measurement bias** | памылкі ў вымярэнні/зборы прыкмет | розныя прылады вымярэння |
| **Observer bias** | суб'ектыўнасць таго, хто назірае / размячае | |
| **Confirmation bias** | шукаем пацвярджэнне сваіх чаканняў | |
| **Automation bias** | людзі занадта давяраюць машыне | |

**Як змяншаць:** рэпрэзентатыўныя даныя, **data augmentation / сінтэтычныя даныя для недапрадстаўленых груп**, балансаванне (Data Wrangler), выяўленне bias (Clarify), маніторынг (Model Monitor), human review, разнастайныя каманды.

### 5.3. Explainability

- **SHAP (Shapley values)** — **лакальна**: уклад кожнай прыкметы ў **канкрэтны** прагноз (можна агрэгаваць у глабальны).
- **PDP (Partial Dependence Plot)** — **глабальна**: як прыкмета **ў сярэднім** уплывае на прагнозы.
- Інструмент AWS — **SageMaker Clarify**.

### 5.4. Transparency і дакументацыя

- **AWS AI Service Cards** — AWS апісвае прызначэнне, абмежаванні і рэкамендацыі сваіх AI-сэрвісаў.
- **SageMaker Model Cards** — ты дакументуеш свае мадэлі.
- Празрыстасць ≠ раскрыццё ўсіх дэталяў абароны: пра guardrails і сістэмныя промпты распавядаюць **на высокім узроўні**.

### 5.5. Бяспечнасць кантэнту

**Guardrails for Amazon Bedrock** — першы выбар для блакавання шкоднага/недарэчнага кантэнту. (У іх не было ў варыянтах — тады выбіраем інструкцыі ў промпце.)

### 5.6. Sustainability

- **AWS Trainium** — найбольш энергаэфектыўнае **навучанне**.
- **AWS Inferentia** — найбольш энергаэфектыўны **inference**.
- Таксама: выкарыстоўваць меншыя мадэлі, гатовыя FM замест навучання з нуля, serverless.

### 5.7. Human-in-the-loop

Amazon A2I, ручная праверка рызыкоўных рашэнняў, зваротная сувязь карыстальнікаў.

---

## 6. Домен 5 — Security, Compliance, Governance (14%) — 🔴 частыя памылкі

### 6.1. Сэрвісы бяспекі і кампліенсу — не блытаць!

| Сэрвіс | Адказвае на пытанне |
|---|---|
| **IAM** | хто што можа рабіць (least privilege) |
| **AWS CloudTrail** | **ХТО, КАЛІ і які API** выклікаў (аўдыт дзеянняў) |
| **Bedrock model invocation logging** | **ЗМЕСТ: прамты і адказы** мадэлі |
| **Amazon CloudWatch** | метрыкі, логі, alarms, дашборды |
| **AWS Config** | гісторыя **канфігурацый** рэсурсаў + правілы адпаведнасці |
| **AWS Trusted Advisor** | **рэкамендацыі**: cost, performance, security, fault tolerance, service limits |
| **Amazon Macie** | **адчувальныя даныя / PII у S3** |
| **Amazon Inspector** | **уразлівасці** EC2, ECR, Lambda |
| **Amazon GuardDuty** | выяўленне **пагроз** і падазронай актыўнасці |
| **AWS KMS** | ключы шыфравання |
| **AWS PrivateLink** | прыватнае падключэнне да Bedrock/SageMaker з VPC без інтэрнэту |
| **AWS Artifact** | **спампаваць справаздачы AWS** аб адпаведнасці (SOC, ISO, PCI) |
| **AWS Audit Manager** | бесперапынны **збор доказаў** для твайго аўдыту |
| **AWS Shield / WAF** | DDoS / вэб-атакі |
| **Amazon DataZone / Lake Formation** | data governance, каталог і доступ да даных |

### 6.2. Shared responsibility model

- **AWS** — бяспека **ОБЛАКА**: дата-цэнтры, абсталяванне, інфраструктура кіраваных сэрвісаў (у т.л. FM у Bedrock).
- **Кліент** — бяспека **Ў ОБЛАКУ**: IAM, даныя, шыфраванне, налады, што адпраўляе ў прамты.

### 6.3. Generative AI Security Scoping Matrix

| Scope | Сцэнар | Адказнасць кліента |
|---|---|---|
| 1 | Consumer app (публічны ChatGPT-падобны сэрвіс) | мінімальная |
| 2 | Enterprise app (SaaS з GenAI, напр. Amazon Q) | |
| 3 | Pre-trained models (выклік FM праз Bedrock API) | |
| 4 | Fine-tuned models (свая дадатковая трэніроўка) | |
| 5 | **Self-trained** (мадэль з нуля) | **максімальная** |

### 6.4. Прыватнасць і governance даных

- **Data lineage** — паходжанне і трансфармацыі даных → **кампліенс, аўдыт, празрыстасць**.
- **De-identification** — маскіраванне/токенізацыя ідэнтыфікатараў; **сінтэтычныя даныя**.
- **Data residency**, retention, **data minimization** (збіраць толькі патрэбнае).
- Шыфраванне **at rest** (KMS) і **in transit** (TLS).

---

## 7. Шпаргалка «ключавое слова → адказ»

| Калі ў пытанні… | …адказ звычайна |
|---|---|
| text to speech, audio | **Polly** |
| speech to text, transcribe calls | **Transcribe** |
| chatbot, conversational interface | **Lex** (або Bedrock для GenAI) |
| extract text/forms/tables from documents | **Textract** |
| sentiment, entities, key phrases, redact PII in text | **Comprehend** |
| images/video, faces, objects, moderation | **Rekognition** |
| translate, multilingual | **Translate** |
| enterprise search | **Kendra** |
| recommendations | **Personalize** |
| employee assistant on company data | **Amazon Q Business** |
| PII in S3 | **Macie** |
| vulnerabilities | **Inspector** |
| threats, malicious activity | **GuardDuty** |
| who called which API, when | **CloudTrail** |
| prompts and responses log | **Bedrock model invocation logging** |
| resource configuration history/compliance | **Config** |
| best-practice recommendations (cost, limits…) | **Trusted Advisor** |
| download SOC/ISO reports | **Artifact** |
| collect audit evidence | **Audit Manager** |
| block topics / harmful content / PII in GenAI | **Guardrails for Amazon Bedrock** |
| up-to-date company data, no retraining | **RAG / Knowledge Bases** |
| multi-step tasks, call APIs | **Bedrock Agents** |
| default vector store for KB | **OpenSearch Serverless** |
| bias detection, explainability, SHAP | **SageMaker Clarify** |
| drift in production | **SageMaker Model Monitor** |
| data labeling | **SageMaker Ground Truth** |
| no-code ML | **SageMaker Canvas** |
| data prep, balance dataset | **SageMaker Data Wrangler** |
| document model (intended use, risks) | **SageMaker Model Cards** |
| human review of predictions | **Amazon A2I** |
| intermittent traffic, cold start OK | **Serverless inference** |
| payload up to 1 GB, not immediate | **Asynchronous inference** |
| whole dataset offline, no endpoint | **Batch transform** |
| low latency, steady traffic | **Real-time inference** |
| energy-efficient training / inference | **Trainium / Inferentia** |
| low latency requirement for FM | **smaller model size** |
| number of candidate tokens | **Top K** |
| cumulative probability | **Top P** |
| randomness / creativity | **Temperature** |
| unlabeled domain data to customize FM | **Continued pre-training** |
| labeled prompt-completion pairs | **Fine-tuning** |
| overall % correct | **Accuracy** |
| don't miss positives | **Recall** |
| avoid false alarms | **Precision** |
| detailed classification errors | **Confusion matrix** |
| regression error | **MAE / RMSE** |
| summarization quality | **ROUGE** |
| translation quality | **BLEU** |
| fill in missing word | **BERT** |
| realistic synthetic data | **GAN** |
| learn from rewards/feedback | **Reinforcement learning** |
| adapt model to related task | **Transfer learning** |
| group without labels | **Clustering (K-means)** |
| most interpretable model | **Linear/logistic regression, decision tree** |
| summary stats & visualizations before modeling | **EDA** |
| training data not representative | **Sampling bias** |
| maximum security ownership | **Model trained from scratch (Scope 5)** |

---

## 8. Апошнія парады перад экзаменам

- 65 пытанняў (50 ацэньваюцца + 15 эксперыментальных), 90 хвілін, прахадны бал 700/1000. Тыпы: адзін адказ, некалькі адказаў, ordering, matching, case study.
- Няма штрафу за няправільны адказ — **адказвай на ўсё**.
- Чытай **апошні сказ** пытання першым — там сапраўднае патрабаванне (MOST cost-effective, LEAST operational overhead, MOST interpretable).
- «Least operational effort / fully managed» → амаль заўсёды гатовы кіраваны сэрвіс (Comprehend, Rekognition, Bedrock), а не «пабудаваць самому на SageMaker / свой API».
- Калі два адказы падобныя — шукай розніцу ў адным слове (Top K/Top P, labeled/unlabeled, local/global).

---

## 9. Тыповыя памылкі

Рэальныя памылкі, якія часта робяць на практычных тэстах, пераказаныя сцісла. Фармат: ❌ — тыповы няправільны выбар (пастка), ✅ — правільны адказ, 💡 — як запомніць. 🔁 — памылка, якую робяць паўторна нават пасля разбору. Усе гэтыя пытанні ёсць і ў трэнажоры: фільтр «Толькі тыповыя памылкі».

### D1 — Fundamentals of AI and ML

**1. Здымкі з фотапастак.** Сітуацыя: на кожнай выяве трэба знайсці і класіфікаваць усіх жывёл.

- ❌ цеплавізар (thermal imaging)
- ✅ **Object detection**
- 💡 Object detection — знайсці І класіфікаваць кожны аб'ект (bounding boxes). Image classification — адна метка на ўсю выяву. Segmentation — на ўзроўні пікселяў.

**2. Агульны працэнт правільных прагнозаў.** Сітуацыя: класіфікатар заявак «ухвалена / адхілена», трэба мераць долю ўсіх правільных адказаў.

- ❌ F1 score
- ✅ **Accuracy**
- 💡 Accuracy = (TP+TN)/усе — «агульны працэнт правільных». F1 — калі класы незбалансаваныя і патрэбны баланс precision/recall.

**3. Чат-бот, які сам паляпшаецца.** Сітуацыя: бот павінен увесь час вучыцца на станоўчай зваротнай сувязі ад кліентаў.

- ❌ incremental training
- ✅ **Reinforcement learning** (узнагарода = станоўчы водгук)
- 💡 Пастаянна вучыцца з узаемадзеяння з узнагародай → RL. Incremental training — перыядычнае данавучанне на новых размечаных даных.

**4. Што зрабіць спачатку ў ML-праекце.** Сітуацыя: каманда хоча выбраць найлепшую мадэль для прагнозу адтоку кліентаў.

- ❌ шукаць крыніцы даных
- ✅ **Вузка вызначыць use case**
- 💡 Першы крок — дакладна сфармуляваць бізнес-задачу. Ад яе залежаць даныя, мадэль і метрыкі.

**5. Добра на train, дрэнна на новых даных.** Сітуацыя: мадэль дакладная на навучальных даных, але правальваецца ў прадакшне.

- ❌ паменшыць аб'ём навучальных даных
- ✅ **Hyperparameter tuning**: рэгулярызацыя, dropout, learning rate
- 💡 Overfitting → рэгулярызацыя, dropout, больш даных, early stopping. Памяншаць даныя — толькі горш.

**6. Прыклады supervised learning.** 🔁 Сітуацыя: выбраць два прыклады навучання на размечаных даных.

- ❌ clustering, document classification
- ✅ **Neural network**, **linear regression**
- 💡 Supervised: рэгрэсія, дрэвы, нейронкі, SVM. Unsupervised: K-means, PCA. «Document classification» — задача, а не алгарытм, таму тут яна не падыходзіць.

**7. Статыстыка і графікі перад мадэляваннем.** Сітуацыя: каманда лічыць зводную статыстыку і будуе візуалізацыі, каб зразумець даныя.

- ❌ Data preparation
- ✅ **EDA** (Exploratory Data Analysis)
- 💡 EDA — зразумець даныя (статыстыка, графікі, патэрны). Data preparation — ачысціць і трансфармаваць іх.

**8. Аналіз танальнасці водгукаў.** 🔁 Сітуацыя: трэба вызначаць positive / negative / neutral / mixed (два сэрвісы).

- ❌ выбраць толькі адзін з правільных
- ✅ **Amazon Comprehend** і **Amazon Bedrock**
- 💡 Comprehend — гатовы sentiment analysis. Bedrock — тое ж праз LLM і промпт.

**9. Дэталёвы аналіз памылак класіфікатара.** Сітуацыя: трэба ўбачыць, якія класы з якімі блытаюцца.

- ❌ MAE
- ✅ **Confusion matrix**
- 💡 Класіфікацыя → confusion matrix, precision/recall/F1. MAE/RMSE — для рэгрэсіі.

**10. Inference vs evaluation.** Сітуацыя: чым адрозніваецца выкарыстанне мадэлі ад яе ацэнкі.

- ❌ пераблытаць напрамак азначэнняў
- ✅ **Evaluation** — параўнаць вынікі і выбраць мадэль; **inference** — прагнозы на новых даных
- 💡 Evaluation = «наколькі добрая мадэль». Inference = «мадэль працуе на новых даных».

**11. Як працуе reinforcement learning.** 🔁 Сітуацыя: чым RL адрозніваецца ад іншых метадаў.

- ❌ «RL выкарыстоўвае supervised-алгарытмы для размеркі»
- ✅ **Агент ↔ асяроддзе**: дзеянні, узнагароды і штрафы
- 💡 RL вучыць палітыку, якая максімізуе сукупную ўзнагароду. Размечаныя даныя не патрэбныя.

**12. Ролі training / validation / test.** Сітуацыя: які набор для чаго (два адказы).

- ❌ «test — для падбору гіперпараметраў», «validation паказвае абагульненне»
- ✅ **Test — канчатковая праверка абагульнення**; **validation — неабавязковы** (можна cross-validation)
- 💡 Training — вучым, validation — падбіраем гіперпараметры, test — адзін раз у канцы. Test для tuning не выкарыстоўваюць.

**13. Простыя пераўтварэнні выяваў.** Сітуацыя: павярнуць і адлюстраваць тысячы выяваў з найменшымі намаганнямі.

- ❌ AWS Glue Data Quality
- ✅ **AWS Lambda** са звычайным кодам
- 💡 Не кожная задача патрабуе AI. Простая матэматыка → serverless-код. Glue Data Quality — якасць табліц.

**56. Інтэрпрэтаваны класіфікатар рызыкі.** Сітуацыя: банку патрэбна мадэль «высокая / нізкая рызыка», зразумелая рэгулятарам.

- ❌ deep learning
- ✅ **Logistic regression**
- 💡 Interpretable → лагістычная рэгрэсія або дрэва рашэнняў. Нейронныя сеткі і SVM з нелінейным ядром — black box, K-means не класіфікуе.

**57. Архітэктура для класіфікацыі фота.** Сітуацыя: аўтаматычна сартаваць фота тавараў па катэгорыях.

- ❌ RNN
- ✅ **CNN**
- 💡 Выявы → CNN. RNN — для паслядоўнасцей (тэкст, часавыя рады).

**58. Прыклады unsupervised learning.** Сітуацыя: выбраць два прыклады навучання без метак.

- ❌ sentiment analysis, нейронная сетка
- ✅ **Clustering** і **dimensionality reduction**
- 💡 Без метак: кластарызацыя, PCA, анамаліі, association rules. Sentiment — supervised.

**59. Класіфікатар выяў з мінімумам працы.** Сітуацыя: ёсць размечаныя фота, прыкметы ўручную рабіць не хочацца.

- ❌ SVM з ручнымі прыкметамі
- ✅ **Fine-tune pretrained мадэлі** (transfer learning)
- 💡 Гатовая мадэль ужо ўмее бачыць прыкметы; дастаткова данавучыць. З нуля — доўга і дорага.

**60. Дэтэрмінаваныя ці імавернасныя.** Сітуацыя: якія выхады бываюць у ML-мадэляў.

- ❌ «толькі імавернасныя»
- ✅ **Дэтэрмінаваныя, імавернасныя або змешаныя**
- 💡 Дрэва рашэнняў — дэтэрмінаванае, LLM з sampling — імавернасная.

**71. Вобласці на фота без метак.**

- ❌ Dimensionality reduction
- ✅ **Clustering**
- 💡 Выдзеліць групы або вобласці без метак → **кластарызацыя**. Dimensionality reduction памяншае колькасць прыкмет, але групы не стварае.

**72. Групы гледачоў без загадзя вызначаных катэгорый.**

- ❌ Linear regression
- ✅ **K-means**
- 💡 Групы без загадзя вызначаных катэгорый → **K-means** (unsupervised). Рэгрэсія, SVM і дрэвы рашэнняў — supervised.

**76. Прыклады semi-supervised.**

- ❌ Dimensionality reduction
- ✅ **Fraud identification і sentiment analysis**
- 💡 **Semi-supervised** = крыху метак + шмат неразмечаных даных. Тыповыя прыклады: **fraud identification**, **sentiment analysis**. Clustering і PCA — unsupervised.

**82. Прыклад feature engineering.**

- ❌ Hyperparameter tuning
- ✅ **Вывесці новыя прыкметы (узрост будынка, адлегласць)**
- 💡 **Feature engineering** — ствараць новыя прыкметы з наяўных даных. Hyperparameter tuning — гэта налада мадэлі, а графікі — EDA.

**84. Іерархія AI.**

- ❌ ML > DL > AI > GenAI
- ✅ **AI ⊃ ML ⊃ DL ⊃ GenAI**
- 💡 **AI ⊃ ML ⊃ Deep Learning ⊃ Generative AI**.

**88. Дзе выкарыстоўваюць RL.**

- ❌ Кластарызацыя
- ✅ **Робататэхніка, гульні, аўтаматызацыя**
- 💡 RL — **робататэхніка, гульні, аўтаматызацыя**: аптымальныя дзеянні праз спробы, памылкі і ўзнагароды.

**96. Endpoint-ы Comprehend, якія не выкарыстоўваюцца.**

- ❌ AWS Compute Optimizer
- ✅ **AWS Trusted Advisor**
- 💡 **Trusted Advisor** (cost optimization) мае праверку endpoint-аў Comprehend, якія не выкарыстоўваюцца. Compute Optimizer падбірае памер EC2, Lambda і EBS.

### D2 — Fundamentals of Generative AI

**14. Адказ за лічаныя секунды.** Сітуацыя: мадэль павінна паспець адрэагаваць на збой абсталявання ў жорсткі ліміт часу; дадатковага навучання не будзе.

- ❌ кошт мадэлі
- ✅ **Памер мадэлі**
- 💡 Патрабаванне да latency → меншая мадэль = хутчэйшы inference.

**15. Падставіць прапушчаныя словы.** Сітуацыя: мадэль павінна прапаноўваць словы, якіх не хапае ў сказах.

- ❌ rule-based NLP
- ✅ **BERT**
- 💡 BERT навучаны на masked language modeling: прадказвае прапушчанае слова з кантэксту з абодвух бакоў.

**16. Сінтэтычныя даныя са статыстыкай арыгіналу.** Сітуацыя: трэба згенераваць рэалістычныя даныя, якія захоўваюць патэрны.

- ❌ WaveNet
- ✅ **GAN**
- 💡 GAN (генератар супраць дыскрымінатара) — рэалістычныя сінтэтычныя даныя. WaveNet — аўдыё і маўленне.

**17. Абарона ад prompt injection.** Сітуацыя: карыстальнікі спецыяльна падбіраюць увод, каб маніпуляваць LLM.

- ❌ абмежаваць адказы фіксаваным спісам
- ✅ **Prompt template**, які вучыць мадэль распазнаваць атакі
- 💡 Фіксаваныя адказы забіваюць карысць LLM. Правільна — інструкцыі/шаблоны і guardrails.

**18. Даныя для кастамізацыі ў Bedrock.** Сітуацыя: якія даныя патрэбныя для continued pre-training і fine-tuning.

- ❌ абодва метады — на размечаных даных
- ✅ **Continued pre-training — неразмечаныя**, **fine-tuning — размечаныя** даныя
- 💡 Continued pre-training — проста шмат тэкстаў дамена. Fine-tuning — пары prompt → completion.

**19. Вектарная база па змаўчанні.** Сітуацыя: што выкарыстоўвае Knowledge Bases for Amazon Bedrock пры quick create.

- ❌ Amazon Aurora
- ✅ **Amazon OpenSearch Serverless**
- 💡 Па змаўчанні — OpenSearch Serverless. Таксама падтрымліваюцца Aurora PostgreSQL (pgvector), Pinecone, Redis, MongoDB Atlas, Neptune Analytics.

**20. Як вучацца FM.** Сітуацыя: як ствараюцца меткі пры pre-training і што такое fine-tuning.

- ❌ pre-training — supervised
- ✅ **Pre-training — self-supervised**, **fine-tuning — supervised**
- 💡 Пры pre-training меткі бяруцца з саміх даных (наступны токен). Для fine-tuning патрэбныя размечаныя прыклады.

**21. Ліміт тэксту, які мадэль бачыць за раз.** 🔁 Сітуацыя: мадэль не можа ўлічыць больш за пэўны аб'ём тэксту.

- ❌ tokens
- ✅ **Context window**
- 💡 Токен — адзінка тэксту, context window — колькі токенаў мадэль бачыць за раз (уваход + выхад).

**61. Розныя адказы на адзін промпт.** Сітуацыя: той самы ўваход некалькі разоў дае розныя адказы.

- ❌ data drift
- ✅ **Nondeterminism**
- 💡 Прычына — sampling (temperature, top-p). Стабільнасць — temperature = 0.

**73. Тысячы апісанняў тавараў у адным стылі.**

- ❌ GAN
- ✅ **Transformer (LLM)**
- 💡 Генерацыя тэксту → **transformer (LLM)**. GAN і diffusion — пераважна для выяў.

**87. Мадэрнізацыя .NET і COBOL агентамі.**

- ❌ AWS Glue
- ✅ **AWS Transform**
- 💡 **AWS Transform** — AI-агенты для мадэрнізацыі (.NET, мэйнфрэйм, VMware). Glue займаецца ETL даных.

**90. FM і model customization.**

- ❌ Пераблытаныя азначэнні
- ✅ **FM — вялікая pretrained мадэль; customization — данавучанне**
- 💡 **FM** — вялікая мадэль, навучаная загадзя. **Customization** — працэс данавучання базавай мадэлі (fine-tuning, continued pre-training).

**93. Гатовыя AI-агенты для супрацоўнікаў.**

- ❌ AgentCore Runtime
- ✅ **Amazon Quick**
- 💡 Гатовы сэрвіс для супрацоўнікаў → **Amazon Quick** (Quick Suite). AgentCore — для распрацоўшчыкаў, якія будуюць сваіх агентаў; Lex — для стварэння чат-ботаў.

### D3 — Applications of Foundation Models

**22. Bedrock vs SageMaker JumpStart.** Сітуацыя: чым адрозніваецца доступ да гатовых мадэляў.

- ❌ пераблытаць, які сэрвіс што робіць
- ✅ **Bedrock** — FM праз адзін API (serverless); **JumpStart** — ML-хаб з мадэлямі, якія разгортваеш і кастамізуеш у SageMaker
- 💡 Bedrock = «бяры мадэль праз API». JumpStart = «разгарні мадэль у сябе ў SageMaker».

**23. Разбор юрыдычных дакументаў.** Сітуацыя: трэба выцягнуць тэкст, знайсці даты і сутнасці і зрабіць кароткі змест (тры адказы).

- ❌ не ўбачыць адзін з трох кампанентаў
- ✅ **Textract** + **Comprehend** + **GenAI-summarization**
- 💡 Textract — тэкст са сканаў. Comprehend — сутнасці і ключавыя фразы. LLM — кароткі змест.

**24. Перанесці веды на сумежную задачу.** Сітуацыя: мадэль, навучаную для адной задачы, трэба прыстасаваць да іншай, падобнай.

- ❌ reinforcement learning
- ✅ **Transfer learning**
- 💡 Transfer learning — перанос ведаў на сумежную задачу. RL — навучанне праз узнагароды.

**25. Аўдыёкурсы з тэксту.** Сітуацыя: трэба ператвараць тэкст у маўленне на розных мовах.

- ❌ Amazon Lex
- ✅ **Amazon Polly**
- 💡 Polly = тэкст → маўленне. Transcribe = маўленне → тэкст. Lex = чат-боты. Translate = пераклад.

**26. Перарывістая нагрузка, cold start дапушчальны.** Сітуацыя: не хочацца кіраваць інфраструктурай, трэба зэканоміць.

- ❌ Asynchronous inference
- ✅ **Serverless inference**
- 💡 Serverless — перарывістая нагрузка, без сервераў, cold start прымальны. Async — вялікія запыты (да 1 ГБ) і доўгая апрацоўка праз чаргу.

**27. Схаваць PII у зваротах падтрымкі.** Сітуацыя: перад індэксацыяй трэба выдаліць асабістыя даныя з тэксту.

- ❌ Amazon Lex
- ✅ **Amazon Comprehend**
- 💡 Comprehend выяўляе і маскіруе PII у тэксце. Lex — гэта чат-боты.

**28. Абмежаваць колькасць кандыдатаў на наступнае слова.** Сітуацыя: трэба задаць, з колькіх найбольш імаверных слоў выбіраць.

- ❌ Top P
- ✅ **Top K**
- 💡 Top K — КОЛЬКАСЦЬ кандыдатаў. Top P — сукупная ІМАВЕРНАСЦЬ. Temperature — выпадковасць.

**29. Вялікія запыты, адказ не тэрмінова.** Сітуацыя: файлы да 1 ГБ, вынікі патрэбныя толькі на штотыднёвай нарадзе.

- ❌ Batch inference
- ✅ **Asynchronous inference**
- 💡 Ключ — «менш за 1 ГБ» (ліміт async) і «не трэба адразу». Batch — для цэлага набору даных без асобных запытаў.

**30. Гатовыя CV-мадэлі з кастамізацыяй.** Сітуацыя: трэба хутка разгарнуць распазнаванне выяваў і падладзіць пад свой бізнес.

- ❌ Amazon SageMaker
- ✅ **Amazon Rekognition** (Custom Labels)
- 💡 Rekognition — гатовыя мадэлі + Custom Labels. SageMaker — усё будаваць самому, даўжэй.

**31. Для чаго Rekognition НЕ падыходзіць.** 🔁 Сітуацыя: выбраць сцэнар, які не пра выявы і відэа.

- ❌ бібліятэкі медыя з пошукам
- ✅ **Шматмоўны інтэрфейс** (гэта Amazon Translate)
- 💡 Rekognition — выявы і відэа. Пераклад і мовы — Translate.

**32. Ці дае AI-агент бізнес-каштоўнасць.** Сітуацыя: параўнаць агента з ранейшым працэсам, дзе працавалі толькі людзі.

- ❌ precision / recall / F1 класіфікатара
- ✅ **Task completion rate, кошт узаемадзеяння, CSAT**
- 💡 Бізнес-пытанне → бізнес-метрыкі. Precision/recall/F1 — тэхнічныя.

**33. Магчымасці SageMaker JumpStart.** Сітуацыя: выбраць дзве ключавыя функцыі.

- ❌ «толькі публічныя мадэлі»
- ✅ **Кастамізацыя мадэляў сваімі данымі** і **параўнанне FM па метрыках якасці**
- 💡 JumpStart: кастамізацыя, ацэнка і параўнанне FM, разгортванне ў адзін клік, ёсць і прапрыетарныя мадэлі.

**34. Што класці ў few-shot прыклады.** Сітуацыя: бот вызначае намер кліента (вяртанне, пытанне, тэхпраблема).

- ❌ «увод → гатовы адказ мадэлі»
- ✅ **«Увод → правільны intent»**
- 💡 Прыклады павінны паказваць менавіта той выхад, які патрэбны ад мадэлі.

**35. Запыт → пошук → CSV → S3.** Сітуацыя: шматкрокавы працэс з дзеяннямі, найменш аперацыйных намаганняў.

- ❌ асобная праграма без AI
- ✅ **AI-агент з інструментамі** (Agents for Amazon Bedrock / AgentCore)
- 💡 Задача з некалькімі крокамі і дзеяннямі → агент, які сам плануе і выклікае tools.

**36. Мадэрацыя з каштоўнасцямі платформы.** Сітуацыя: LLM павінна адпавядаць каштоўнасцям і ўвесь час падладжвацца пад новы шкодны кантэнт.

- ❌ статычны датасэт мінулых рашэнняў
- ✅ **RLHF з пастаяннай зваротнай сувяззю ад мадэратараў**
- 💡 «Каштоўнасці людзей» + «пастаянна адаптавацца» → RLHF.

**62. Inference на кастамізаванай мадэлі Bedrock.** Сітуацыя: мадэль данавучылі ў Bedrock, трэба яе запускаць.

- ❌ стварыць Knowledge Base
- ✅ **Provisioned Throughput** (або on-demand, дзе падтрымліваецца)
- 💡 Knowledge Base — гэта RAG, а не запуск мадэлі.

**63. Элементы добрага промпта.** Сітуацыя: якія складнікі павінен мець промпт.

- ❌ Instructions, **Hyperparameters**, Input data, Output indicator
- ✅ **Instructions, Context, Input data, Output indicator**
- 💡 Hyperparameters і temperature — налады, а не частка тэксту промпта.

**69. Рэзюмэ супраць эталона.**

- ❌ F1 score
- ✅ **ROUGE**
- 💡 Рэзюмэ супраць эталоннага → **ROUGE**. Пераклад супраць эталоннага → **BLEU**. F1 — для класіфікацыі, perplexity і loss эталона не патрабуюць.

**70. Пераклад супраць эталона.**

- ❌ ROUGE
- ✅ **BLEU**
- 💡 Пераклад → **BLEU**, рэзюмэ → ROUGE. Лёгка запомніць: BLEU = Bilingual.

**77. Калі падыходзіць RAG.**

- ❌ Рэкамендацыі тавараў
- ✅ **Чат-боты службы падтрымкі і медыцынскіх пытанняў па базе ведаў**
- 💡 RAG — калі адказ трэба ўзяць з **базы ведаў**. Рэкамендацыі робіць Personalize; арыгінальны кантэнт і выявы пошуку не патрабуюць.

**78. Тон брэнда ў чат-бота.**

- ❌ Паменшыць temperature
- ✅ **Ітэратыўна правіць промпт**
- 💡 Тон і стыль задаюцца **інструкцыямі ў промпце** (prompt engineering, ітэратыўна). Temperature змяншае выпадковасць, але тону не задае.

**81. Галюцынацыі ў ацэнцы Knowledge Bases.**

- ❌ Refusal
- ✅ **Faithfulness**
- 💡 **Faithfulness** — ці адпавядае адказ знойдзеным крыніцам. Completeness — ці адказана на ўсе часткі пытання, Refusal — ці адмаўляецца мадэль адказваць.

**83. Шматкрокавае разважанне.**

- ❌ Few-shot
- ✅ **Chain-of-thought**
- 💡 Разважанне крок за крокам → **chain-of-thought**. Few-shot — даць прыклады, negative — сказаць, чаго не рабіць.

**85. Выключыць аб'екты з выявы ў Nova Canvas.**

- ❌ Style prompt
- ✅ **Negative prompt**
- 💡 Выключыць нешта з выявы → **negative prompt**. Inpainting — змяніць частку выявы, outpainting — дамаляваць за межамі.

**86. Prompt Management + знешні API.**

- ❌ Prompt variables
- ✅ **Tools configuration**
- 💡 Выклік знешняга API → **tools configuration** (tool use). Prompt variables — толькі плэйсхолдэры ў шаблоне.

**91. Даныя кліента ў Bedrock.**

- ❌ «Перадаюцца правайдарам для аптымізацыі»
- ✅ **Не выкарыстоўваюцца для навучання і не перадаюцца правайдарам**
- 💡 Bedrock: даныя кліента **не выкарыстоўваюцца** для паляпшэння базавых мадэляў і **не перадаюцца** правайдарам.

**95. «Ты цяпер аналітык» і «уяві, што без правілаў».**

- ❌ Poisoning і exposure
- ✅ **Hijacking і jailbreaking**
- 💡 Змяніць задачу мадэлі → **hijacking**. Абыйсці абмежаванні («no rules», role-play) → **jailbreaking**.

**97. Калі SageMaker Async Inference.**

- ❌ Нагрузка, якая дапушчае cold starts
- ✅ **Вялікі payload да 1 ГБ і доўгая апрацоўка**
- 💡 **Async** — вялікі payload (да 1 ГБ) і доўгая апрацоўка. Увесь датасэт → batch transform, cold starts → serverless.

### D4 — Guidelines for Responsible AI

**37. Бяспечныя і рэлевантныя адказы.** Сітуацыя: трэба знізіць рызыку шкоднага кантэнту.

- ❌ пісаць свой API для праверкі адказаў
- ✅ **Яўныя інструкцыі ў промпце** трымацца тэмы
- 💡 Сярод такіх варыянтаў найлепшы — інструкцыі ў промпце. Калі ў варыянтах ёсць **Guardrails for Amazon Bedrock** — выбірай іх.

**38. Празрыстасць vs бяспека.** Сітуацыя: прапануюць апублікаваць дакладныя правілы і парогі guardrails.

- ❌ «чым больш дэталяў, тым лепш»
- ✅ **Раскрываць прызначэнне, абмежаванні і меры абароны на высокім узроўні**
- 💡 Дэталі абароны дапамагаюць зламыснікам. Узор — AWS AI Service Cards.

**39. Найбольш інтэрпрэтаваная мадэль.** Сітуацыя: выбраць метад, які лягчэй за ўсё растлумачыць.

- ❌ нейронныя сеткі
- ✅ **Лінейная рэгрэсія**
- 💡 White box: лінейная/лагістычная рэгрэсія, дрэвы. Нейронкі — black box. Інтэрпрэтаванасць ↔ дакладнасць.

**40. Энергаэфектыўнае навучанне.** Сітуацыя: трэба найлепшая энергаэфектыўнасць пры навучанні.

- ❌ Compute Optimized (C)
- ✅ **AWS Trainium**
- 💡 Trainium — для навучання, Inferentia — для inference. Sustainability → Trainium/Inferentia.

**41. Для чаго SageMaker Data Wrangler.** Сітуацыя: выбраць ключавы сцэнар.

- ❌ ML без кода
- ✅ **Выправіць bias, збалансаваўшы даныя**
- 💡 Data Wrangler — падрыхтоўка даных, у тым ліку балансаванне класаў. ML без кода — SageMaker Canvas.

**42. Як прыкметы ўплываюць на прагноз.** Сітуацыя: патрэбны сэрвіс для тлумачэння прагнозаў мадэлі.

- ❌ SageMaker Model Monitor
- ✅ **SageMaker Clarify**
- 💡 Clarify — тлумачальнасць (SHAP) і bias. Model Monitor — дрэйф у прадакшне.

**43. SHAP vs PDP.** Сітуацыя: чым адрозніваюцца гэтыя метады тлумачэння.

- ❌ «SHAP — глабальны погляд»
- ✅ **SHAP — лакальнае тлумачэнне**, **PDP — глабальнае**
- 💡 SHAP — уклад прыкмет у канкрэтны прагноз. PDP — як прыкмета ў сярэднім уплывае на ўсе прагнозы.

**44. Некаторыя групы недапрадстаўлены ў даных.** Сітуацыя: генератар выяваў рэдка паказвае пэўныя групы людзей.

- ❌ узяць іншую мадэль
- ✅ **Data augmentation** для недапрадстаўленых груп
- 💡 Праблема ў даных — выпраўляй даныя: дагенеруй прыклады.

**45. Мадэль горш працуе для некаторых груп.** Сітуацыя: падазраюць, што адны групы пера-, а іншыя недапрадстаўлены ў навучальных даных.

- ❌ observer bias
- ✅ **Sampling bias**
- 💡 Sampling bias — выбарка не адпавядае рэальнай папуляцыі. Observer bias — суб'ектыўнасць таго, хто назірае або размячае.

**46. Навошта празрыстая мадэль.** Сітуацыя: медыкі выбіраюць паміж складанай і зразумелай мадэллю (два адказы).

- ❌ «спрашчае інтэграцыю»
- ✅ **Давер да прагнозаў** і **лягчэйшая адладка**
- 💡 Празрыстасць дае давер і зручную адладку. Логіку мадэлі яна не хавае, а наадварот раскрывае.

**64. Промпты з памылкамі і падманам.** Сітуацыя: асістэнта тэстуюць друкарскімі памылкамі, дзіўнымі фармулёўкамі і наўмысна падманлівымі сцвярджэннямі.

- ❌ Fairness
- ✅ **Veracity and robustness**
- 💡 Нестандартныя і падманлівыя ўваходы → robustness. Fairness — пра роўнае стаўленне да груп.

**75. Responsible AI пры найме.**

- ❌ Ацэньваць толькі агульную accuracy
- ✅ **Правяраць вынікі па абароненых групах**
- 💡 Правяраць вынікі па абароненых групах. Агульная accuracy хавае bias, гістарычныя даныя яго паўтараюць, а канчатковае рашэнне павінен прымаць чалавек.

**79. Даследаваць bias пры 92% accuracy.**

- ❌ Выдаліць калонку рэгіёна без тэстаў
- ✅ **Subgroup analysis і аўдыт метак**
- 💡 Даследаваць bias: **subgroup analysis** і **аўдыт метак**. Агульная accuracy хавае праблему ў групе; калі проста выдаліць калонку, застануцца proxy-прыкметы.

**80. Бесстаронна і зразумела.**

- ❌ Controllability
- ✅ **Fairness і Explainability**
- 💡 Бесстаронна для груп → **Fairness**. Зразумела людзям → **Explainability**. Controllability — пра кіраванне паводзінамі сістэмы.

**89. Якія прыкметы ўплываюць на прагноз.**

- ❌ Loss-крывыя
- ✅ **Shapley values (SHAP)**
- 💡 Уплыў прыкмет → **SHAP**. Loss-крывыя, confusion matrix і accuracy паказваюць якасць, а не тое, што ўплывае на прагнозы.

**94. RLHF і human evaluation job.**

- ❌ «RLHF без людзей»
- ✅ **RLHF мяняе мадэль, evaluation толькі ацэньвае**
- 💡 **RLHF** мяняе мадэль па перавагах людзей. **Human evaluation job** толькі ацэньвае мадэлі.

### D5 — Security, Compliance, and Governance

**47. Знайсці адчувальныя даныя перад перадачай.** Сітуацыя: трэба выявіць PII у файлах, каб іх выпадкова не раскрыць.

- ❌ Amazon Inspector
- ✅ **Amazon Macie**
- 💡 Macie — PII у S3. Inspector — уразлівасці. GuardDuty — пагрозы.

**48. Навошта data lineage.** Сітуацыя: асноўная прычына адсочваць паходжанне даных.

- ❌ «паляпшае прадукцыйнасць мадэлі»
- ✅ **Кампліенс і прыватнасць** праз адсочванне руху і трансфармацыі даных
- 💡 Lineage — для аўдыту, кампліенсу і празрыстасці, а не для хуткасці.

**49. Максімальная адказнасць за бяспеку.** Сітуацыя: пры якім сцэнары кампанія адказвае за найбольшую частку бяспекі.

- ❌ fine-tuning чужой мадэлі
- ✅ **Навучанне сваёй мадэлі з нуля**
- 💡 Security Scoping Matrix: Scope 1 (consumer app) → 5 (свая мадэль з нуля = максімум адказнасці).

**50. Бачыць прамты і адказы мадэлі.** Сітуацыя: патрэбны поўны змест кожнага выкліку мадэлі.

- ❌ CloudTrail
- ✅ **Model invocation logging**
- 💡 Invocation logging = ЗМЕСТ (прамты і адказы). CloudTrail = ХТО і КАЛІ выклікаў API.

**51. Рэкамендацыі па кошце, бяспецы і ліматах.** 🔁 Сітуацыя: патрэбныя парады па аптымізацыі AWS-асяроддзя.

- ❌ AWS Config
- ✅ **AWS Trusted Advisor**
- 💡 Trusted Advisor — рэкамендацыі. Config — гісторыя і адпаведнасць канфігурацый.

**52. Поўны аўдыт выклікаў Bedrock.** Сітуацыя: трэба ведаць, хто і калі выклікаў мадэль, і захоўваць прамты з адказамі ў S3 (два адказы).

- ❌ Inspector для сканавання прамтаў
- ✅ **CloudTrail** + **model invocation logging у S3**
- 💡 Два сляды: CloudTrail (хто і калі) + invocation logging (што спыталі і што адказала мадэль).

**53. Нікога нельга ідэнтыфікаваць.** Сітуацыя: медыцынскія даныя перад fine-tuning (два адказы).

- ❌ шыфраванне KMS-ключом
- ✅ **Сінтэтычныя даныя** і **дэ-ідэнтыфікацыя** (маскіраванне, токенізацыя)
- 💡 Шыфраванне абараняе доступ, але мадэль усё роўна вывучыць асабістыя даныя. Іх трэба прыбраць або замяніць.

**54. Што азначае ISO/IEC 42001.** Сітуацыя: кампанія атрымала сертыфікат па кіраванні рызыкамі AI.

- ❌ «кожны AI-прадукт сертыфікаваны асобна»
- ✅ **Сістэма кіравання AI** арганізацыі адпавядае стандарту
- 💡 ISO 42001 = AI management system. Прадукты, мадэлі і людзей ён не сертыфікуе.

**55. Агент дзейнічае ад імя карыстальніка.** Сітуацыя: доступ да SaaS (Google Workspace, Salesforce) без жорстка прапісаных ключоў і са згоды карыстальніка.

- ❌ Amazon Macie
- ✅ **Amazon Bedrock AgentCore Identity**
- 💡 AgentCore Identity — OAuth-токены ад імя карыстальніка са сховішча токенаў (token vault).

**65. Каб мадэль не вывучыла PII.** Сітуацыя: fine-tuning LLM на даных кліентаў.

- ❌ зашыфраваць даныя ў S3 ключом KMS
- ✅ **Прыбраць PII з датасэта** да навучання
- 💡 Пры навучанні даныя дэшыфруюцца, і мадэль усё роўна іх убачыць. Guardrails дзейнічаюць ужо на адказах.

**66. Спампаваць сертыфікат AWS для аўдытараў.** Сітуацыя: патрэбны ISO/IEC 42001 сертыфікат, які ахоплівае Bedrock.

- ❌ AWS Trusted Advisor
- ✅ **AWS Artifact**
- 💡 Compliance-справаздачы і сертыфікаты AWS → Artifact.

**67. Дысцыпліна Scoping Matrix для пагроз.** Сітуацыя: якая дысцыпліна выяўляе пагрозы і рэкамендуе меры.

- ❌ Governance and compliance
- ✅ **Risk management**
- 💡 Пяць дысцыплін: governance & compliance, legal & privacy, risk management, controls, resilience.

**68. Гарантаваны ліміт для агента.** Сітуацыя: агент праз AgentCore Gateway стварае замовы; трэба гарантыя, што ніколі не будзе замовы больш за $10 000, нават пры prompt injection.

- ❌ denied topic у Guardrails
- ✅ **Policy ў Amazon Bedrock AgentCore**
- 💡 Гарантыя = праверка па-за мадэллю на кожным выкліку інструмента. Промпт можна абысці, Guardrails фільтруюць тэкст.

**74. Забараніць мадэлі ва ўсіх акаўнтах Organizations.**

- ❌ AWS Trusted Advisor
- ✅ **Service control policies (SCP)**
- 💡 **SCP** у AWS Organizations задаюць верхнюю мяжу правоў для ўсіх акаўнтаў; лакальны адмін не можа яе абыйсці. CloudTrail толькі запісвае.

**92. Threat detection і vulnerability management.**

- ❌ Пераблытаныя азначэнні
- ✅ **Актыўныя пагрозы зараз / слабыя месцы для выпраўлення**
- 💡 **Threat detection** — актыўныя пагрозы зараз (GuardDuty). **Vulnerability management** — слабыя месцы, якія трэба закрыць (Inspector).

**98. Блакаваць prompt attacks, але не свой system prompt.**

- ❌ Word filter на «instructions»
- ✅ **Prompt attack filter + input tags**
- 💡 **Prompt attack filter** выяўляе jailbreak і injection; **input tags** пазначаюць, што правяраць трэба толькі ўвод карыстальніка, а не свой system prompt.
