import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";
import fs from "fs";
import path from "path";
import readline from "readline";
import { exec } from "child_process";

const openrouter = process.env.OPENROUTER_API_KEY
        ? new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })
        : null;

const outputRoot = path.join(process.cwd(), "scaler_clone");

async function createFolder(folderPath) {
        fs.mkdirSync(folderPath, { recursive: true });
        return `Folder ${folderPath} ready`;
}

async function writeFile({ filename, content }) {
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        fs.writeFileSync(filename, content, "utf8");
        return `File ${filename} created`;
}

async function openBrowser(filePath) {
        return new Promise((resolve, reject) => {
                const command = `start "" "${filePath}"`;

                exec(command, { windowsHide: true }, error => {
                        if (error) {
                                reject(error);
                                return;
                        }

                        resolve(`Opened ${filePath} in browser`);
                });
        });
}

const tool_map = {
        createFolder,
        writeFile,
        openBrowser
};

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

const userInput = await new Promise(resolve =>
        rl.question("Enter your prompt: ", resolve)
);

function logStep(step) {
        console.log(JSON.stringify(step, null, 2));
}

function extractJsonObject(text) {
        const trimmed = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

        try {
                return JSON.parse(trimmed);
        } catch {
        const match = trimmed.match(/\{[\s\S]*\}/);
        return match ? JSON.parse(match[0]) : null;
    }
}

function normalizeToolArgs(toolArgs) {
        if (toolArgs && typeof toolArgs === "string") {
                try {
                        return JSON.parse(toolArgs);
                } catch {
                        return toolArgs;
                }
        }

        return toolArgs;
}

function buildSiteFiles() {
        const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scaler Academy Clone</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <header class="site-header">
        <div class="container nav-shell">
            <a class="brand" href="#home" aria-label="Scaler Academy home">
                <span class="brand-mark">S</span>
                <span class="brand-text">Scaler</span>
            </a>
            <nav class="nav-links" aria-label="Primary navigation">
                <a href="#why">Why Scaler</a>
                <a href="#programs">Programs</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#stats">Results</a>
            </nav>
            <div class="nav-actions">
                <a class="login-link" href="#">Login</a>
                <a class="btn btn-primary placement" href="#">Placement Report</a>
            </div>
        </div>
    </header>

    <main id="home">
        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">India's most trusted tech upskilling platform</p>
                    <h1>Build a <span class="accent">career transformation</span> with Scaler-level learning.</h1>
                    <p class="hero-text">
                        Learn from industry leaders, master in-demand skills, and unlock premium opportunities with a structured curriculum designed for working professionals.
                    </p>
                    <div class="hero-actions">
                        <a class="btn btn-primary" href="#programs">Explore Programs</a>
                        <a class="btn btn-secondary" href="#why">Know More</a>
                    </div>
                </div>
                <div class="hero-visual" aria-hidden="true">
                    <div class="orb orb-a"></div>
                    <div class="orb orb-b"></div>
                    <div class="orb orb-c"></div>
                    <div class="hero-card">
                        <span class="hero-card-label">Average hike</span>
                        <strong>3.5x career growth</strong>
                        <p>Hands-on learning, interview support, and mentor guidance.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-dark" id="why">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow eyebrow-light">Why Scaler</p>
                    <h2>Designed to turn ambition into outcomes.</h2>
                </div>
                <div class="card-grid four-up">
                    <article class="feature-card">
                        <h3>Structured curriculum</h3>
                        <p>Industry-aligned paths that move from fundamentals to advanced problem solving with clarity.</p>
                    </article>
                    <article class="feature-card">
                        <h3>Expert mentors</h3>
                        <p>Learn from engineers and leaders who ship products at scale and know what hiring teams expect.</p>
                    </article>
                    <article class="feature-card">
                        <h3>Mock interviews</h3>
                        <p>Practice with realistic interview simulations that sharpen communication and technical depth.</p>
                    </article>
                    <article class="feature-card">
                        <h3>Career support</h3>
                        <p>From resume reviews to referrals, the ecosystem helps you move faster toward the right role.</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="section" id="programs">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Programs</p>
                    <h2>Choose a path that matches your career goal.</h2>
                </div>
                <div class="card-grid programs-grid">
                    <article class="program-card">
                        <span>01</span>
                        <h3>Software Development</h3>
                        <p>Strong foundations in DSA, system design, and full-stack product thinking.</p>
                    </article>
                    <article class="program-card">
                        <span>02</span>
                        <h3>Data Science</h3>
                        <p>Analytics, experimentation, machine learning, and storytelling with data.</p>
                    </article>
                    <article class="program-card">
                        <span>03</span>
                        <h3>System Design</h3>
                        <p>Build scalable solutions and learn to make trade-offs like a senior engineer.</p>
                    </article>
                    <article class="program-card">
                        <span>04</span>
                        <h3>AI & ML</h3>
                        <p>Modern AI concepts, model evaluation, and practical deployment workflows.</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="section section-soft" id="testimonials">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Testimonials</p>
                    <h2>What learners say after the switch.</h2>
                </div>
                <div class="card-grid testimonials-grid">
                    <article class="testimonial-card">
                        <p>"The structure and mentorship made interview prep feel much less overwhelming."</p>
                        <strong>Aarav, Software Engineer</strong>
                    </article>
                    <article class="testimonial-card">
                        <p>"I went from scattered learning to a clear roadmap and a stronger portfolio."</p>
                        <strong>Meera, Data Analyst</strong>
                    </article>
                    <article class="testimonial-card">
                        <p>"The mock interviews and feedback were the difference between stuck and ready."</p>
                        <strong>Rahul, Backend Developer</strong>
                    </article>
                </div>
            </div>
        </section>

        <section class="section" id="stats">
            <div class="container stats-grid">
                <div class="stat-card">
                    <strong>96%</strong>
                    <span>of learners rate the experience highly</span>
                </div>
                <div class="stat-card">
                    <strong>25 LPA</strong>
                    <span>headline roles reached by top performers</span>
                </div>
                <div class="stat-card">
                    <strong>150%</strong>
                    <span>average career acceleration reported by alumni</span>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container footer-grid">
            <div>
                <div class="brand footer-brand">
                    <span class="brand-mark">S</span>
                    <span class="brand-text">Scaler</span>
                </div>
                <p>Upskilling ambitious engineers for the next leap in their careers.</p>
            </div>
            <div>
                <h3>Explore</h3>
                <a href="#why">Why Scaler</a>
                <a href="#programs">Programs</a>
                <a href="#testimonials">Testimonials</a>
            </div>
            <div>
                <h3>Support</h3>
                <a href="#">Login</a>
                <a href="#">Placement Report</a>
            </div>
        </div>
    </footer>

    <script src="app.js"></script>
</body>
</html>`;

        const stylesCss = `:root {
    --bg: #f6f8fc;
    --surface: #ffffff;
    --navy: #0b1f3a;
    --navy-2: #102a4d;
    --blue: #1b7cff;
    --blue-2: #4da3ff;
    --text: #122033;
    --muted: #5f6f85;
    --border: rgba(18, 32, 51, 0.1);
    --shadow: 0 22px 60px rgba(9, 23, 45, 0.12);
}

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: Inter, sans-serif;
    background: radial-gradient(circle at top, rgba(27, 124, 255, 0.09), transparent 34%), var(--bg);
    color: var(--text);
}

a {
    color: inherit;
    text-decoration: none;
}

.container {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
}

.site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(16px);
    background: rgba(11, 31, 58, 0.92);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-shell {
    min-height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-weight: 800;
    letter-spacing: 0.02em;
}

.brand-mark {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--blue), var(--blue-2));
    color: #fff;
}

.nav-links {
    display: flex;
    gap: 24px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 14px;
}

.login-link {
    color: #fff;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 22px;
    border-radius: 999px;
    font-weight: 700;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn:hover {
    transform: translateY(-1px);
}

.btn-primary {
    background: linear-gradient(135deg, var(--blue), var(--blue-2));
    color: #fff;
    box-shadow: 0 12px 30px rgba(27, 124, 255, 0.32);
}

.btn-primary.placement {
    padding: 10px 24px;
}

.btn-secondary {
    border: 1.5px solid rgba(27, 124, 255, 0.4);
    color: var(--blue);
    background: rgba(255, 255, 255, 0.72);
}

.hero {
    padding: 96px 0 72px;
    background: linear-gradient(180deg, rgba(7, 22, 43, 0.98) 0%, rgba(8, 26, 51, 0.94) 100%);
    color: #fff;
    overflow: hidden;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 44px;
    align-items: center;
}

.hero-copy h1,
.section-heading h2 {
    margin: 0;
    line-height: 1.04;
    letter-spacing: -0.03em;
}

.hero-copy h1 {
    font-size: clamp(3rem, 6.8vw, 6rem);
    max-width: 14ch;
    line-height: 1.02;
    font-weight: 800;
}

.hero-copy h1 .accent {
    background: linear-gradient(90deg, #6fb3ff 0%, #6d9bff 40%, #9b6dff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.eyebrow {
    margin: 0 0 16px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.76rem;
    color: var(--blue);
    font-weight: 800;
}

.eyebrow-light {
    color: #8fc1ff;
}

.hero-text {
    margin: 20px 0 0;
    max-width: 60ch;
    color: rgba(255, 255, 255, 0.76);
    font-size: 1.04rem;
    line-height: 1.7;
}

.hero-actions {
    display: flex;
    gap: 14px;
    margin-top: 28px;
    flex-wrap: wrap;
}

.hero-visual {
    position: relative;
    min-height: 500px;
    border-radius: 34px;
    background: radial-gradient(circle at 22% 30%, rgba(100, 176, 255, 0.4), transparent 22%),
        radial-gradient(circle at 72% 24%, rgba(135, 92, 255, 0.34), transparent 26%),
        linear-gradient(145deg, rgba(17, 49, 96, 0.55), rgba(16, 42, 77, 0.12));
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(0.2px);
}

.orb-a {
    width: 260px;
    height: 260px;
    top: 40px;
    left: 40px;
    background: radial-gradient(circle at 30% 30%, rgba(111,179,255,0.95), rgba(11,107,255,0.9) 45%, rgba(27,124,255,0.08) 72%);
    box-shadow: 0 0 120px rgba(79, 151, 255, 0.35);
}

.orb-b {
    width: 200px;
    height: 200px;
    right: 96px;
    top: 56px;
    background: radial-gradient(circle at 30% 30%, rgba(208,151,255,0.94), rgba(125,69,255,0.88) 48%, rgba(125,69,255,0.08) 74%);
    box-shadow: 0 0 100px rgba(148, 109, 255, 0.4);
}

.orb-c {
    width: 140px;
    height: 140px;
    right: 56px;
    bottom: 82px;
    background: radial-gradient(circle at 30% 30%, rgba(110,209,255,0.94), rgba(27,124,255,0.9) 50%, rgba(27,124,255,0.08) 76%);
}

.hero-card {
    position: absolute;
    left: 28px;
    bottom: 26px;
    width: min(290px, calc(100% - 56px));
    padding: 22px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.9);
    color: var(--text);
    box-shadow: var(--shadow);
}

.hero-card-label {
    display: block;
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    color: var(--blue);
    font-weight: 800;
}

.hero-card strong {
    display: block;
    margin-top: 10px;
    font-size: 1.45rem;
}

.hero-card p {
    margin: 10px 0 0;
    color: var(--muted);
    line-height: 1.6;
}

.section {
    padding: 82px 0;
}

.section-dark {
    background: linear-gradient(180deg, #0b1f3a 0%, #09162a 100%);
    color: #fff;
}

.section-soft {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.72));
}

.section-heading {
    display: grid;
    gap: 12px;
    margin-bottom: 30px;
}

.section-heading h2 {
    font-size: clamp(2rem, 4vw, 3.1rem);
    max-width: 14ch;
}

.section-dark .section-heading h2 {
    max-width: 12ch;
}

.card-grid {
    display: grid;
    gap: 20px;
}

.four-up {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-card,
.program-card,
.testimonial-card,
.stat-card {
    border-radius: 24px;
    box-shadow: var(--shadow);
}

.feature-card {
    padding: 26px;
    background: rgba(255, 255, 255, 0.98);
    color: var(--text);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.feature-card h3,
.program-card h3,
.testimonial-card strong {
    margin: 0;
    font-size: 1.15rem;
}

.feature-card p,
.program-card p,
.testimonial-card p,
.site-footer p,
.site-footer a,
.stat-card span {
    color: var(--muted);
    line-height: 1.7;
}

.programs-grid,
.testimonials-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.program-card {
    padding: 26px;
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
}

.program-card::before {
    content: "";
    position: absolute;
    inset: auto -20px -20px auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(27, 124, 255, 0.14), transparent 70%);
}

.program-card span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(27, 124, 255, 0.1);
    color: var(--blue);
    font-weight: 800;
}

.testimonial-card {
    padding: 26px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid var(--border);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}

.stat-card {
    padding: 34px 28px;
    background: linear-gradient(180deg, #ffffff, #edf4ff);
    border: 1px solid rgba(27, 124, 255, 0.12);
    text-align: center;
}

.stat-card strong {
    display: block;
    font-size: clamp(2.4rem, 5vw, 3.9rem);
    color: var(--navy);
    line-height: 1;
}

.site-footer {
    padding: 44px 0;
    background: linear-gradient(180deg, #0b1f3a 0%, #09162a 100%);
    color: #fff;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 30px;
}

.footer-grid h3 {
    margin: 0 0 14px;
}

.footer-grid a {
    display: block;
    margin: 8px 0;
}

.footer-brand {
    margin-bottom: 12px;
}

@media (max-width: 1080px) {
    .hero-grid,
    .four-up,
    .programs-grid,
    .testimonials-grid,
    .stats-grid,
    .footer-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .nav-links {
        display: none;
    }
}

@media (max-width: 720px) {
    .nav-shell,
    .nav-actions,
    .hero-actions {
        flex-wrap: wrap;
    }

    .hero,
    .section {
        padding: 64px 0;
    }

    .hero-grid,
    .four-up,
    .programs-grid,
    .testimonials-grid,
    .stats-grid,
    .footer-grid {
        grid-template-columns: 1fr;
    }

    .hero-visual {
        min-height: 380px;
    }
}
`;

        const appJs = `const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
`;

        return {
                indexHtml,
                stylesCss,
                appJs
        };
}

async function buildFallbackClone() {
        const files = buildSiteFiles();

        logStep({ step: "START", content: "Creating a Scaler-style landing page with HTML, CSS, and JavaScript." });
        logStep({ step: "THINK", content: "I will create the output folder, write the three required files, and open the final page in the browser." });

        const folderResult = await createFolder(outputRoot);
        logStep({ step: "TOOL", tool_name: "createFolder", tool_args: outputRoot });
        logStep({ step: "OBSERVE", content: folderResult });

        const indexPath = path.join(outputRoot, "index.html");
        const stylesPath = path.join(outputRoot, "styles.css");
        const appPath = path.join(outputRoot, "app.js");

        const indexResult = await writeFile({ filename: indexPath, content: files.indexHtml });
        logStep({ step: "TOOL", tool_name: "writeFile", tool_args: { filename: indexPath } });
        logStep({ step: "OBSERVE", content: indexResult });

        const stylesResult = await writeFile({ filename: stylesPath, content: files.stylesCss });
        logStep({ step: "TOOL", tool_name: "writeFile", tool_args: { filename: stylesPath } });
        logStep({ step: "OBSERVE", content: stylesResult });

        const appResult = await writeFile({ filename: appPath, content: files.appJs });
        logStep({ step: "TOOL", tool_name: "writeFile", tool_args: { filename: appPath } });
        logStep({ step: "OBSERVE", content: appResult });

        const openResult = await openBrowser(indexPath);
        logStep({ step: "TOOL", tool_name: "openBrowser", tool_args: indexPath });
        logStep({ step: "OBSERVE", content: openResult });

        logStep({
                step: "OUTPUT",
                content: `Created a working Scaler-style clone in ${outputRoot} with index.html, styles.css, and app.js.`
        });
}

async function runWithModel(prompt) {
                const systemPrompt = `
        You are an AI Website Cloning Agent.

        Follow steps:
        START -> THINK -> TOOL -> OBSERVE -> OUTPUT

        Goal:
        Clone the Scaler Academy landing page as a polished single-page site.

        You MUST:
        1. Produce the website files dynamically; do NOT expect this client to hardcode content.
        2. Return an OUTPUT step where content is an object with a files array describing files to write.

        Files format (required):
        {
            "files": [
                { "filename": "index.html", "content": "<html>...", "encoding": "utf-8" },
                { "filename": "styles.css", "content": "...css...", "encoding": "utf-8" },
                { "filename": "assets/logo.png", "content": "<base64-data>", "encoding": "base64" }
            ],
            "summary": "Short text summary"
        }

        Design guidance (for visual closeness; prefer responsive CSS and variables):
        - Use CSS variables for colors (e.g. --navy, --accent, --accent-2) rather than hardcoded inline colors.
        - Generate gradients and layered radial shapes for the hero illustration (purple / blue orbs).
        - Use semantic structure: header, main with hero/why/programs/testimonials/stats, footer.
        - Provide accessible text sizes and responsive breakpoints. Avoid absolute positioning where not needed.
        - If embedding images, provide them as base64 in the files array and set encoding: "base64".

        Rules:
        - Always respond in strict JSON (no additional commentary).
        - One action per step.
        - After every TOOL step, wait for an OBSERVE step.
        - When you are ready to create files, emit a single OUTPUT step containing the files array as shown above.
        `;

        const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
        ];

        while (true) {
                const stream = await openrouter.chat.send({
                        model: "nvidia/nemotron-3-super-120b-a12b:free",
                        chatRequest: {
                                messages,
                                stream: true
                        }
                });

                let content = "";

                for await (const chunk of stream) {
                        const deltaContent = chunk.choices[0]?.delta?.content;

                        if (deltaContent) {
                                content += deltaContent;
                                process.stdout.write(deltaContent);
                        }

                        if (chunk.usage?.reasoningTokens !== undefined) {
                                console.log("\nReasoning tokens:", chunk.usage.reasoningTokens);
                        }
                }

                const parsed = extractJsonObject(content);

                if (!parsed) {
                        throw new Error(`Model response was not valid JSON: ${content}`);
                }

                messages.push({ role: "assistant", content: JSON.stringify(parsed) });

                if (parsed.step === "START" || parsed.step === "THINK") {
                        logStep(parsed);
                        continue;
                }

                if (parsed.step === "TOOL") {
                        const tool = tool_map[parsed.tool_name];

                        if (!tool) {
                                const message = "Tool not found";
                                messages.push({
                                        role: "developer",
                                        content: JSON.stringify({ step: "OBSERVE", content: message })
                                });
                                logStep({ step: "OBSERVE", content: message });
                                continue;
                        }

                        const toolArgs = normalizeToolArgs(parsed.tool_args);
                        const result = await tool(toolArgs);

                        messages.push({
                                role: "developer",
                                content: JSON.stringify({ step: "OBSERVE", content: result })
                        });
                        logStep({ step: "OBSERVE", content: result });
                        continue;
                }

                if (parsed.step === "OUTPUT") {
                    logStep(parsed);

                    // The model should include `content` with a `files` array (see systemPrompt).
                    const outputObj = parsed.content && typeof parsed.content === "string"
                        ? (function () { try { return JSON.parse(parsed.content); } catch { return parsed.content; } })()
                        : parsed.content;

                    if (outputObj && Array.isArray(outputObj.files)) {
                        const folderResult = await createFolder(outputRoot);
                        messages.push({ role: "developer", content: JSON.stringify({ step: "OBSERVE", content: folderResult }) });
                        logStep({ step: "OBSERVE", content: folderResult });

                        for (const f of outputObj.files) {
                            if (!f || !f.filename || typeof f.content === "undefined") continue;

                            const dest = path.join(outputRoot, f.filename);

                            if (f.encoding === "base64") {
                                const buf = Buffer.from(f.content, "base64");
                                fs.mkdirSync(path.dirname(dest), { recursive: true });
                                fs.writeFileSync(dest, buf);
                                const msg = `Wrote binary file ${dest}`;
                                messages.push({ role: "developer", content: JSON.stringify({ step: "OBSERVE", content: msg }) });
                                logStep({ step: "OBSERVE", content: msg });
                            } else {
                                const res = await writeFile({ filename: dest, content: f.content });
                                messages.push({ role: "developer", content: JSON.stringify({ step: "OBSERVE", content: res }) });
                                logStep({ step: "OBSERVE", content: res });
                            }
                        }

                        const indexPath = path.join(outputRoot, "index.html");
                        try {
                            const openResult = await openBrowser(indexPath);
                            messages.push({ role: "developer", content: JSON.stringify({ step: "OBSERVE", content: openResult }) });
                            logStep({ step: "OBSERVE", content: openResult });
                        } catch (e) {
                            logStep({ step: "OBSERVE", content: `Failed to open browser: ${e.message || e}` });
                        }
                    }

                    break;
                }
        }
}

async function main() {
        try {
                if (openrouter) {
                        await runWithModel(userInput);
                } else {
                        await buildFallbackClone();
                }
        } catch (error) {
                console.error("Agent run failed, using local fallback:", error.message);
                await buildFallbackClone();
        } finally {
                rl.close();
        }
}

main();