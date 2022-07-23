var camera, scene, renderer, geometry, material, mesh;

init();
animate();
g; // <<<<<<<<<<<<<<<<<<< ---------------wtf is this
function init() {
  // NEW THREE CLOCK
  clock = new THREE.Clock();

  // NEW THREE WEB GL RENDERER (PIXEL RATIO, RENDERER SIZE)
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //NEW THREE SCENE
  scene = new THREE.Scene();

  //NEW THREE PERSPECTIVE CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1000;
  scene.add(camera);

  // NEW THREE MESH (LAMBERT MATERIAL) IS THIS BG? (CUBESINEDRIVER - VAR?)
  geometry = new THREE.CubeGeometry(200, 200, 200);
  material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false,
  });
  mesh = new THREE.Mesh(geometry, material);
  cubeSineDriver = 0;

  // USE TEXTURE HOOK SECTION
  THREE.ImageUtils.crossOrigin = ""; //Need this to pull in crossdomain images from AWS

  // DIRECTIONAL LIGHT ,
  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  scene.add(light);

  smokeTexture = THREE.ImageUtils.loadTexture(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
  );

  // NEW THREE MESH (LAMBERT MATERIAL) (SMOKE) (PLANE GEO) (SMOKE PARTICLES - VAR?)
  smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: smokeTexture,
    transparent: true,
  });
  smokeGeo = new THREE.PlaneGeometry(300, 300);
  smokeParticles = [];

  // PARTICLE POSITON, GEOMETRY / MATHS SECTION
  for (p = 0; p < 150; p++) {
    var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100
    );
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }
  document.body.appendChild(renderer.domElement);
}

// ANIMATE FUNCTION
function animate() {
  delta = clock.getDelta();
  requestAnimationFrame(animate);
  evolveSmoke();
  render();
}

// EVOLVE SMOKE FUNCTION
function evolveSmoke() {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2;
  }
}

// RENDER FUNCTION
function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  cubeSineDriver += 0.01;
  mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;
  renderer.render(scene, camera);
}
