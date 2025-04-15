# DL Master · 🟢 DataLayer Logger Chrome Extension

**DL Master** é uma extensão para Google Chrome que permite rastrear, visualizar e exportar facilmente os eventos do [Google Tag Manager DataLayer](https://developers.google.com/tag-manager/devguide) de qualquer site. Exporta nos formatos ideais para o Google Sheets e também para análise de IA, além de indicar visualmente quando a gravação está ativa ou pausada.

---

## ✨ Recursos

- **Captura automática** de todos os pushs do `dataLayer`, até em sites protegidos por CSP.
- **Download em três formatos:**
  - CSV para Sheets (colunas separadas, fácil leitura em planilhas)
  - CSV para IA (campos ricos em JSON, pronto para análise automática)
  - "Raw" (cada evento inteiro numa linha/célula, JSON)
- **Indicação visual:**  
  - Badge vermelha "REC" no ícone da extensão quando está gravando  
  - Badge verde "ON" quando parado
- **Visual moderno e botões intuitivos**
- **Sem atalhos** para evitar conflitos
- **Compatível com Manifest V3** e rodando em dezenas de sites GTM

---

## 🛠️ Instalação e uso

1. **Clone ou baixe** este repositório:
    ```bash
    git clone https://github.com/seuusuario/dl-master.git
    ```
2. **Abra o Chrome** e vá para [chrome://extensions/](chrome://extensions/)
3. Ative o **Modo do desenvolvedor**
4. Clique em **"Carregar sem compactação"** e selecione a pasta do projeto.

**Pronto! Aparecerá um ícone na barra do Chrome.**

---

## ✅ Como usar

1. Acesse o site que deseja monitorar (`https://www.site-cliente.com`)
2. Clique no ícone da extensão.
3. Clique em **"Iniciar"** (badge do ícone ficará vermelha/REC).
4. Navegue/puxe eventos, interaja normalmente.
5. Abra a extensão novamente e clique em **"Parar"** (badge fica verde/ON).
6. Escolha como deseja exportar:
    - **Baixar para Sheets:** planilha comum, campos separados.
    - **Baixar para IA:** campos de objeto salvos como JSON, ideal para análise automática.
    - **Baixar 1 objeto por linha:** cada linha é um evento em JSON único (ideal para importar/filtros em IA ou Sheets).

**Dica:**  
Arraste direto o arquivo baixado para uma planilha do Google, ou importe em `Arquivo > Importar`.

---

## 🧑‍💻 Formatos de Exportação

| Botão        | Formato CSV                            | Recomendações         |
|--------------|----------------------------------------|-----------------------|
| Sheets       | Colunas separadas, valores flatten      | Para análise manual   |
| IA           | Campos objeto/array como JSON puro      | Para ML, automação IA |
| Raw          | 1 coluna com evento JSON inteiro        | Para parse avanzado   |

---

## 🟩 Pontos de destaque

- Mantém todos os pushs do DataLayer (inclusive históricos)
- Não sobrescreve dados de outros sites
- Visual limpo e fácil de usar
- Sem coleta ou envio de dados pessoais

---

## 🚦 Limitações

- Sites com CSP **extremamente** restritiva podem não ser compatíveis (raríssimo hoje).
- Importação automática para Google Sheets requer download manual do CSV e upload na planilha.
- Eventos só são capturados após clicar em "Iniciar".

---

## 🌱 Contribua

- Pull requests e sugestões são bem-vindos!
- [Abra issues](https://github.com/seuusuario/dl-master/issues) para dúvidas ou melhorias.

---

## 📄 Licença

[MIT](LICENSE)

---

> Feito com 💚 para facilitar diagnóstico e auditoria de dados do DataLayer Google Tag Manager.
