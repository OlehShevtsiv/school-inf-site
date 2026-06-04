/* ============================================================
   Інтерактивна 3D-сцена у hero (Three.js, libs/three.min.js).
   Низькополігональний ікосаедр + хмара частинок-«зірок».
   Обертається автоматично, реагує на мишку (drag) і дотик.
   ============================================================ */

(function () {
  "use strict";

  const canvas = document.getElementById("heroCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  // поважаємо налаштування зменшеної анімації
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Сцена, камера, рендерер ----------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,           // прозорий фон — видно CSS-градієнти позаду
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ---------- Головний об'єкт: ікосаедр ----------
  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.IcosahedronGeometry(2.1, 1);

  // напівпрозорі грані
  const solid = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.06,
    })
  );
  group.add(solid);

  // неоновий каркас
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.55 })
  );
  group.add(wire);

  // світні вершини
  const vertices = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.09, transparent: true, opacity: 0.9 })
  );
  group.add(vertices);

  // ---------- Частинки-«зірки» навколо ----------
  const STAR_COUNT = 350;
  const starPositions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    // розкидаємо точки сферою навколо центру (радіус 4–14)
    const r = 4 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi) - 4;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0x97a3c4, size: 0.04, transparent: true, opacity: 0.7 })
  );
  scene.add(stars);

  // ---------- Розмір під контейнер ----------
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // ---------- Взаємодія мишкою / дотиком ----------
  let targetRotX = 0.25;
  let targetRotY = 0;
  let dragging = false;
  let lastX = 0, lastY = 0;

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (dragging) {
      targetRotY += (e.clientX - lastX) * 0.006;
      targetRotX += (e.clientY - lastY) * 0.006;
      lastX = e.clientX;
      lastY = e.clientY;
    } else {
      // легкий паралакс за положенням курсора
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      stars.rotation.y = nx * 0.18;
      stars.rotation.x = ny * 0.12;
    }
  });

  canvas.addEventListener("pointerup", () => { dragging = false; });
  canvas.addEventListener("pointercancel", () => { dragging = false; });

  // ---------- Анімаційний цикл ----------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const dt = clock.getDelta();

    if (!reducedMotion && !dragging) {
      targetRotY += dt * 0.18; // повільне автообертання
    }

    // плавне наближення до цільового кута
    group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.06;

    if (!reducedMotion) {
      const t = clock.elapsedTime;
      group.position.y = Math.sin(t * 0.6) * 0.18;       // «дихання» вгору-вниз
      stars.rotation.z += dt * 0.008;                     // дрейф зірок
      vertices.material.opacity = 0.65 + Math.sin(t * 2) * 0.25; // пульс вершин
    }

    renderer.render(scene, camera);
  }

  if (reducedMotion) {
    // один статичний кадр без циклу анімації
    group.rotation.set(0.25, 0.6, 0);
    renderer.render(scene, camera);
  } else {
    animate();
  }
})();
