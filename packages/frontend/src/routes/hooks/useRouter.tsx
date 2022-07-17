import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IRoute } from 'routes/interfaces/IRouter';

function toRoute(router: IRoute, parentPath?: string) {
    const key = `${parentPath}-${router.path}`;

    if (router.redirect) {
        return <Route key={key} path={router.path} element={<Navigate to={router.redirect} />}></Route>;
    }

    if (!router.children) {
        return <Route key={key} path={router.path} element={router.component}></Route>;
    }

    return (
        <Route key={key} path={router.path} element={router.component}>
            {router.children.map((r) => toRoute(r, router.path)).filter(Boolean)}
        </Route>
    );
}

function generateRoutes(routes: IRoute[]) {
    return routes.map((r) => toRoute(r, '')).filter(Boolean);
}

export const useRouter = (routes: IRoute[]) => {
    // const location = useLocation();
    // const newRoutes = useMemo(() => {
    //   return generateRoutes(routes);
    // }, [location]);

    return {
        routes: generateRoutes(routes),
    };
};
