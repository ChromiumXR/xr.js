# ChromiumXR XRLoader
A library that makes the integration with the ChromiumXR web browser simple and effective.

### Getting Started
Include [Three.js](https://threejs.org/) and the xrloader.min.js
javascript file.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/87/three.min.js"></script>
<script src="scripts/xrloader.min.js"></script>
```

In the body of your index.html create an `<xr-mdl>` tag and fill it with the required
information

```html
<xr-mdl obj="r2-d2.obj" mtl="r2-d2.mtl" texturePath="./r2d2/" desktop="true"></xr-mdl>
```

The `<xr-mdl>` tag supports the following attributes.

| Attribute        | Function           |
| ------ |-------------|
| obj | Specify the name to of the .obj file. |
| mtl | Specify the name to of the .mtl file. |
| obj | Specify the directory to the textures from. |
| desktop | Show the model on the desktop as well. Defaults to false. |

### Run the Demo
Start the express server in the example directory.
```bash
$ cd example
$ npm install
$ npm start
```

Open http://localhost:8080 in the ChromiumXR Browser.

When viewed in the normal desktop browser the model will not be visible unless specified.

#### Info
The example loads an R2D2 model from a directory and displays it in 3D space
when viewed with ChromiumXR.

