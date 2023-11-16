export class Svf1Loader extends Autodesk.Viewing.Private.SvfLoader {
	loadSvfCB(path, options, onDone, onWorkerStart) {
		var first = true;

		var scope = this;
		var msg = {
			url: Autodesk.Viewing.Private.pathToURL(path),
			basePath: this.currentLoadPath,
			objectIds: options.ids,
			globalOffset: options.globalOffset,
			fragmentTransformsDouble: options.fragmentTransformsDouble,
			placementTransform: options.placementTransform,
			applyRefPoint: options.applyRefPoint,
			queryParams: this.queryParams,
			bvhOptions: options.bvhOptions || { isWeakDevice: Autodesk.Viewing.isMobileDevice() },
			applyScaling: options.applyScaling,
			applyPlacementInModelUnits: options.applyPlacementInModelUnits,
			loadInstanceTree: options.loadInstanceTree
		};
		
		var w = this.svfWorker = this.createWorkerWithIntercept();
		
		var onSVFLoad = async function (ew) {
			var cleaner = function () {
				w.clearAllEventListenerWithIntercept();
				w.terminate();
				scope.svfWorker = null;
				w = null;
			};

			if (first && onWorkerStart) {
				first = false;
				onWorkerStart();
			}

			if (ew.data && ew.data.manifest) {

				scope.interceptManifest(ew.data.manifest);
				msg.operation = "LOAD_SVF_CONTD";
				msg.manifest = ew.data.manifest;
				w.doOperation(msg);
			} else if (ew.data && ew.data.svf) {
				var svf = scope.svf = ew.data.svf;
				
				if (onDone) {
					onDone(svf);
				}
			} else if (!(ew.data && (ew.data.bvh || ew.data.mesh || ew.data.progress || ew.data.debug)) && onDone) {
				onDone(null);
			}
		}
		
		w.addEventListenerWithIntercept(onSVFLoad);

		msg.operation = "LOAD_SVF";
		msg.interceptManifest = !!this.interceptManifest;
		const loadContext = Autodesk.Viewing.initLoadContext(msg);
		w.doOperation(loadContext);
	}
}