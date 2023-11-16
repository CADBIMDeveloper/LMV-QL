export const ProgressiveReadContext = (itemCB, defaultByteStride) => {
	var currentRow = 0;
	var stride;
	var byteStride;
	var version;
	var bdata;
	var fdata;
	var idata;

	function readHeader(receiveBuffer) {
		let headerBytes = new Uint8Array(4);

		if (typeof receiveBuffer === "string") {
			for (let i=0; i<4; i++)
				headerBytes[i] = receiveBuffer.charCodeAt(i);
		} else {
			for (let i=0; i<4; i++)
				headerBytes[i] = receiveBuffer[i];
		}

		byteStride = (headerBytes[1] << 8) | headerBytes[0];

		if (!byteStride)
			byteStride = defaultByteStride || 0;

		if (!byteStride)
			console.error("Unknwon byte stride.");

		if (byteStride % 4)
			console.error("Expected byte size to be multiple of 4, but got " + byteStride);

		version = (headerBytes[3] << 8) | headerBytes[2];
		stride = byteStride/4;

		bdata = new Uint8Array(byteStride);
		fdata = new Float32Array(bdata.buffer);
		idata = new Uint32Array(bdata.buffer);

		if (version > 0) {
			//currently unused
			//var flags = idata[offset+3];
		}
	}


	this.onData = function(receiveBuffer, receivedLength, finalCall) {

		//The node.js native loader uses a manually resized Buffer to accumulate data
		//and the buffer length is usually bigger than the length of the usable data
		//inside the buffer. The web browser loader uses a different (browser native) code path
		//where the buffer size and content are equal and not sent with the callback.
		if (receivedLength === undefined)
			receivedLength = receiveBuffer.length;

		var isString = (typeof receiveBuffer === "string");

		while (true) {
			//On the first progress event, read the header
			if (!currentRow && receivedLength >= 4) {
				readHeader(receiveBuffer);
				currentRow++;
			} else if (receivedLength < 4) {
				return false;
			}

			var streamOffset = currentRow * byteStride;
			var endOffset = streamOffset + byteStride;

			if (receivedLength < endOffset)
				return finalCall;

			if (isString) {
				for (let j=0; j<byteStride; j++) {
					bdata[j] = receiveBuffer.charCodeAt(j + streamOffset) & 0xff;
				}
			} else {
				for (let j=0; j<byteStride; j++) {
					bdata[j] = receiveBuffer[j + streamOffset];
				}
			}

			//The callback will return true if it was able
			//to process the item at this time. If not, we will
			//call it later with the same item, until it accepts it.
			if (itemCB(this, currentRow)) {
				currentRow++;
			} else {
				return false;
			}
		}
	};

	this.onEnd = function(receiveBuffer, receivedLength) {
		var isDoneProcessing = this.onData(receiveBuffer, receivedLength, true);

		//Remember the response data in case there is a dependency that hasn't loaded yet
		//and we need to delay processing
		if (!isDoneProcessing) {
			this.rawData = receiveBuffer;
			this.rawLength = receivedLength;
		}
	};

	this.flush = function() {

		if (!this.rawData)
			return;

		var isDoneProcessing = this.onData(this.rawData, this.rawLength, true);
		if (isDoneProcessing)
			this.rawData = null;
	};

	this.idata = function() { return idata; };
	this.fdata = function() { return fdata; };
	this.bdata = function() { return bdata; };
	this.version = function() { return version; };
	this.byteStride = function() { return byteStride; };
}