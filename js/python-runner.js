/* ============================================================
   Запуск Python-програм у браузері через Pyodide (WebAssembly).
   - Pyodide завантажується ЛІНИВО: лише коли відкрито першу
     Python-роботу (це ~10 МБ з CDN, потрібен інтернет).
   - print() виводиться у консоль-панель модального вікна.
   - input() підмінюється на браузерний prompt().
   ============================================================ */

(function () {
  "use strict";

  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

  let pyodide = null;        // готовий інтерпретатор
  let pyodideLoading = null; // проміс завантаження (щоб не вантажити двічі)

  const modal = document.getElementById("pythonModal");
  const editor = document.getElementById("pyEditor");
  const consoleEl = document.getElementById("pyConsole");
  const runBtn = document.getElementById("pyRunBtn");
  const clearBtn = document.getElementById("pyClearBtn");

  // ---------- Вивід у консоль-панель ----------
  function writeLine(text, cls) {
    const span = document.createElement("span");
    if (cls) span.className = cls;
    span.textContent = text + "\n";
    consoleEl.appendChild(span);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function clearConsole() { consoleEl.textContent = ""; }

  // ---------- Завантаження Pyodide ----------
  function loadPyodideOnce() {
    if (pyodide) return Promise.resolve(pyodide);
    if (pyodideLoading) return pyodideLoading;

    pyodideLoading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PYODIDE_URL;
      script.onload = async () => {
        try {
          // loadPyodide — глобальна функція зі скрипта CDN
          pyodide = await loadPyodide({
            stdout: (text) => writeLine(text),
            stderr: (text) => writeLine(text, "err"),
          });
          // input() → браузерний prompt()
          pyodide.globals.set("__js_prompt", (msg) => {
            const answer = window.prompt(msg || "Введіть значення:");
            return answer === null ? "" : answer;
          });
          await pyodide.runPythonAsync(
            "import builtins\n" +
            "def _input(prompt=''):\n" +
            "    if prompt: print(prompt, end='')\n" +
            "    value = __js_prompt(str(prompt))\n" +
            "    print(value)\n" +
            "    return value\n" +
            "builtins.input = _input\n"
          );
          resolve(pyodide);
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () =>
        reject(new Error("Не вдалося завантажити Python-середовище. Перевірте з'єднання з інтернетом."));
      document.head.appendChild(script);
    });

    return pyodideLoading;
  }

  // ---------- Запуск коду ----------
  async function runCode() {
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Виконую…";
    clearConsole();

    try {
      if (!pyodide) {
        writeLine("Завантажую Python-середовище (перший запуск, ~10 МБ)…", "sys");
        await loadPyodideOnce();
        clearConsole();
      }
      writeLine("▶ Запуск програми…", "sys");
      await pyodide.runPythonAsync(editor.value);
      writeLine("\n✔ Програма завершила роботу.", "sys");
    } catch (err) {
      // показуємо лише суть помилки Python, без внутрішніх кадрів Pyodide
      const msg = String(err.message || err);
      const pyErrorStart = msg.search(/(Traceback|[A-Za-z]+Error:)/);
      writeLine(pyErrorStart >= 0 ? msg.slice(pyErrorStart) : msg, "err");
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = "▶ Запустити";
    }
  }

  runBtn.addEventListener("click", runCode);
  clearBtn.addEventListener("click", () => {
    clearConsole();
    writeLine("Натисніть «Запустити», щоб виконати код 🐍", "sys");
  });

  // Tab у редакторі вставляє відступ (4 пробіли), а не перемикає фокус
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart: s, selectionEnd: en, value } = editor;
      editor.value = value.slice(0, s) + "    " + value.slice(en);
      editor.selectionStart = editor.selectionEnd = s + 4;
    }
  });

  // ---------- Публічний API: відкрити роботу ----------
  window.PythonRunner = {
    open(work) {
      document.getElementById("pyModalTitle").textContent = work.title;
      document.getElementById("pyModalAuthor").textContent = work.author || "";
      document.getElementById("pyModalDesc").textContent = work.description || "";
      editor.value = (work.code || "# Код не знайдено — додайте поле code у works-data.js").trim() + "\n";
      clearConsole();
      writeLine("Натисніть «Запустити», щоб виконати код 🐍", "sys");
      window.openModal(modal);

      // починаємо вантажити Pyodide у фоні, щоб перший запуск був швидшим
      loadPyodideOnce().catch(() => {/* помилку покажемо при спробі запуску */});
    },
  };
})();
