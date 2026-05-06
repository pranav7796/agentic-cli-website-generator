# Agentic CLI Website Generator

This project is a conversational CLI agent that generates a Scaler Academy-style landing page using HTML, CSS, and JavaScript. It follows a tool-driven reasoning loop and writes real files to disk so the output can be opened directly in a browser.

## What This Does
- Accepts a natural-language instruction in the terminal
- Runs an agent loop (START -> THINK -> TOOL -> OBSERVE -> OUTPUT)
- Generates a complete landing page with required sections
- Writes output to a local folder and opens the page in a browser
- Falls back to a local template if no API key is provided

## Architecture (High Level)
- `index.js` handles the CLI, tool calls, and model streaming.
- The agent emits a final OUTPUT step with files to write (index.html, styles.css, app.js).
- Files are written into `scaler_clone/` and opened in the default browser.

## Requirements
- Node.js 18+ (tested with Node 22)
- OpenRouter API key (optional, for model-driven generation)

## Setup
Install dependencies:

```powershell
npm install
```

Set your API key (PowerShell):

```powershell
$env:OPENROUTER_API_KEY = "your_key_here"
```

## Run
Launch the CLI:

```powershell
node index.js
```

Example prompt:

```
Clone the Scaler Academy landing page with a dark navy header, hero section, and footer.
```

## Output
The generated site is written to `scaler_clone/`:
- index.html
- styles.css
- app.js

If the API key is not set, the CLI generates a styled fallback page that still meets the assignment requirements.

## Folder Structure
- `index.js` - CLI agent entrypoint
- `scaler_clone/` - generated website output (ignored in git)
- `scripts/` - helper scripts used during development

## Notes
- Do not commit `.env` or `node_modules`.
- The CSS uses gradients and orb effects to resemble the Scaler hero visual.

## Assignment Checklist
- CLI agent that accepts user instructions
- Step-based reasoning loop with tool calls
- Generates working HTML/CSS/JS output
- Output visually resembles Scaler Academy landing page
