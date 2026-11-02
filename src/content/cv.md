Director of Data Science and AI with 8 years in applied machine learning, including 3+ years designing, evaluating and shipping production LLM systems, from multimodal product features serving millions of users to internal company agents. Currently leading company-wide AI adoption at Popsa. Spoke at the AWS Startup Loft, Manchester, on deploying generative AI in production.

## Experience

### Popsa, London: Director of Data Science and AI (Sep 2026 – Present)

- Promoted to Director after leading the Claude and Claude Code rollouts, to take AI adoption company-wide through live demos, lunch-and-learns and practical guidance. Rolled out Claude to the entire business and continue to own the product data science and AI roadmap, line-managing and hiring data scientists.
- Deployed Claude Tag across 69 Slack channels with 12 Bundles and 32 connectors, including secure access to analytical data through AWS identities.
- Created and maintain two internal plugin marketplaces on GitHub, for the marketing and engineering teams. Monitoring skill usage data shows what type of work is being done with AI and where there are gaps.

### Popsa, London: Lead Data Scientist (Dec 2021 – Aug 2026)

- Designed and deployed Popsa's first agentic system, a customer support agent built on Bedrock AgentCore and Claude that handles 150+ tickets a day, populating Zendesk tickets with order and user data (live since July 2025). A version that drafts and sends customer replies has been tested in shadow mode with the CS team on real tickets and is due to launch in November 2026.
- Led the multimodal AI Caption feature, generating photobook captions from photo metadata and image content with Claude via AWS Bedrock. Served 2M+ captions and drove a 5% increase in purchases, rising a further 2.5% with version two.
- Built a title suggestion feature with an online evaluation framework, A/B testing Amazon Nova, OpenAI and Claude across models and prompts. The feature served over 5 million titles last year with positive feedback rising to 71%, from 58% on the algorithmic version the previous year. Co-wrote a [post on the AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/how-popsa-used-amazon-nova-to-inspire-customers-with-personalised-title-suggestions/).
- Led the data science and machine learning behind Memories, which curates trips, rewinds and portrait albums from users' photo libraries without uploading a single photo, using on-device CNNs, face embeddings, timestamps and location, with only metadata leaving the phone. Since its 2026 soft launch it has generated 80M+ memories for 1.1M users, with notification click-through 20x the usual rate.
- Rolled out Claude Code to all 19 engineers in August 2025, all of whom are weekly active users. With the same team, merged pull requests have risen from ~71 to 153 a week while median PR size grew from 37 to 69 lines.
- Spoke at the AWS Startup Loft, Manchester (Sep 2025) to ~100 people on deploying generative AI in production.

### Franceys Consulting (freelance), London: Python and ML Consultant (Mar 2023 – Jun 2023)

- With a partner, scoped and delivered a paid engagement with Filtered, a learning-tech startup, embedding as senior Python engineers with its engineering team. Involved weekly coaching sessions with engineers, pull request reviews and a comprehensive review of the existing codebase.
- Advised on making the team's ChatGPT-powered search production-ready with async OpenAI calls, retries and load testing. The endpoint became 3x faster and failures under load fell from 86% to 0%.
- Advised their ML engineer on moving memory-heavy background jobs from Celery to AWS Batch on EKS; it went into production shortly after the engagement.

### Popsa, London: Senior Data Scientist (Oct 2020 – Dec 2021)

- Built the first production ML services using FastAPI, Docker and Kubernetes. They handle 80M+ requests a year and are still the template for all current services.
- Designed an ML pipeline in PyTorch and AWS SageMaker, training on tens of millions of proprietary images and deploying to mobile.
- Designed and deployed the first distributed data pipeline (AWS Glue and Spark) extracting data from DynamoDB, now the team's data warehouse via Athena and PostgreSQL connectors.

### Channel 4, London: Data Scientist (Sep 2017 – Oct 2020)

- Built and productionised classification models that segment All4 viewers into demographic and interest groups, building custom audiences (e.g. "foodies") for specific advertisers with Channel 4's ad sales team, supporting £100m of targeted digital advertising revenue.
- Built the world-first Contextual Moments product, using computer vision on video and NLP on subtitles to automatically find moments in programmes that advertisers could buy against. It generated £8m+ in incremental revenue.
- Forecast TV viewing figures with regression and boosted tree models (e.g. CatBoost), delivering £12m in commercial value.
- Automated the team's data science products on AWS, halving running costs.

### UBS Asset Management, London: Product Specialist, Industrial Placement (Jul 2015 – Aug 2016)

## Projects

### FPL Natural Language Search (2026)

Natural-language search over Fantasy Premier League player data, using Claude Haiku to generate SQL. Built with Claude Code, including an evaluation harness of question/SQL pairs; then used Claude Opus to propose latency optimisations, keeping only changes that passed the harness (p50 948 → 854 ms, p99 2.6 → 2.2 s). [Try it](https://bradleygrantham.com/fpl) · [blog post](https://bradleygrantham.com/blog/fpl-search/) · [GitHub](https://github.com/BradleyGrantham/search-fpl)

### Twitch DevJam: Honorable Mention, $1,000 (2019)

Twitch extension using a PyTorch CNN to detect Fortnite wins live, with no setup needed from the broadcaster. [Devpost](https://devpost.com/software/victory-royale-tracker) · [blog post](https://bradleygrantham.com/blog/victory-royale-tracker/)

### Predicting Football Matches from FIFA Ratings (2018)

TensorFlow neural network predicting Premier League odds from each team's FIFA ratings and formation. [Blog post](https://bradleygrantham.com/blog/predicting-premier-league-odds/) · [GitHub](https://github.com/BradleyGrantham/fifa-stats-scraper)

## Skills and technologies

**AI and LLMs:** Agent development, prompt engineering, LLM evaluation (offline harnesses, online A/B testing), MCP, multimodal models · Claude, OpenAI, Amazon Nova · AWS Bedrock, Bedrock Agents, AgentCore, Strands · Claude Code, Codex, Cursor

**Engineering:** Python, FastAPI, Docker, Kubernetes, AWS (SageMaker, Glue, Athena, DynamoDB), Spark, PostgreSQL, Git

**Machine learning:** PyTorch, TensorFlow, scikit-learn · deep learning, computer vision, NLP, boosted trees, statistical testing

## Education

### University College London (UCL): MRes Web Science and Big Data Analytics, Distinction (2017 – 2018)

Machine learning research degree in the Department of Computer Science, funded by Channel 4 alongside my role there.

### University of Bath: BSc Physics with Placement, First Class Honours (2013 – 2017)
