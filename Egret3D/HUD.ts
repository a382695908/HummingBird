﻿module Egret3D {
                
    /**
     * @class Egret3D.HUD
     * @classdesc
     * HUD 渲染对象 
     */   
    export class HUD {
        private static singleQuadData: Array<number> = [

            0.5, -0.5, 0.0, 1.0, 0.0,
            0.5, 0.5, 0.0, 1.0, 1.0,
            -0.5, 0.5, 0.0, 0.0, 1.0
        ];


        * @language zh_CN
        * rectangle
        */
        public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);


        * @language zh_CN
        * anchor
        */
        public anchor: Vector3D = new Vector3D(0.5, 0.5);

        /**
        * @language zh_CN
        * rotation
        */
        public rotation: Vector3D = new Vector3D() ;


        * @language zh_CN
        * r
        */
        public r: number = 1;

        /**
        * @language zh_CN
        * g
        */
        public g: number = 1;

        /**
        * @language zh_CN
        * b
        */
        public b: number = 1;

        /**
        * @language zh_CN
        * a
        */
        public a: number = 1;

        /**
        * @language zh_CN
        * uvRectangle
        */
        public uvRectangle: Rectangle = new Rectangle(0, 0, 1, 1);


        * @language zh_CN
        * texture
        */
        public texture: TextureBase;

        /**
        * @language zh_CN
        * viewMatIndex
        */
        public viewMatIndex: WebGLUniformLocation;

        /**
        * @language zh_CN
        * uiDataIndex
        */
        public uiDataIndex: WebGLUniformLocation;

        /**
        * @language zh_CN
        * materialDataIndex
        */
        public materialDataIndex: WebGLUniformLocation;


        private indexBuffer3D: IndexBuffer3D;
        private vertexBuffer3D: VertexBuffer3D;
        private posAtt: any;
        private uvAtt: any;
        private textureIndex: any;
        private _viewMatrix: Matrix4_4;

        private quadShader: QuadShader;

        constructor( ) {
            this.rectangle.x = 0;
            this.rectangle.y = 0;
            this.rectangle.width = 100;
            this.rectangle.height = 100;

      
            //this._viewMatrix.appendScale(0.1,0.1, 1.0);


            // this.usage.attribute_normal.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_normal.name);
            // this.usage.attribute_tangent.index = context3D.getShaderAttribLocation(program3D, this.usage.attribute_tangent.name);


        * @language zh_CN
        * @writeOnly
        * @param value x
        */
        public set x(value: number) {

            this.rectangle.x = value; 
        }

        * @language zh_CN
        * @writeOnly
        * @param value y
        */
        public set y(value: number) {

            this.rectangle.y = value; 
        }

        * @language zh_CN
        * @readOnly
        * @returns x
        */
        public get x(): number {

            return this.rectangle.x;
        }

        * @language zh_CN
        * @readOnly
        * @returns y
        */
        public get y(): number {

            return this.rectangle.y;
        }

       * @language zh_CN
       * @writeOnly
       * @param value width
       */
       public set width(value: number) {

           this.rectangle.width = value;
       }

       * @language zh_CN
       * @writeOnly
       * @param value height
       */
       public set height(value: number) {

           this.rectangle.height = value;
       }

        * @language zh_CN
        * @readOnly
        * @returns width
        */
        public get width(): number {

            return this.rectangle.width;
        }

        * @language zh_CN
        * @readOnly
        * @returns height
        */
        public get height(): number {

            return this.rectangle.height;
        }

            var vertexShader: Shader = context3D.creatVertexShader(this.quadShader.vertexShaderSource);
            var fragmentShader: Shader = context3D.creatFragmentShader(this.quadShader.fragmentShaderSource);


                context3D.setProgram(this.shaderProgram);
            }

                this.vertexBuffer3D = context3D.creatVertexBuffer(HUD.singleQuadData);
                this.indexBuffer3D = context3D.creatIndexBuffer(HUD.singleQuadIndex);
            }

            this.uvAtt = context3D.getShaderAttribLocation(this.shaderProgram, "aTextureCoord");

            this.uiDataIndex = context3D.getUniformLocation(this.shaderProgram, "uiDatas");
            this.textureIndex = context3D.getUniformLocation(this.shaderProgram, "diffuseTexture");
            this.materialDataIndex = context3D.getUniformLocation(this.shaderProgram, "materialData");

        }

        * @language zh_CN
        * 渲染
        * @param context3D Context3D
        */
        public draw(context3D: Context3D) {


                this.rebuild(context3D);

            this._viewMatrix.identity();

            var tempMat: Egret3D.Matrix4_4 = new Egret3D.Matrix4_4();




                //(this.viewPort.width - (this.rectangle.width / 2.0) * 2.0) * (1 / this.viewPort.width); 

                //(this.viewPort.height - (this.rectangle.height / 2.0) * 2.0) * (1 / this.viewPort.height); 

          
            context3D.setProgram(this.shaderProgram);
            //var len = 3 * Float32Array.BYTES_PER_ELEMENT +
            //    2 * Float32Array.BYTES_PER_ELEMENT;
            context3D.bindVertexBuffer(this.vertexBuffer3D);

            context3D.vertexAttribPointer(this.shaderProgram, this.uvAtt, 2, Egret3DDrive.FLOAT, false, 20, 12);


            context3D.setTexture2DAt(ContextSamplerType.TEXTURE_0, this.textureIndex, 0, this.texture.texture);
            context3D.uniform4fv(this.materialDataIndex,[this.r,this.g,this.b,this.a]);
            //context3D.setTexture2DSamplerState(Egret3D.NEAREST, Egret3D.NEAREST, Egret3D.CLAMP_TO_EDGE, Egret3D.CLAMP_TO_EDGE);
            context3D.enbable(Egret3DDrive.BLEND);
            context3D.setBlendFactors(Egret3DDrive.SRC_ALPHA, Egret3DDrive.ONE_MINUS_SRC_ALPHA);
            context3D.drawElement(DrawMode.TRIANGLES, this.indexBuffer3D, 0, 6);
            context3D.gl.clear(Egret3DDrive.DEPTH_BUFFER_BIT);
        }



        public vertexShaderSource: string = "";

        public fragmentShaderSource: string = "";

        constructor() {
            this.vertexShaderSource = "precision mediump float; \n";
            this.vertexShaderSource += " attribute vec3 aVertexPosition;                                                                       \n ";
            this.vertexShaderSource += " attribute vec2 aTextureCoord;                                                                         \n ";
            this.vertexShaderSource += "                                                                                                       \n ";
            this.vertexShaderSource += " varying  vec2 vTextureCoord;                                                                      \n ";
            this.vertexShaderSource += " uniform  mat4 viewProjectionMatrix;                                                                      \n ";
            this.vertexShaderSource += " uniform  vec4 uiDatas[116];                                                                      \n ";

            this.vertexShaderSource += "     vec4 pos = vec4(aVertexPosition.xyz, 1.0) ;                                    \n ";
            this.vertexShaderSource += "     gl_Position = viewProjectionMatrix * pos;                                    \n ";
            this.vertexShaderSource += "     vTextureCoord = aTextureCoord ;                                                                       \n ";
            this.vertexShaderSource += " }                                                                                                     \n ";

            this.fragmentShaderSource += " varying  vec2 vTextureCoord;                                                                      \n ";
            this.fragmentShaderSource += " uniform sampler2D diffuseTexture;                                                                      \n ";
            this.fragmentShaderSource += " uniform vec4 materialData;                                                                      \n ";
            this.fragmentShaderSource += "  void main(void) {                                                                                      \n ";
            this.fragmentShaderSource += "      vec4 color  = texture2D(diffuseTexture,vTextureCoord) * materialData ;                                    \n ";
            //this.fragmentShaderSource += "    vec4 color = vec4( 1.0 ,1.0 ,0.0 ,1.0) ;                                    \n ";
            this.fragmentShaderSource += "      gl_FragColor  = color;                                    \n ";
            this.fragmentShaderSource += "}                        \n ";
        }
    }
} 