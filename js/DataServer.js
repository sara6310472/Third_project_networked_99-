class DataServer {
    // Handles data-related operations on the server side
    handleAction(fxhr) {
        const paths = fxhr.url.pathname.split('/');
        const id = paths[3];
        const updateId = paths[5];
        let title = fxhr.url.searchParams.get('title');
        let response;

        try {
            switch (fxhr.method) {
                case 'POST': response = database.create(currentUser, fxhr.body);
                    break;
                case 'PUT': response = database.update(currentUser, updateId);
                    break;
                case 'GET':
                    if (fxhr.url.pathname.includes('search')) response = database.search(currentUser, title);
                    else if (fxhr.url.pathname.includes('read')) response = database.read(currentUser);
                    else if (fxhr.url.pathname.includes('recycle')) response = database.read(currentUser, true);
                    else if (fxhr.url.pathname.includes('return')) response = database.create(currentUser, id, true);
                    else if (fxhr.url.pathname.includes('done')) response = database.done(currentUser);
                    break;
                case 'DELETE': response = database.delete(currentUser, id, fxhr.url.pathname.includes('final'));
                    break;
                default: throw `Unsupported method: ${fxhr.method}`;
            }

            if (response.success) {
                fxhr.status = Math.floor(Math.random() * (100)) + 200;
                fxhr.statusText = 'OK';
                fxhr.data = response.data;
                fxhr.response = `${fxhr.url.protocol}/${fxhr.url.port} ${fxhr.status}  ${fxhr.statusText}\nContent-Type: application/json\n\n${JSON.stringify(response.data, null, 4)}`;
                return cables.dataServerNetwork.sendData(fxhr, 'receive');
            } else {
                throw response.message;
            }
        } catch (error) {
            fxhr.status = fxhr.status = Math.floor(Math.random() * (100)) + 400;;
            fxhr.statusText = 'Bad Request';
            return cables.dataServerNetwork.sendData(fxhr, 'receive');
        }
    }
}