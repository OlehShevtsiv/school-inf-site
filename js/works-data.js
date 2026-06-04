/* ============================================================
   РОБОТИ УЧНІВ
   Щоб додати роботу — скопіюйте один із блоків { ... } нижче,
   вставте перед закривною дужкою ] і заповніть свої дані.
   Детальна інструкція — у файлі README.md.

   Типи робіт:
   - "python"  : програма Python (код у полі code, між бектиками ``)
   - "image"   : фото (файл покладіть у папку works/images/)
   - "video"   : відео (файл покладіть у папку works/videos/)
   - "scratch" : проєкт Scratch (вкажіть scratchId — цифри з адреси проєкту)
   ============================================================ */

const WORKS = [

  // ---------- PYTHON ----------
  {
    type: "python",
    title: "Учнівський проєкт: «Cyber Security Analyzer»",
    author: "Учні 9-го класу",
    description: "Це інтерактивний хакерський сканер (консольний додаток на Python), який у реальному часі симулює brute-force атаку (взлом перебором символів) та наочно оцінює надійність твого пароля.",
    code: `import time
import string

def check_security_level(password):
    length = len(password)
   
    # Рахуємо, скільки різних типів символів є в паролі
    types_count = sum([
        any(c.islower() for c in password),
        any(c.isupper() for c in password),
        any(c.isdigit() for c in password),
        any(c in string.punctuation for c in password)
    ])
   
    if length > 10:
        return "СУПЕРНАДІЙНИЙ 🌟", 0.04
    elif types_count == 4:
        return "ВИСОКИЙ РІВЕНЬ 🔐", 0.02
    elif types_count == 3:
        return "ВИЩЕ СЕРЕДНЬОГО 📊", 0.01
    elif types_count == 2:
        return "СЕРЕДНІЙ РІВЕНЬ ⚠️", 0.005
    else:
        return "КРИТИЧНО НИЗЬКИЙ ❌", 0.001

def cyber_hack_simulation():
    print("=" * 60)
    print("⚡ CYBER SECURITY PASSWORD ANALYZER v3.0 ⚡")
    print("=" * 60)
   
    password = input("[ВХІДНІ ДАНІ] Введіть ваш пароль для аналізу: ")
    if not password: return

    level_name, delay = check_security_level(password)
   
    print()
    print("[ІНІЦІАЛІЗАЦІЯ] Сканування символів підбору...")
    time.sleep(1.0)
    print("[АТАКА] Запуск brute-force підбору. Симулюємо злам...")
    print()
   
    start_time = time.time()
    guessed_password = ""
    total_attempts = 0
   
    # Усі можливі символи для перебору
    possible_chars = string.ascii_letters + string.digits + string.punctuation + " "
   
    for target_char in password:
        for char in possible_chars:
            total_attempts += 1
           
            # Простіший спосіб виведення в один рядок для школярів:
            print(f"     🔍 [Спроба №{total_attempts:04d}]: {guessed_password}{char}", end='', flush=True)
            print()
            time.sleep(delay)
           
            if char == target_char:
                guessed_password += char
                break
               
    execution_time = time.time() - start_time
   
    print()
    print()
    print("=" * 60)
    print(" 🏁 [АНАЛІЗ ЗАВЕРШЕНО] РЕЗУЛЬТАТИ ПЕРЕВІРКИ:")
    print(f" [*] Підібрана комбінація : {guessed_password}")
    print(f" [*] Перевірено комбінацій : {total_attempts} спроб")
    print(f" [*] Час повного зламу     : {execution_time:.4f} секунд")
    print(f" [!] СТІЙКІСТЬ ПАРОЛЯ      : {level_name}")
    print("=" * 60)

if __name__ == "__main__":
    cyber_hack_simulation()`,
  },

  {
    type: "python",
    title: "Зоряне небо (генератор)",
    author: "Учениця 9 класу",
    description: "Програма малює зоряне небо із символів — кожен запуск створює нову картину. Демонструє списки, цикли та випадкові числа з програми 8–9 класу.",
    code: `import random

WIDTH = 38
HEIGHT = 12
ZIRKY = ["*", ".", "+", "·", "✦"]

print("Генерую зоряне небо...")
print("=" * WIDTH)

for riadok in range(HEIGHT):
    nebo = ""
    for stovp in range(WIDTH):
        if random.random() < 0.12:
            nebo += random.choice(ZIRKY)
        else:
            nebo += " "
    print(nebo)

print("=" * WIDTH)
print("Кожен запуск — нове небо! Спробуйте ще раз 🌟")
`,
  },

  {
    type: "python",
    title: "Таблиця Піфагора за 5 рядків",
    author: "Учень 8 класу",
    description: "Уся таблиця множення — лише кілька рядків коду. Приклад того, як цикли економлять час.",
    code: `print("Таблиця множення:")
print()
for a in range(1, 10):
    riadok = ""
    for b in range(1, 10):
        riadok += str(a * b).rjust(4)
    print(riadok)
`,
  },

  // ---------- SCRATCH ----------
  {
    type: "scratch",
    title: "Алгоритми сортування",
    author: "Вчитель",
    description: "Дослідження роботи популярних алгоритмів сортування (бульбашкове, швидке, вибором) через візуальні симуляції на Scratch.",
    scratchId: "1295638285",
  },

    {
    type: "scratch",
    title: "Гра лабіринт з ботом - жуком",
    author: "Вчитель",
    description: "Гра-лабіринт, де гравець керує їжаком, який повинен знайти вихід. Перешкоджає йому бот - Жук.",
    scratchId: "1328661015",
  },

  {
    type: "scratch",
    title: "\"Думи мої\" у коді Scratch",
    author: "Учениця 5-го класу",
    description: "Постановка \"Думи мої, думи\" - справжнє емоційне відкриття у навчальному середовищі Scratch:  мелодія, підсвічена караоке-текстом, а також фотоальбом з образами, які розкривають творчість Тараса Шевченка.",
    scratchId: "1328660395",
  },

  {
    type: "scratch",
    title: "Годинник",
    author: "Учениця 5-го класу",
    description: "Створення інтерактивного аналогового годинника, який працює не як ізольована анімація, а в реальному часі відображає точні години, хвилини та секунди користувача.",
    scratchId: "1328671502",
  },

  // ---------- ФОТО ----------
  {
    type: "image",
    title: "3D-модель у Blender шахового слона",
    author: "Учениця 9 класу",
    description: "Модель створена на уроці 3D-графіки: примітиви, екструдування та рендеринг.",
    file: "works/images/Шаховий слон.png",
  },

  {
    type: "image",
    title: "3D-модель у Blender шахового короля",
    author: "Учень 9 класу",
    description: "Модель створена на уроці 3D-графіки: примітиви, екструдування та рендеринг.",
    file: "works/images/Шаховий король.png",
  },

  {
    type: "image",
    title: "3D-модель у Blender шахової дошки",
    author: "Учень 9 класу",
    description: "Модель створена на уроці 3D-графіки: примітиви, екструдування та рендеринг.",
    file: "works/images/Шахова дошки.png",
  },

    {
    type: "image",
    title: "3D-друк на шкільному 3D-принтері",
    author: "Учень 9 класу",
    description: "Фото моделі, надрукованої на шкільному 3D-принтері. Процес включав створення 3D-моделі в Blender, підготовку до друку та сам друк.",
    file: "works/images/ЗД друк.jpg",
  },

  {
    type: "python",
    title: "Tkinter калькулятор",
    author: "Учениця 8 класу",
    description: "<a href=\"https://codehs.com/sandbox/id/python-graphics-tkinter-IPnUun\" target=\"_blank\">Переглянути проєкт</a>",
    code: "print('Hello, World!')",
  },

  // ---------- ВІДЕО (приклад; розкоментуйте, коли додасте файл) ----------
  {
    type: "video",
    title: "Криптографічний квест та цифрові перегони на Python",
    author: "Учні 7-го та 9-го класів",
    description: "Проект поєднує розробку консольної програми для секретного кодування повідомлень методом Цезаря та створення графічної міні-гри з випадковими результатами рушія Turtle. Робота спрямована на вивчення базових алгоритмів автоматизації текстів та практичне засвоєння циклів, умовних операторів і випадкових чисел у Python.",
    file: "works/videos/LearningProjectsPython.mp4",
  },

  {
    type: "video",
    title: "3D-принтер у роботі",
    author: "Гурток STEM",
    description: "Таймлапс друку моделі на шкільному 3D-принтері.",
    file: "works/videos/Добре_я_витягнула_картинку.mp4",
  },

];
