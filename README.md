<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/cover.png">
  <source media="(prefers-color-scheme: light)" srcset="/.github/cover_light.png">
    <img alt="econecta" src="/.github/cover_light.png">
</picture>

## 📱 Sobre

Este repositório contém o aplicativo móvel oficial do Econecta, permitindo que cidadãos, prefeitura, cooperativas e empresas de coleta se conectem para denúncias, solicitações e maior transparência na gestão de resíduos.

O aplicativo é construído com React Native e Expo, focado em performance, usabilidade e integração com o ecossistema ambiental.

> [!WARNING]
> Este projeto é um **_trabalho em andamento_**! Estamos desenvolvendo ativamente recursos e melhorando a experiência. Verifique frequentemente por atualizações.

## 🚀 Funcionalidades

- **Denúncias e solicitações de coleta**  
  Registre denúncias de descarte irregular e solicite coletas diretamente no app.
- **Mapa de pontos de reciclagem**  
  Explore e consulte pontos de coleta de resíduos na cidade.
- **Integração com comunidade**  
  Ferramentas para engajamento comunitário, compartilhamento de boas práticas e informações sobre reciclagem.
- **Transparência e acompanhamento**  
  Acompanhe o status de solicitações e visualize dados sobre gestão de resíduos.
- **Notificações e atualizações**  
  Receba alertas sobre coletas, campanhas ambientais e atualizações do app.

## 📦 Estrutura do Projeto

- `app/` — Rotas e telas do aplicativo (usando expo-router)
    - `(app)/` — Telas principais (tabs, account, submit)
    - `(permissions)/` — Telas de permissões (câmera, localização)
    - `auth/` — Autenticação e callbacks
- `components/` — Componentes reutilizáveis da UI
- `constants/` — Constantes do app (categorias, temas, etc.)
- `hooks/` — Hooks personalizados (use-color-scheme, use-storage-state)
- `lib/` — Utilitários e API
- `providers/` — Provedores de contexto (cache, session)
- `types/` — Tipos TypeScript
- `assets/` — Imagens, ícones e outros recursos
- `android/` — Configurações de build para Android

## 🛠️ Executando Localmente

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
3. Execute no emulador ou dispositivo:
    ```bash
    npm run android  # Para Android
    npm run ios      # Para iOS (se aplicável)
    npm run web      # Para web
    ```

> Requer [Node.js](https://nodejs.org/) e [Expo CLI](https://docs.expo.dev/get-started/installation/) instalados. Para desenvolvimento Android, instale o [Android Studio](https://developer.android.com/studio).

### Variáveis Sensíveis e Configurações

- Configure chaves de API (como Google Maps) no `app.json` ou via variáveis de ambiente.
- Para build de produção, configure o EAS Build conforme `eas.json`.

## 🤝 Contribuindo

Contribuições são bem-vindas!

- Encontrou um bug? Abra uma [issue](https://github.com/appeconecta/mobile/issues)
- Tem uma ideia de funcionalidade? Sugira ou envie um PR
- Interessado em design móvel? Ajude-nos a melhorar a UI e a experiência!

### Equipe

- **Eduardo Maciel Alexandre** (UI/UX Designer)
- **Lucas Cassiano Maciel dos Santos** (Desenvolvedor Backend)
- **Maria Letícia Ventura de Oliveira** (Desenvolvedora Frontend)
