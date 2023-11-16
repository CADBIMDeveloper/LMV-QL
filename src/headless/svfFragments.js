import { ProgressiveReadContext } from "./progressiveReadContext";
import { Svf1Loader } from "./svf1Loader";

export const loadSVF2Fragments = (doc, bubbleNode) => {
    const modelRootUrl = doc.getFullPath(doc.getViewableUrn(bubbleNode));

    function getBasePath(path) {
        var basePath = "";
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash != -1)
            basePath = path.substr(0, lastSlash + 1);
        return basePath;
    }

    const acmSessionId = doc.getAcmSessionId(modelRootUrl);

    const loadOptions = {
        acmSessionId: doc.getAcmSessionId(modelRootUrl),
        basePath: getBasePath(modelRootUrl),
        queryParams: "acmsession=" + acmSessionId,
        loadInstanceTree: true
    };

    const loadContext = Autodesk.Viewing.endpoint.initLoadContext(loadOptions);

    const resourcePath = Autodesk.Viewing.Private.pathToURL("fragments.fl", loadContext.basePath);

    const useFetch = Autodesk.Viewing.getGlobal().USE_FETCH_API;

    const fragId2dbId = [];

    function readOneFragment(ctx, i) {
        var idata = ctx.idata();

        fragId2dbId[i - 1] = idata[2];

        return true;
    }

    let ctx = new ProgressiveReadContext(readOneFragment, 13 * 4);

    return new Promise((resolve) => {
        function onDone(data, receivedLength) {
            ctx.onEnd(data, receivedLength);

            resolve(fragId2dbId);
        }

        function onProgress(receiveBuffer, receivedLength) {
            ctx.onData(receiveBuffer, receivedLength, false);
        }

        Autodesk.Viewing.Private.ViewingService.getItem(loadContext, resourcePath, onDone, () => { },
            {
                responseType: useFetch ? 'arraybuffer' : 'text',
                onprogress: onProgress,
                useFetch
            }
        );
    });
}

export const loadSVF1Fragments = (doc, bubbleNode) => {
	const propertyDbPath = bubbleNode.findPropertyDbPath();
	
	const modelRootUrl = doc.getFullPath(doc.getViewableUrn(bubbleNode));
	
	function getBasePath(path) {
		var basePath = "";
		var lastSlash = path.lastIndexOf("/");
		if (lastSlash != -1)
			basePath = path.substr(0, lastSlash+1);
		return basePath;
	}
	
	const acmSessionId = doc.getAcmSessionId(modelRootUrl);
	
	const loadOptions = { 
		acmSessionId: doc.getAcmSessionId(modelRootUrl),
		basePath: getBasePath(modelRootUrl),
		queryParams: "acmsession=" + acmSessionId,
		loadInstanceTree: true,
		sharedPropertyDbPath: doc.getFullPath(propertyDbPath),
		bubbleNode
	};
	
	const loadContext = Autodesk.Viewing.endpoint.initLoadContext(loadOptions);
	
	const loader = new Svf1Loader({});
	
	return new Promise((resolve, reject) => {
		loader.loadFile(modelRootUrl, loadContext, (svf) => {
			if (svf)
				resolve(svf.fragments.fragId2dbId);	
			else
				reject();
		});
	});
}