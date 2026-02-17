import { Suspense, type FC, type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  type RouteObject,
} from "react-router";
import "./App.css";
import { store } from "./app/apis/store";
import { PathConstants } from "./app/constants";
import { ProductList } from "./app/features/auth copy/components/ProductList";
import { Login } from "./app/features/auth/components/Login";

type CustomRouteObject = RouteObject & {
  isPublic?: boolean;
};

const appRoutes: CustomRouteObject[] = [
  {
    path: PathConstants.emptyRoute,
    element: <Navigate to={`/${PathConstants.login}`} replace />,
  },
  {
    path: PathConstants.login,
    isPublic: true,
    element: <Login />,
  },
  {
    path: PathConstants.product,
    children: [
      {
        path: PathConstants.list,
        element: <ProductList />,
      },
    ],
  },
  {
    path: PathConstants.wildCardRoute,
    isPublic: true,
    errorElement: <>Error...</>,
  },
];

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <Routes>{renderRoutes(appRoutes)}</Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export const ProtectedRoute: FC<PropsWithChildren<any>> = ({ children }) => {
  return children ? children : <Outlet />;
};

const renderRoutes = (routes: CustomRouteObject[]) => {
  return routes.map((e, index) => {
    const element = e.isPublic ? (
      e.element
    ) : (
      <ProtectedRoute>{e.element}</ProtectedRoute>
    );
    return (
      <Route key={index} path={e.path} element={element}>
        {e.children && renderRoutes(e.children)}
      </Route>
    );
  });
};
