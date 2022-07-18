import * as THREE from 'three';
import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setSunLight();
        
    }

    setSunLight()
    {
        const lightColor = 0xffffff;
        const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(lightColor, 1);
        directionalLight.position.set(0, 10, 0);
        directionalLight.target.position.set(-5, 0, 0);
        this.scene.add(directionalLight);
        this.scene.add(directionalLight.target);
    }
}