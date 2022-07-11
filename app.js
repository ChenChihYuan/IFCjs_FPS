import * as THREE from 'three'
  import {
      OrbitControls
  } from "three/examples/jsm/controls/OrbitControls";

  import {
    PointerLockControls
  } from "three/examples/jsm/controls/PointerLockControls" 
  import { IFCLoader } from "web-ifc-three/IFCLoader";



  //Creates the Three.js scene
  const scene = new THREE.Scene();

  

  const ifcLoader = new IFCLoader();
  ifcLoader.load(
      "./05.ifc",
      (ifcModel) => scene.add(ifcModel));


  //Object to store the size of the viewport
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  const camera = new THREE.PerspectiveCamera(75, aspect);
  camera.position.z = 10;
  camera.position.y = 1.5;
  camera.position.x = 12;

  //Creates the lights of the scene
  const lightColor = 0xffffff;

  const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  //Sets up the renderer, fetching the canvas of the HTML
  const threeCanvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new THREE.GridHelper(50, 30);
  scene.add(grid);

  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  //Creates the orbit controls (to navigate the scene)
//   const controls = new OrbitControls(camera, threeCanvas);
//   controls.enableDamping = true;
//   controls.target.set(-2, 0, 0);

  const controls = new PointerLockControls(camera, document.documentElement);
    window.addEventListener("click", () => {
    controls.lock();
    });


    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    
    
    
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    
    const onKeyDown = (e) => {
        switch (e.code) {
          case "KeyW":
            moveForward = true;
            console.log(moveForward)
            break;
          case "KeyS":
            moveBackward = true;
            break;
          case "KeyA":
            moveLeft = true;
            break;
          case "KeyD":
            moveRight = true;
            break;
        }
      };
      
      const onKeyUp = (e) => {
        switch (e.code) {
          case "KeyW":
            moveForward = false;
            console.log(moveForward)
            break;
          case "KeyS":
            moveBackward = false;
            break;
          case "KeyA":
            moveLeft = false;
            break;
          case "KeyD":
            moveRight = false;
            break;
          case "KeyQ":
            camera.position.set(camera.position.x, camera.position.y + 3.6,camera.position.z)
            break;
          case "KeyE":
            camera.position.set(camera.position.x, camera.position.y - 3.6,camera.position.z)
            break;
        }   
      };
      
      
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);
      
      let prevTime = performance.now();
      
      
      function animate() {
        
        // rectAreaLight.color.r = (rectAreaLight.color.r+ 0.01)
        // rectAreaLight.color.b = (rectAreaLight.color.b+ 0.01)
        // rectAreaLight.intensity = 1
        
    
    
        requestAnimationFrame(animate);
      
        const time = performance.now();
      
      
        // 前進後進判定
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
      
      
        //ポインターがONになったら
        if (controls.isLocked) {
          const delta = (time - prevTime) / 1000;
      
          // decline
          velocity.z -= velocity.z * 0.5 * delta;
          velocity.x -= velocity.x * 0.5 * delta;
      
          if (moveForward || moveBackward) {
            velocity.z -= direction.z * 10 * delta;
          }
      
          if (moveRight || moveLeft) {
            velocity.x -= direction.x * 10 * delta;
          }
      
      
      
          controls.moveForward(-velocity.z * delta);
          controls.moveRight(-velocity.x * delta);
        }
        prevTime = time;
        renderer.render(scene, camera);
      }
      
    //   initialize();
      animate();



  //Adjust the viewport to the size of the browser
//   window.addEventListener("resize", () => {
//     size.width = window.innerWidth;
//     size.height = window.innerHeight;
//     camera.aspect = size.width / size.height;
//     camera.updateProjectionMatrix();
//     renderer.setSize(size.width, size.height);
//   });