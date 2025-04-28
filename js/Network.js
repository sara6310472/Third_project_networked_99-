class NetWork {
    // Manages network communication between client and servers
    handleAction(fxhr, action = null) {
        action = action || (fxhr.url.pathname.includes('sign') ? 'user' : 'data');

        switch (action) {
            case 'data': return cables.networkDataServer.sendData(fxhr);
            case 'user': return cables.networkUserServer.sendData(fxhr);
            case 'receive': fxhr.onload(fxhr);
                return cables.networkClient.sendData(fxhr);
            default: return fxhr.onerror('Invalid action');
        }
    }
}