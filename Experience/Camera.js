import * as THREE from 'three';
import Experience  from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"

export default class Camera{
    constructor(){
        // this.experience = experience;
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

       
        // state for the controls
        this.controlsState = true; // true = enabled, false = control

        // for FPS
        this.time = this.experience.time;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.position = new THREE.Vector3();

       
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width/ this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 5, 10);
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas)
        console.log('setOrbitControls')
        this.controls = new OrbitControls(this.instance, document.documentElement)
        this.controls.enableDamping = true
    }

    setPLControls(){
        console.log('setPLControls')
        this.controls = new PointerLockControls(this.instance, document.documentElement)
        this.controls.enableDamping = true
    }
    
    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update(){
       this.controls.update()
    }

    switch(){
        if(this.controlsState){
            this.controls.dispose()
            this.setPLControls()
            this.controlsState = false
        }else{
            this.controls.dispose()
            this.setOrbitControls()
            this.controlsState = true
        }
    }
    
}