﻿module Egret3D {
                    
    /**
     * @class Egret3D.PostCanvas
     * @classdesc
     * post canvas  
     */   
    export class PostCanvas {
        private static singleQuadData: Array<number> = [

            1.0, -1.0, 0.0, 1.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 0.0, 0.0, 1.0
            //-1.0, -1.0, 0.0,   0.0,1.0
        ];
        private static singleQuadIndex: Array<number> = [0, 1, 2, 0, 2, 3];


        * @language zh_CN
        * rectangle
        */
        public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

        /**
        * @language zh_CN
        * texture
        */
        public texture: TextureBase;

        /**
        * @language zh_CN
        * texture2
        */
        public texture2: TextureBase ;

        private fsShaderSource: string; 

        private vertexBuffer3D: VertexBuffer3D;

        private vsShader: GLSL.ShaderBase
        private fsShader:GLSL.ShaderBase
        private viewPort: Rectangle;

        private distortionK1: number = 0.5;
        private distortionK1Register: any;
        private uniformDistortionK: Vector3D = new Vector3D();

        private position: Vector3D = new Vector3D();
        private rotation: Vector3D = new Vector3D();
        private scale: Vector3D = new Vector3D(1.0, 1.0, 1.0);

        /**
        * @language zh_CN
        * @writeOnly
        * @param value x
        */
        public set x(value: number) {

            if (this.rectangle.x != value) {
                this.rectangle.x = value;
                this.transformChange = true;
            }
        }

        /**
        * @language zh_CN
        * @writeOnly
        * @param value y
        */
        public set y(value: number) {

            if (this.rectangle.y != value) {
                this.rectangle.y = value;
                this.transformChange = true;
            }
        }

        /**
        * @language zh_CN
        * @readOnly
        * @returns x
        */
        public get x(): number {

            return this.rectangle.x;
        }

        /**
        * @language zh_CN
        * @readOnly
        * @returns y
        */
        public get y(): number {

            return this.rectangle.y;
        }

        /**
        * @language zh_CN
        * @writeOnly
        * @param value width
        */
        public set width(value: number) {

            if (this.rectangle.width != value) {
                this.rectangle.width = value;
                this.transformChange = true;
            }
        }
        /**
        * @language zh_CN
        * @writeOnly
        * @param value height
        */
        public set height(value: number) {

            if (this.rectangle.height != value) {
                this.rectangle.height = value;
                this.transformChange = true;
            }
        }
        /**
        * @language zh_CN
        * @readOnly
        * @returns width
        */
        public get width(): number {

            return this.rectangle.width;
        }
        /**
        * @language zh_CN
        * @readOnly
        * @returns height
        */
        public get height(): number {

            return this.rectangle.height;
        }


            //this.rectangle.x = this.viewPort.x ;
            //this.rectangle.y = this.viewPort.y ;
            //this.rectangle.width = this.viewPort.width;
            //this.rectangle.height = this.viewPort.height;
            this._viewMatrix = new Matrix4_4();
            this.setShader(vs, fs);
        }

        * @language zh_CN
        * 曲面
        */
        public startWarped() {

            this.distortion = true; 
            var scale1: number = 0.0;
            var scale2: number = 0.0;




            scale1 = (horizDist / ((horizDist + this.distortionK1 * horizDist * horizDist * horizDist)));

            this.uniformDistortionK.y = scale1;
            this.uniformDistortionK.z = scale2;
        }

        * @language zh_CN
        * 设置渲染shader文件名
        * @param vsName vs
        * @param fsName fs
        */
        public setShader( vsName:string , fsName:string ) {


            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);

            this.fsShader.addShader(fsName);

            this.fsShaderSource = this.fsShader.getShaderSource();


            var vertexShader: Shader = context3D.creatVertexShader( this.vsShaderSource );
            var fragmentShader: Shader = context3D.creatFragmentShader(this.fsShaderSource);


               context3D.setProgram(this.usage.program3D);
           }

               this.vertexBuffer3D = context3D.creatVertexBuffer(PostCanvas.singleQuadData);
               this.indexBuffer3D = context3D.creatIndexBuffer(PostCanvas.singleQuadIndex);
           }

           this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_uv0");


               this.distortionK1Register = context3D.getUniformLocation(this.usage.program3D, "_K");
           }

               this.usage.uniform_sceneWidth.uniformIndex = context3D.getUniformLocation(this.usage.program3D, this.usage.uniform_sceneWidth.varName );
           }

               this.usage.uniform_sceneHeight.uniformIndex = context3D.getUniformLocation(this.usage.program3D, this.usage.uniform_sceneHeight.varName);
           }
           //--------texture----------------
           var sampler2D: GLSL.Sampler2D;
           for (var index in this.usage.sampler2DList) {
               sampler2D = this.usage.sampler2DList[index];
               sampler2D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler2D.varName);
           }

           var sampler3D: GLSL.Sampler3D;
           for (var index in this.usage.sampler3DList) {
               sampler3D = this.usage.sampler3DList[index];
               sampler3D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler3D.varName);
           }
          
       }

       private py: number = 0; 

       * @language zh_CN
       * xxxxxxxx
       * @param context3D xxx
       * @param viewPort xxx
       * @returns xxx
       */
       public draw(context3D: Context3D, viewPort:Rectangle) {

           this.viewPort = viewPort; 
           if (this.transformChange)
               this.notifyUpdate();


               this.rebuild(context3D);


           context3D.disable(context3D.gl.BLEND);

           context3D.bindVertexBuffer(this.vertexBuffer3D);

           context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, 20, 12);


                context3D.uniform3f(this.distortionK1Register,this.uniformDistortionK.x , this.uniformDistortionK.y , this.uniformDistortionK.z );
           }
           if (this.usage.uniform_sceneWidth) {
               context3D.uniform1f(this.usage.uniform_sceneWidth.uniformIndex, this.viewPort.width );
           }
           if (this.usage.uniform_sceneHeight) {
               context3D.uniform1f(this.usage.uniform_sceneHeight.uniformIndex, this.viewPort.height);
           }

           var sampler2D: GLSL.Sampler2D;
           for (var index in this.usage.sampler2DList) {
               sampler2D = this.usage.sampler2DList[index];
               if (sampler2D.varName == "texture2D_1") {
                   context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index ,this.texture.texture );
               } else if (sampler2D.varName == "texture2D_2") {
                   context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, this.texture2.texture);
               }
           }

       }

           this.transformChange = false;  
           this._viewMatrix.identity();

           this.position.y = 1;

           this.scale.y = this.rectangle.height / this.viewPort.height * 2.0  ;

       }
    }
} 