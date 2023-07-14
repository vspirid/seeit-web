import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Torus from './Torus.js'
import Donut from './Donut.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.donut = new Donut(-0.5)
            this.donut = new Donut(0)
            this.donut = new Donut(0.5)
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.donut)
            this.donut.update()
    }
}