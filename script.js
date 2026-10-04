/**
 * READY PLAYER ONE // OASIS PORTFOLIO ENGINE
 * Features:
 * - Real-time Web Audio API 8-bit Synth (No external audio files needed!)
 * - CRT & Scanline Filter Toggles
 * - Interactive OASIS Terminal Emulator
 * - Mission Log Quest Category Filters
 * - Clipboard Sync & Easter Eggs
 */

(function () {
  'use strict';

  // ==========================================
  // 1. RETRO 8-BIT SOUND SYNTHESIZER (WEB AUDIO API)
  // ==========================================
  let audioCtx = null;
  let sfxEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainStart, gainEnd) {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainStart, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd || 0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }

  function playBlip() {
    playTone(440, 'square', 0.05, 0.05, 0.001);
  }

  function playSelect() {
    if (!sfxEnabled || !audioCtx) return;
    playTone(587.33, 'triangle', 0.08, 0.08, 0.001);
    setTimeout(() => playTone(880, 'square', 0.08, 0.08, 0.001), 60);
  }

  function playCoin() {
    if (!sfxEnabled || !audioCtx) return;
    playTone(987.77, 'square', 0.08, 0.1, 0.01);
    setTimeout(() => playTone(1318.51, 'square', 0.22, 0.12, 0.001), 70);
  }

  function playLaser() {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  }

  function playPowerup() {
    if (!sfxEnabled || !audioCtx) return;
    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((f, idx) => {
      setTimeout(() => playTone(f, 'square', 0.12, 0.09, 0.001), idx * 75);
    });
  }

  // ==========================================
  // 2. HUD CONTROLS: SFX & CRT TOGGLES
  // ==========================================
  const sfxToggleBtn = document.getElementById('sfxToggle');
  const crtToggleBtn = document.getElementById('crtToggle');
  const body = document.body;

  // Sound toggle
  sfxToggleBtn.addEventListener('click', () => {
    initAudio();
    sfxEnabled = !sfxEnabled;
    const label = sfxToggleBtn.querySelector('.btn-label');
    const icon = sfxToggleBtn.querySelector('.icon');
    if (sfxEnabled) {
      label.textContent = 'SFX: ON';
      icon.textContent = '🔊';
      playCoin();
    } else {
      label.textContent = 'SFX: OFF';
      icon.textContent = '🔇';
    }
  });

  // CRT / Scanline toggle
  crtToggleBtn.addEventListener('click', () => {
    initAudio();
    playSelect();
    const isCrt = body.classList.toggle('crt-enabled');
    body.classList.toggle('scanlines-enabled', isCrt);
    const label = crtToggleBtn.querySelector('.btn-label');
    label.textContent = isCrt ? 'CRT: ON' : 'CRT: OFF';
  });

  // Attach audio blips to all interactive pixel buttons
  document.querySelectorAll('.pixel-btn, .item-slot, .trophy-card, .term-btn, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      initAudio();
      playBlip();
    });
    el.addEventListener('click', () => {
      initAudio();
      playSelect();
    });
  });

  // ==========================================
  // 3. MISSION LOG / QUEST CATEGORY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const questCards = document.querySelectorAll('.quest-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      questCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 4. INTERACTIVE OASIS COMMAND TERMINAL
  // ==========================================
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const quickCmdBtns = document.querySelectorAll('.term-btn');

  const commands = {
    help: `
AVAILABLE COMMANDS:
- about     : Player biography, education & current position
- skills    : Tech stack (Languages, Systems, AI/Vision, Frameworks)
- papers    : Peer-reviewed publications (IEEE, Springer Nature)
- gre       : GRE Quantitative 170/170 (100th percentile) & IELTS scores
- contact   : Official transmission channels & coordinates
- clear     : Wipe terminal display buffer
- easteregg : Secret OASIS Easter Egg protocol
- hire      : Run deployment verification routine
`,
    about: `
PLAYER: Puluputturi Nithin Reddy
CLASS : Software Systems Engineer & AI Researcher
ORIGIN: Amrita Vishwa Vidyapeetham (B.Tech CSE, Oct 2022 - June 2026)
GUILD : Psiog Digital (Software Engineer - Custom Applications Domain)
STATUS: Applying for M.Sc. / M.A.Sc. (Fall 2027) in Canada & Global Top Labs
FOCUS : Test-Time Adaptation, Edge YOLOv8, Distributed Consensus (Raft), C++20 LSM-Trees
`,
    skills: `
EQUIPPED ARSENAL:
- LANGUAGES : Modern C++20, Python, Java, C#, SQL, TypeScript, JavaScript
- SYSTEMS   : LSM-Trees, Raft Consensus, SkipList MemTable, WAL, SSTables, Bloom Filters
- AI/VISION : YOLOv8, Test-Time Adaptation (TENT/SHOT), PyTorch, OpenCV, Spatio-Temporal
- BACKEND   : Spring Boot, .NET Core, ASP.NET Web API, RESTful Microservices, SQL Server
- DEVOPS    : Git, Docker, CI/CD Actions, Jest, Pytest, CMake
`,
    papers: `
MISSION LOG // UNLOCKED PUBLICATIONS:
[1] IEEE INSTCON 2026 (First Author):
    "YOLOv8-Based Real-Time Patient Safety Monitoring with Temporal Analysis and Automated Alerts"
    DOI: 10.1109/INSTCON.2026 (ieeexplore.ieee.org/document/11691839)
[2] IEEE SCEECS 2026 (First Author):
    "YOLOv8-Driven Spatio-Temporal Framework for Real-Time Detection of Risk-Prone Patient Movements"
[3] Springer Nature - ESPR 2026:
    "Advancing Sustainable Seaweed Production: Linking Technology, Policy, and Ecology"
[4] REPO: Clinical-TTA-Edge:
    Unsupervised Test-Time Adaptation for Edge YOLOv8 (github.com/NithinReddy22/clinical-tta-edge)
`,
    gre: `
STANDARDIZED TEST TROPHIES:
- GRE TOTAL : 333 / 340
  * Quantitative Reasoning: 170 / 170 (100th percentile - PERFECT SCORE)
  * Verbal Reasoning      : 163 / 170
  * Analytical Writing    : 4.0
- IELTS ACADEMIC: Band 7.5 Overall (CEFR C1 Level)
  * Listening: 8.0 | Reading: 7.5 | Speaking: 7.5 | Writing: 7.0
`,
    contact: `
TRANSMISSION CHANNELS:
- EMAIL    : puluputturi.nithinreddy@gmail.com
- GITHUB   : github.com/NithinReddy22
- LINKEDIN : linkedin.com/in/nithinnreddy6
- LOCATION : Tirupati, Andhra Pradesh / Chennai, India
`,
    easteregg: `
*** CONGRATULATIONS GUNTER! YOU FOUND AN OASIS EASTER EGG! ***
"THREE HIDDEN KEYS OPEN THREE SECRET GATES,
WHEREIN THE ERRANT WILL BE TESTED FOR WORTHY TRAITS."
Achievement unlocked: [THE FIRST KEY - SYSTEM MASTER] +10,000 XP!
`,
    hire: `
[INITIATING VERIFICATION PROTOCOL...]
> Checking Systems Engineering... [C++20 LSM-TREE & RAFT VERIFIED: 100%]
> Checking AI & Vision... [YOLOv8 & CLINICAL TTA VERIFIED: 100%]
> Checking Math & Quant... [GRE 170Q VERIFIED: 100%]
> RESULT: CANDIDATE HIGHLY RECOMMENDED FOR M.SC. / SYSTEMS ROLES.
`
  };

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    appendOutput(`<span class="prompt-symbol">player@oasis:~$</span> <span class="term-cmd">${cmdRaw}</span>`);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      appendOutput('Terminal buffer cleared. Type <span class="term-cmd">help</span> for commands.');
      return;
    }

    if (commands[cmd]) {
      const lines = commands[cmd].trim().split('\n');
      lines.forEach(line => appendOutput(escapeHtml(line)));
      if (cmd === 'easteregg' || cmd === 'hire') {
        playPowerup();
      } else {
        playSelect();
      }
    } else {
      appendOutput(`Command not recognized: '${escapeHtml(cmdRaw)}'. Type <span class="term-cmd">help</span> for assistance.`);
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    initAudio();
    const val = terminalInput.value;
    terminalInput.value = '';
    handleCommand(val);
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      const cmd = btn.getAttribute('data-cmd');
      handleCommand(cmd);
    });
  });

  // Make terminal command suggestions clickable in text
  terminalOutput.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('term-cmd')) {
      initAudio();
      handleCommand(e.target.textContent);
    }
  });

  // ==========================================
  // 5. CLIPBOARD COPY EMAIL
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      initAudio();
      const textToCopy = copyEmailBtn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        playCoin();
        const origText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'COPIED!';
        copyEmailBtn.style.backgroundColor = 'var(--neon-green)';
        copyEmailBtn.style.color = '#000';
        setTimeout(() => {
          copyEmailBtn.textContent = origText;
          copyEmailBtn.style.backgroundColor = '';
          copyEmailBtn.style.color = '';
        }, 2000);
      });
    });
  }

  // Resume download audio
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      initAudio();
      playCoin();
    });
  }

  console.log("%c OASIS v2.026 // SYSTEM ONLINE ", "background: #00f0ff; color: #000; font-weight: bold; font-size: 14px;");
})();
