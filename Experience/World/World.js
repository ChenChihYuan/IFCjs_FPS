import * as THREE from 'three';
import Experience  from "../Experience.js";
import Environment from './Environment.js';
import { IFCLoader } from "web-ifc-three/IFCLoader";
import Controls from './Controls.js';


export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // Test mesh
        // const testMesh  = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshStandardMaterial({
        //         wireframe: true
        //     })
        // )
        
        // this.scene.add(testMesh)
        this.setIFCModel();
        this.setControls();
            
        // Test environment
        this.enviroment = new Environment(); 
        
    }

    setIFCModel(){
        // ifc loader
        let ifcModels = [];
        const ifcLoader = new IFCLoader();
        const dropdown = document.getElementById('files');
        dropdown.addEventListener('change', (e) => {
            // remove previous models
            ifcModels.forEach(model => {
                this.scene.remove(model);
                }
            )
            // load the new mesh
            ifcLoader.load(
              '../../ifcModels/' + e.target.value,
              (ifcModel) => {
                ifcModels.push(ifcModel);
                this.scene.add(ifcModel)
              }
            )
          })
    }

    setStartingScreen() {
        this.resources.on('progess', (percent) => console.log(`progress ${percent}/100`));
        this.resources.on('ready', () => this.start());

        const { loaded, toLoad } = this.resources.loader;
        if (loaded === toLoad) this.start();
    }

    async start() {
        this.setControls();
        // this.setMaterial();
        // this.setTorus();
        // this.setPlane();
        // this.setFox();
        // this.setTransition();

        // await this.transition.firstTransition();
    }

    setControls() {
        this.controls = new Controls();
    }
}