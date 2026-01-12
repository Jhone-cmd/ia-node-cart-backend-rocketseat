# IA Node Cart Backend

Projeto backend de exemplo (NestJS) que implementa catálogo, carrinho de compras e integração com LLMs para sugerir carrinhos, webhooks e endpoints de chat.

Feito a aplicação assistindo às aulas da plataforma RocketSeat.

**Funcionalidades principais**
- **Catálogo**: endpoints para consultar produtos por loja, preços e disponibilidade.
- **Carrinho (Cart)**: montar e sugerir carrinhos por loja, calcular quantidades e scores.
- **Chat / Assistente**: integração com LLMs (OpenAI / Gemini) para interpretar intenções do usuário e sugerir ações (`send_message`, `suggest_carts`).
- **Webhooks**: endpoints para receber eventos (por exemplo, processamento em lote de embeddings).
- **Middleware**: parsing de body bruto e JSON personalizado para lidar com webhooks e assinaturas.

**Regras e comportamentos importantes**
- O assistente LLM deve retornar ações padronizadas: `send_message` e `suggest_carts`.
- Ao sugerir carrinhos, os `id`s dos produtos devem ser os ids reais disponibilizados por cada loja — o LLM não deve inventar ids.
- O cálculo de `score` dos carrinhos é baseado na disponibilidade e correspondência dos produtos.
- Webhooks de processamento em lote devem ser tratados com segurança (verificar `webhookSecret`).

**Estrutura de pastas (visão resumida)**

- [src](src)
  - [main.ts](src/main.ts#L1) : ponto de entrada do NestJS
  - [app.module.ts](src/app.module.ts#L1)
  - [webhooks.controller.ts](src/webhooks.controller.ts#L1)
  - cart/
    - [cart.controller.ts](src/cart/cart.controller.ts#L1)
    - [cart.service.ts](src/cart/cart.service.ts#L1)
  - catalog/
    - [catalog.controller.ts](src/catalog/catalog.controller.ts#L1)
    - [catalog.service.ts](src/catalog/catalog.service.ts#L1)
  - chat/
    - [chat.controller.ts](src/chat/chat.controller.ts#L1)
    - [chat.service.ts](src/chat/chat.service.ts#L1)
  - middlewares/
    - [json-body.middleware.ts](src/middlewares/json-body.middleware.ts#L1)
    - [raw-body.middleware.ts](src/middlewares/raw-body.middleware.ts#L1)
  - shared/
    - [postgres.service.ts](src/shared/postgres.service.ts#L1)
    - llm/
      - [openai-llm.service.ts](src/shared/llm/openai-llm.service.ts#L1)
      - gemini-llm.service.ts

Arquivos de teste: [test](test) com e2e specs.

**Variáveis de ambiente (recomendadas)**
Crie um arquivo `.env` na raiz com as variáveis necessárias. Exemplo:

```
PORT=3000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=ia_cart_db
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
WEBHOOKS_OPENAI_KEY=whsec_xxxxx
```

Observações:
- O serviço de Postgres usa `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_DATABASE` ([src/shared/postgres.service.ts](src/shared/postgres.service.ts#L1)).
- A integração OpenAI usa `OPENAI_API_KEY` e `WEBHOOKS_OPENAI_KEY` ([src/shared/llm/openai-llm.service.ts](src/shared/llm/openai-llm.service.ts#L1)).

**Como executar (desenvolvimento)**

1. Instalar dependências (usa `pnpm` neste projeto):

```bash
pnpm install
```

2. Rodar em modo de desenvolvimento (Hot reload):

```bash
pnpm run dev
```

3. Endpoints estarão disponíveis em `http://localhost:3000` (ou porta definida em `PORT`).

**Build e produção**

```bash
pnpm run build
pnpm run start:prod
```

**Testes**

- Testes unitários / integrações: `pnpm run test`
- Testes e2e: `pnpm run test:e2e`

**Banco de dados**

Existe um dump SQL em `src/database/dump.sql` para popular um banco de desenvolvimento. Por exemplo, para importar localmente:

```bash
psql -h $PG_HOST -U $PG_USER -d $PG_DATABASE -f src/database/dump.sql
```

**Notas sobre LLMs e segurança**
- Tenha cuidado ao expor chaves de API. Use variáveis de ambiente e não commit em repositório.
- Webhooks devem validar assinaturas quando aplicável (verificar `WEBHOOKS_OPENAI_KEY`).

**Observações finais**
- Este projeto foi montado e documentado com base nas aulas da RocketSeat como referência e aprendizado.

---

Arquivo gerado automaticamente por assistência; revisar variáveis sensíveis antes de rodar em produção.
