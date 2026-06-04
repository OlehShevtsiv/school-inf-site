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
    title: "Гра «Вгадай число»",
    author: "Учень 8 класу",
    description: "Класична гра: комп'ютер загадує число від 1 до 100, а ви намагаєтеся його вгадати за підказками.",
    code: `import random

print("Я загадав число від 1 до 100. Спробуй вгадати!")
secret = random.randint(1, 100)
sprob = 0

while True:
    sprob += 1
    vidpovid = input("Твоя спроба: ")
    chyslo = int(vidpovid)
    if chyslo < secret:
        print("Моє число БІЛЬШЕ 📈")
    elif chyslo > secret:
        print("Моє число МЕНШЕ 📉")
    else:
        print(f"🎉 Вітаю! Ти вгадав число {secret} за {sprob} спроб!")
        break
`,
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
    title: "Гра «Лабіринт» на Scratch",
    author: "Учень 6 класу",
    description: "Проведи кота через лабіринт, уникаючи стін. Зроблено з блоків Scratch — так наші учні починають шлях у програмування. (Замініть scratchId на номер свого проєкту.)",
    scratchId: "60917032",
  },

  // ---------- ФОТО ----------
  {
    type: "image",
    title: "3D-модель у Blender",
    author: "Учениця 9 класу",
    description: "Модель створена на уроці 3D-графіки: примітиви, екструдування та рендеринг. (Замініть на фото справжньої роботи — поклавши файл у works/images/.)",
    file: "works/images/demo-3d-model.svg",
  },

  {
    type: "image",
    title: "Надруковано на шкільному 3D-принтері",
    author: "Гурток STEM",
    description: "Від ідеї в Tinkercad до готової речі: брелоки з емблемою гімназії, надруковані учнями. (Замініть на власне фото.)",
    file: "works/images/demo-3d-print.svg",
  },

  // ---------- ВІДЕО (приклад; розкоментуйте, коли додасте файл) ----------
  // {
  //   type: "video",
  //   title: "3D-принтер у роботі",
  //   author: "Гурток STEM",
  //   description: "Таймлапс друку моделі на шкільному 3D-принтері.",
  //   file: "works/videos/print-timelapse.mp4",
  // },

];
