import Experience from './Experience/Experience.js';


const experience = new Experience(document.querySelector('#three-canvas'));

// document.querySelector('.control_switch').addEventListener('click', (e) => {
//     console.log('clicked');
// });

// const experience = new Experience(document.querySelector('canvas.webgl'));

// import * as THREE from 'three'
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
// import { IFCLoader } from "web-ifc-three/IFCLoader";
// import { acceleratedRaycast,  computeBoundsTree,  disposeBoundsTree } from 'three-mesh-bvh';


// //Creates the Three.js scene
// const scene = new THREE.Scene();

// const ifcModels = [];

// const ifcLoader = new IFCLoader();
// ifcLoader.load(
//   "./ifcModels/05.ifc",
//   (ifcModel) => {
//     ifcModels.push(ifcModel);
//     scene.add(ifcModel)
//   });




// // Sets up optimized picking
// ifcLoader.ifcManager.setupThreeMeshBVH(
//   computeBoundsTree,
//   disposeBoundsTree,
//   acceleratedRaycast);

// const raycaster = new THREE.Raycaster();
// raycaster.firstHitOnly = true;
// const mouse = new THREE.Vector2();


// function cast(event) {

//   // Computes the position of the mouse on the screen
//   const bounds = threeCanvas.getBoundingClientRect();

//   const x1 = event.clientX - bounds.left;
//   const x2 = bounds.right - bounds.left;
//   mouse.x = (x1 / x2) * 2 - 1;

//   const y1 = event.clientY - bounds.top;
//   const y2 = bounds.bottom - bounds.top;
//   mouse.y = -(y1 / y2) * 2 + 1;

//   // Places it on the camera pointing to the mouse
//   raycaster.setFromCamera(mouse, camera);

//   // Casts a ray
//   return raycaster.intersectObjects(ifcModels);
// }


// //Object to store the size of the viewport
// const size = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// //Creates the camera (point of view of the user)
// const aspect = size.width / size.height;
// const camera = new THREE.PerspectiveCamera(75, aspect);
// camera.position.z = 10;
// camera.position.y = 1.5;
// camera.position.x = 12;

// //Creates the lights of the scene
// const lightColor = 0xffffff;

// const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(lightColor, 1);
// directionalLight.position.set(0, 10, 0);
// directionalLight.target.position.set(-5, 0, 0);
// scene.add(directionalLight);
// scene.add(directionalLight.target);

// //Sets up the renderer, fetching the canvas of the HTML
// const threeCanvas = document.getElementById("three-canvas");
// const renderer = new THREE.WebGLRenderer({
//   canvas: threeCanvas,
//   alpha: true
// });

// renderer.setSize(size.width, size.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// //Creates grids and axes in the scene
// const grid = new THREE.GridHelper(50, 30);
// scene.add(grid);

// const axes = new THREE.AxesHelper();
// axes.material.depthTest = false;
// axes.renderOrder = 1;
// scene.add(axes);

// const controls = new PointerLockControls(camera, document.documentElement);
// window.addEventListener("click", () => {
//   controls.lock();
// });


// let moveForward = false;
// let moveBackward = false;
// let moveLeft = false;
// let moveRight = false;



// const velocity = new THREE.Vector3();
// const direction = new THREE.Vector3();

// const onKeyDown = (e) => {
//   switch (e.code) {
//     case "KeyW":
//       moveForward = true;
//       break;
//     case "KeyS":
//       moveBackward = true;
//       break;
//     case "KeyA":
//       moveLeft = true;
//       break;
//     case "KeyD":
//       moveRight = true;
//       break;
//   }
// };

// const onKeyUp = (e) => {
//   switch (e.code) {
//     case "KeyW":
//       moveForward = false;
//       break;
//     case "KeyS":
//       moveBackward = false;
//       break;
//     case "KeyA":
//       moveLeft = false;
//       break;
//     case "KeyD":
//       moveRight = false;
//       break;
//     case "KeyQ":
//       camera.position.set(camera.position.x, camera.position.y + 3.6, camera.position.z)
//       break;
//     case "KeyE":
//       camera.position.set(camera.position.x, camera.position.y - 3.6, camera.position.z)
//       break;
//   }
// };


// document.addEventListener("keydown", onKeyDown);
// document.addEventListener("keyup", onKeyUp);

// let prevTime = performance.now();


// function animate() {
//   requestAnimationFrame(animate);

//   const time = performance.now();


//   // 前進後進判定
//   direction.z = Number(moveForward) - Number(moveBackward);
//   direction.x = Number(moveRight) - Number(moveLeft);


//   //ポインターがONになったら
//   if (controls.isLocked) {
//     const delta = (time - prevTime) / 1000;

//     // decline
//     velocity.z -= velocity.z * 0.5 * delta;
//     velocity.x -= velocity.x * 0.5 * delta;

//     if (moveForward || moveBackward) {
//       velocity.z -= direction.z * 10 * delta;
//     }

//     if (moveRight || moveLeft) {
//       velocity.x -= direction.x * 10 * delta;
//     }
//     controls.moveForward(-velocity.z * delta);
//     controls.moveRight(-velocity.x * delta);
//   }
//   prevTime = time;
//   renderer.render(scene, camera);
// }

// // initialize();
// animate();

// const ifc = ifcLoader.ifcManager;
// // Reference to the previous selection
// let highlightModel = { id: - 1 };
// const selectModel = { id: - 1 };

// function highlight(event, material, model) {
//   const found = cast(event)[0];
//   if (found) {

//     // Gets model ID
//     model.id = found.object.modelID;

//     // Gets Express ID
//     const index = found.faceIndex;
//     const geometry = found.object.geometry;
//     const id = ifc.getExpressId(geometry, index);

//     // Creates subset
//     ifcLoader.ifcManager.createSubset({
//       modelID: model.id,
//       ids: [id],
//       material: material,
//       scene: scene,
//       removePrevious: true
//     })
//   } else {
//     // Remove previous highlight
//     ifc.removeSubset(model.id, scene, material);
//   }
// }

// const preselectMat = new THREE.MeshLambertMaterial({
//   transparent: true,
//   opacity: 0.6,
//   color: 0xff88ff,
//   depthTest: false
// })

// const selectMat = new THREE.MeshLambertMaterial({
//   transparent: true,
//   opacity: 0.6,
//   color: 0xff00ff,
//   depthTest: false
// })


// const cursor = document.querySelector("cursor");

// window.ondblclick = (event) => {
//   highlight(event, selectMat, selectModel);
// }
// //Adjust the viewport to the size of the browser
// window.addEventListener("resize", () => {
//   size.width = window.innerWidth;
//   size.height = window.innerHeight;
//   camera.aspect = size.width / size.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(size.width, size.height);
// });