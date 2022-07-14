import * as THREE from 'three';
import Experience  from "../Experience.js";
import Environment from './Environment.js';


export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        console.log(this.scene)

        // Test mesh
        const testMesh  = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true
            })
        )
        
        this.scene.add(testMesh)
            
        // Test environment
        this.enviroment = new Environment(); 

    }
}