﻿module Egret3D {

    /**
    * @class Egret3D.CameraAnimationController
    * @classdesc
    * 摄像机动画控制器
    */
    export class CameraAnimationController{

        * @language zh_CN
        * 相机动画每帧数据列表
        */
        public cameraAnimationFrames: Array<CameraAnimationFrame> = [];


        private _playing: boolean = false;
        private _playTime: number = 0;
        private _currentFrameIndex: number = 0;
        private _loop: boolean = true;
        private _smooth: boolean = false;
        private _cameraAnimationFrame: CameraAnimationFrame = new CameraAnimationFrame();

        * @language zh_CN
        * @param camera
        */
            this._camera = camera;

            this._cameraAnimationFrame.rotation = new Vector3D();
            this._cameraAnimationFrame.translation = new Vector3D();
        }

        * @language zh_CN
        * 绑定动画控制的相机
        * @param camera
        */
        public bindCamera(camera: Camera3D): void {

            this._camera = camera;
        }

        * @language zh_CN
        * 播放相机动画 是否循环
        * @param isLoop 是否循环播放
        */
        public play(isLoop: boolean): void {


                return;

            this._playTime = 0;
            this._camera.isController = false;
            this._playing = true;
        }

        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 每帧间隔时间
        */
        public update(time: number, delay: number) {


                return;




                this._playing = false;
                this._camera.isController = true;
            }






                
                ///(v1.x - v0.x) * t + v0.x;
                this._cameraAnimationFrame.fov = (nextFrame.fov - currentFrame.fov) * t + currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation); ///.lerp(currentFrame.rotation, nextFrame.rotation, t);
                this._cameraAnimationFrame.translation.lerp(currentFrame.translation, nextFrame.translation, t);
            }
            else {
                this._cameraAnimationFrame.fov = currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation);
                this._cameraAnimationFrame.translation.copyFrom(currentFrame.translation);
            }

            this._camera.rotationX = this._cameraAnimationFrame.rotation.x * Matrix3DUtils.RADIANS_TO_DEGREES + 90;
            this._camera.rotationY = this._cameraAnimationFrame.rotation.y * Matrix3DUtils.RADIANS_TO_DEGREES;
            this._camera.rotationZ = this._cameraAnimationFrame.rotation.z * Matrix3DUtils.RADIANS_TO_DEGREES;
            this._camera.position = this._cameraAnimationFrame.translation;
        }
    }
    
    /**
    * @class Egret3D.CameraAnimationFrame
    * @classdesc
    * 摄像机动画每帧数据
    */
        /**
        * @language zh_CN
        * 帧时间
        */
        public time: number;

        /**
        * @language zh_CN
        * 观察时y 轴方向的角度，就是观察范围夹角。
        */
        public fov: number;

        /**
        * @language zh_CN
        * 旋转
        */
        public rotation: Vector3D;

        /**
        * @language zh_CN
        * 平移
        */
        public translation: Vector3D;

        /**
        * @language zh_CN
        * 计算时用的矩阵
        */
        public matrix: Matrix4_4;

    }
}