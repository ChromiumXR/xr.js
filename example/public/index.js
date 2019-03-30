let model = new XRModel({ obj: 'r2-d2.obj', mtl: 'r2-d2.mtl', texturePath: './r2d2/', desktop: true, elementId: 'ha'});

model.setRotation(90, 90, 90);
model.setScale(.5, .5, .5);
model.build();