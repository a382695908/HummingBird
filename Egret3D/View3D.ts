﻿module BlackSwan {
    export class View3D {

        protected _root: Object3D = new Object3D();
        protected _context3D: Context3D;
        protected _camera: Camera3D;
        protected _render: RenderBase;
        protected _collect: CollectBase;

        protected _width: number = 0;
        protected _height: number = 0;
        protected _x: number = 0;
        protected _y: number = 0;

        protected _localPos: Point = new Point();
        protected _globalPos: Point = new Point();
        protected _globalPosDirty: Boolean;

        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        protected _scissorRectDirty: Boolean = true;
        protected _viewportDirty: Boolean = true;

        protected _viewPortMatrix: Matrix4_4 = new Matrix4_4(); 

        protected _needRtt: boolean = false;
        protected _backImg: DebugHUD;
        protected _postCanvas: PostCanvas;
        protected _sky: Sky;
        protected _sphereSky: SphereSky;
        

        private _debugHUDList: Array<DebugHUD> = new Array<DebugHUD>();
        constructor(viewPort: Rectangle,camera:Camera3D = null ) {

            this._context3D = Egret3D.context3D;
            this._camera = new Camera3D();
            this._camera = camera || new Camera3D() ;
            this._scissorRect = new Rectangle();
            this._viewPort = viewPort;

            this._collect = new EntityCollect(this._root);

            this._render = new DefaultRender(this._camera);
            //this._render = new NormalRender(this._camera); 
            //this._render = new DepthRender(this._camera); 

            this.x = viewPort.x;
            this.y = viewPort.y;
            this.width = viewPort.width;
            this.height = viewPort.height;

            this._postCanvas = new PostCanvas(this);
        }

        public get viewPort(): Rectangle {
            return this._viewPort;
        }

        public set sky(value: Sky) {
            this._sky = value;
        }

        public set sphereSky(value: SphereSky) {
            this._sphereSky = value;
        }

        public get sky(): Sky {
            return this._sky; 
        }

        public addHUD(hud: DebugHUD) {
            this._debugHUDList.push(hud);
        }

        public set backImageTexture(texture: Texture2D) {
            if (!this._backImg){
                this._backImg = new DebugHUD(this.x, this.y, this.width, this.height);
                this._backImg.x = 0;// viewPort.width * 0.5  ;
                this._backImg.y = 0;// * 0.5  ;
                this._backImg.width = this.width;
                this._backImg.height = this.height;
            }
            this._backImg.texture = texture;
        }

        public get collect(): CollectBase {
            return this._collect;
        }

        public get camera3D(): Camera3D {
            return this._camera;
        }

        /**
        * The width of the viewport. When software rendering is used, this is limited by the
        * platform to 2048 pixels.
        */
        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.width = value;
            this._scissorRectDirty = true;
        }
		
        /**
         * The height of the viewport. When software rendering is used, this is limited by the
         * platform to 2048 pixels.
         */
        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.height = value;
            this._scissorRectDirty = true;
        }

        public set x(value: number) {
            if (this._x == value)
                return;

            this._localPos.x = this._x = value;

            this._globalPos.x = value;
            this._globalPosDirty = true;
        }

        public set y(value: number) {
            if (this._y == value)
                return;

            this._localPos.y = value;

            this._globalPos.y = value;
            this._globalPosDirty = true;
        }
        public get x(): number {
            return this._x;
        }

        public get y(): number {
            return this._y;
        }

        public addChild3D(child3D: Object3D) {
            //this._collect.addObject3D(child3D);
            //child3D.parent = this._root;
            this._root.addChild(child3D);
        }

        public renden( time:number, delay:number ) {

            this.updateViewSizeData();

            this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            this._context3D.clear(0.4, 0.4, 0.6, 1);

            if (this._sky) {
                this._sky.draw(this._context3D, this.camera3D);
            }
            if (this._sphereSky){
                this._sphereSky.draw(this._context3D, this.camera3D);
            }

            this._context3D.clearDepth(1);

            this._context3D.clearStencil(0);



            if (this._needRtt) {

                RttManager.getInstance().draw(time,delay,this._render, this._context3D, this.collect, this._viewPort);
                this._postCanvas.draw(this._context3D);

            } else {
               
               if (this._backImg){
                   this._backImg.draw(this._context3D);
               }
   
                this._collect.update(this._camera);
                this._render.draw(time,delay,this._context3D, this._collect);

            }

            for (var i: number = 0; i < this._debugHUDList.length; i++){
                this._debugHUDList[i].draw(this._context3D);
            }

           
            this._context3D.gl.finish();

        }

        protected updateViewSizeData() {

            this._camera.aspectRatio = this._aspectRatio;

            if (this._scissorRectDirty) {
                this._scissorRectDirty = false;
                this._camera.updateScissorRect(this._scissorRect.x, this._scissorRect.y, this._scissorRect.width, this._scissorRect.height);
            }

            if (this._viewportDirty) {
                this._viewportDirty = false;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            }

        }

        public onMouseEvent(e: MouseEventType) {
            //var ray: Ray = new Ray();
            //ray.CalculateAndTransformRay(Egret3D.canvasRectangle.width, Egret3D.canvasRectangle.height, this._camera.transform, this._camera.cameraMatrix.matrix, Egret3D.mouseX, Egret3D.mouseY);
            //for (var i: number = 0; i < this._collect.renderList.length; ++i) {
            //    var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>this._collect.renderList[i];
            //    var inPos: Vector3D = new Vector3D();
            //    if (mesh.isCheckBox) {
            //        if (mesh.isMouseEvent(e)) {
            //            if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
            //                mesh.onMouseEvent(e);
            //            }
            //        }
            //    }
            //}
        }
    }
}