import { Authenticated, GitHubBanner, Refine, useTranslate } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
// import { dataProvider } from "./dataProvider";
import dataProvider from "@refinedev/simple-rest";

import { App as AntdApp, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { useDirection } from "./contexts/DirectionContext";

import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { PropertyCreate, PropertyList } from "./pages/properties";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { AntdInferencer } from "@refinedev/inferencer/antd";

function App() {
  const { t, i18n } = useTranslation();
  const { direction } = useDirection();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  
  const translate = useTranslate();

  const FAKE_API_URL = "https://api.fake-rest.refine.dev";
  const RESYS_API_URL = "https://dolphin-app-7ux4p.ondigitalocean.app";

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider direction={direction}>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={{
                    default: dataProvider(FAKE_API_URL),
                    resys: dataProvider(RESYS_API_URL),
                  }}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  i18nProvider={i18nProvider}
                  resources={[
                    // {
                    //   name: "blog_posts",
                    //   list: "/blog-posts",
                    //   create: "/blog-posts/create",
                    //   edit: "/blog-posts/edit/:id",
                    //   show: "/blog-posts/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    //   show: "/categories/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                    {
                      name: "properties",
                      list: "/properties",
                      create: "/properties/create",
                      edit: "/properties/edit/:property_id",
                      show: "/properties/show/:property_id",
                      identifier: "property_id",
                      meta: {
                        canDelete: true,
                        dataProviderName: "resys",
                      },
                    },
                    // {
                    //   name: "contracts",
                    //   list: "/contracts",
                    //   create: "/contracts/create",
                    //   edit: "/contracts/edit/:contract_id",
                    //   show: "/contracts/show/:contract_id",
                    //   identifier: "contract_id",
                    //   meta: {
                    //     canDelete: true,
                    //     dataProviderName: "resys",
                    //   },
                    // },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "4BAzgU-evOswC-0KggMX", // don't change
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2
                            Title={({ collapsed }) => (
                              <ThemedTitleV2
                                // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                collapsed={collapsed}
                                text={"Jazeera properties"}
                              />
                            )}
                            Header={() => <Header sticky />}
                            Sider={(props) => (
                              <ThemedSiderV2 {...props} fixed />
                            )}
                            
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        index
                        // element={<NavigateToResource resource="blog_posts" />}
                        element={<NavigateToResource resource="properties" />}

                      />
                      {/* <Route path="/blog-posts">
                        <Route index element={<BlogPostList />} />
                        <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} />
                      </Route>
                      <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route> */}
                      <Route path="/properties">
                        <Route index element={<PropertyList />} />
                        <Route path="create" element={<PropertyCreate />} />

                        <Route
                          path="edit/:property_id"
                          element={<AntdInferencer />}
                        />
                        <Route
                          path="show/:property_id"
                          element={<AntdInferencer />}
                        />
                      </Route>
                      {/* <Route path="/contracts">
                        <Route index element={<AntdInferencer />} />
                        <Route path="create" element={<AntdInferencer />} />
                        <Route
                          path="edit/:contract_id"
                          element={<AntdInferencer />}
                        />
                        <Route
                          path="show/:contract_id "
                          element={<AntdInferencer />}
                        />
                      </Route> */}
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
