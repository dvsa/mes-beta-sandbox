import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

  /*  NOTES 
  1) The Ionic Native Plugin Doesn't work so don't use it. Use the declsare var method below this notw
  2) NPM is out of date so use the following to install the plugin - 
    ionic plugin add https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview.git
  3) We need to request camera permssions - see config.xml to see how I did it
  4) If you have any issues clear down www, plugins and platforms and rebuild
  */

declare var CameraPreview:any;

@IonicPage()
@Component({
  selector: 'page-camera-preview',
  templateUrl: 'camera-preview.html',
})
export class CameraPreviewPage {

 @ViewChild('cameraPreviewContainer') container: ElementRef;

  constructor() {
  }

  showCamera = () => {

    const el: HTMLElement = this.container.nativeElement;

    CameraPreview.startCamera({
      x: 0,
      y: el.getBoundingClientRect().top,
      width: 300,
      height: 300,
      camera: CameraPreview.CAMERA_DIRECTION.FRONT,
      tapPhoto: false,
      previewDrag: false,
      toBack: false,
    });
  }

  hideCamera = () => {
    CameraPreview.stopCamera();
  }

}
