import * as THREE from 'three';
import Experience from '../Experience';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2 } from 'three';


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.time = this.experience.time;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;

        this.setMouse();
        // this.switchControls();
    }

    // switchControls() {
    //     // listen for mouse click on div with class named 'control_switch'

    //     console.log(this.experience.camera.controls)

    //     const btn = document.querySelector('.control_switch');
    //     console.log(btn)
    //     btn.addEventListener('click', () => {
    //         console.log('click')
    //     });
        
    //     // listen for mouse click on button with id named 'tmp'
    //     // const btn = document.getElementById('tmp');
    //     // btn.addEventListener('click', () => {
    //     //     console.log('click')
    //     // }
    //     // );
    // }
    
    setMouse() {
        this.mouse = new THREE.Vector2();

        // triggered when the mouse moves
        window.addEventListener('mousemove', (event) => {
            
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
        });

        // after pressing down the mouse button
        window.addEventListener('pointerdown', () => {
            console.log('pointerdown')
            this.time.trigger('mouseDown');
        });
        // can't use 'mousedown' event because of the OrbitControls library

        // after releasing the mouse button
        window.addEventListener('click', () => {
            this.time.trigger('mouseUp');

        });

        // touch move on mobile
        window.addEventListener('touchmove', (event) => {
            this.mouse.x = event.touches[0].clientX / this.sizes.width * 2 - 1;
            this.mouse.y = -(event.touches[0].clientY / this.sizes.height) * 2 + 1;
        });

        // touch start on mobile
        window.addEventListener('touchstart', () => {
            this.time.trigger('mouseDown');
        });

        // touch end on mobile
        window.addEventListener('touchend', () => {
            this.time.trigger('mouseUp');
        });

        
        // listen for mouse click on div with class named 'control_switch'
        const btn = document.querySelector('.control_switch');
        console.log(btn)
        
        btn.addEventListener('mouse', () => {
            console.log('click')
            // this.switch();
        })
        
        
       
    }

}
