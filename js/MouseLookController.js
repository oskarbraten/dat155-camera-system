
import { vec3, quat } from '../lib/engine/lib/gl-matrix/src/index.js';

export default class MouseLookController {

    constructor(camera) {
        this.camera = camera;

        this.FD = vec3.fromValues(0, 0, 1);
        this.UD = vec3.fromValues(0, 1, 0);
        this.LD = vec3.fromValues(1, 0, 0);

        this.pitchQuat = quat.create();
        this.yawQuat = quat.create();
    }

    update(pitch, yaw) {
        
        quat.setAxisAngle(this.pitchQuat, this.LD, -pitch);
        quat.setAxisAngle(this.yawQuat, this.UD, -yaw);

        quat.multiply(this.camera.rotation, this.yawQuat, quat.multiply(this.camera.rotation, this.camera.rotation, this.pitchQuat));

        // The camera stores rotation as a quaternion. If you'd rather work with euler angles, you can simply set the rotation like so:
        // quat.fromEuler(this.camera.rotation, x_angle, y_angle, z_angle);
        // or if you want to add rotation, like this:
        // quat.multiply(this.camera.rotation, this.camera.rotation, quat.fromEuler(this.camera.rotation, x_angle, y_angle, z_angle));

    }
    
}