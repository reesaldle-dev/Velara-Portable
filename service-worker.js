self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            const targetUrl = 'https://velara.cc/';
            
            try {
                const response = await fetch(event.request.url.replace(self.location.origin, targetUrl), {
                    method: event.request.method,
                    headers: event.request.headers,
                    body: ['GET', 'HEAD'].includes(event.request.method) ? undefined : await event.request.blob()
                });
                
                return new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        ...Object.fromEntries(response.headers)
                    }
                });
            } catch (err) {
                return new Response(`Error: ${err.message}`, { status: 500 });
            }
        })()
    );
});
