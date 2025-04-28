class Cable {
    // Simulates network communication
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.busy = false;
    }

    sendData(fxhr, action = null) {
        if (this.busy) throw 'Cable is busy';
        this.busy = true;
        try {
            switch (this.endPoint) {
                case 'network': return netWork.handleAction(fxhr, action);
                case 'userServer': return userServer.handleAction(fxhr);
                case 'dataServer': return dataServer.handleAction(fxhr);
                case 'client': return;// fxhr.onload(fxhr);
                default: return fxhr.onerror('Invalid action');
            }
        } finally {
            this.busy = false;
        }
    }
}