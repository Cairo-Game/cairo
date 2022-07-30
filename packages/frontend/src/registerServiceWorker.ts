const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.ts')
            .then((reg) => {
                console.log('Registration succeeded. Scope is ' + reg.scope);
            })
            .catch((error) => {
                console.log('Registration failed with ' + error);
            });
    }
};

export default registerServiceWorker;
