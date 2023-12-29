import { useEffect, useState } from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
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
import { dataProvider } from "./dataProvider";
// import dataProvider from "@refinedev/simple-rest";

import { App as AntdApp, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { accessControlProvider } from "./access-control-provider";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { useDirection } from "./contexts/DirectionContext";

import { PropertyCreate, PropertyList } from "./pages/properties";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { PropertyEdit } from "./pages/properties/edit";
import {
  CaretakersList,
  CaretakersCreate,
  CaretakersEdit,
  CaretakersShow,
} from "./pages/caretakers";

import { CustomerList, CustomerShow } from "./pages/customers";
import { TenantList, TenantShow } from "./pages/tenants";
import { ContractList, ContractShow } from "./pages/contracts";
import { InvoiceList, InvoiceShow } from "./pages/invoices";

// import { UserList, UserCreate } from "./pages/users";

function App() {
  const { t, i18n } = useTranslation();
  const { direction } = useDirection();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const FAKE_API_URL = "https://api.fake-rest.refine.dev";
  // const RESYS_API_URL = import.meta.env.VITE_PRODUCTION_SERVER_URL;
  const RESYS_API_URL = import.meta.env.VITE_DEVELOPMENT_SERVER_URL;

  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const user_data = localStorage.getItem("user_data");
    setRole(JSON.parse(user_data || "{}").role);
  }, []);

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
                  accessControlProvider={accessControlProvider}
                  i18nProvider={i18nProvider}
                  resources={[
                    {
                      name: "properties",
                      list: "/properties",
                      create: "/properties/create",
                      edit: "/properties/edit/:id",
                      show: "/properties/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                      },
                    },
                    // {
                    //   name: "users",
                    //   list: "/users",
                    //   create: "/users/create",
                    //   meta: {
                    //     identifier: "id",
                    //     dataProviderName: "resys",
                    //   },
                    // },
                    {
                      name: "caretaker_properties",
                      list: "caretaker_properties",
                      create: "/caretaker_properties/create",
                      edit: "/caretaker_properties/edit/:id",
                      show: "/caretaker_properties/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                        label: "Caretakers",
                      },
                    },
                    {
                      name: "customers",
                      list: "customers",
                      show: "/customers/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                        label: "Customers",
                      },
                    },
                    {
                      name: "tenants",
                      list: "tenants",
                      show: "/tenants/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                        label: "Tenants",
                      },
                    },
                    {
                      name: "contracts",
                      list: "contracts",
                      show: "/contracts/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                        // label: "Contracts",
                      },
                    },
                    {
                      name: "invoices",
                      list: "invoices",
                      show: "/invoices/show/:id",
                      meta: {
                        identifier: "id",
                        dataProviderName: "resys",
                        label: "Invoices",
                      },
                    },

                    // {
                    //   name: "posts",
                    //   list: "/posts",
                    //   show: "/posts/show/:id",
                    //   create: "/posts/create",
                    //   edit: "/posts/edit/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                    // {
                    //   name: "users",
                    //   list: "/users",
                    //   show: "/users/show/:id",
                    //   create: "/users/create",
                    //   edit: "/users/edit/:id",
                    // },
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   show: "/categories/show/:id",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    // },
                    // {
                    //   name: "blog_posts",
                    //   list: "/blog-posts",
                    //   create: "/blog-posts/create",
                    //   edit: "/blog-posts/edit/:id",
                    //   show: "/blog-posts/show/:id",
                    //   meta: {
                    //     dataProviderName: "default",
                    //     canDelete: true,
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
                                text={"Jazeera Properties"}
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

                      {/* <Route path="/posts">
                        <Route index element={<PostList />} />
                        <Route path="create" element={<PostCreate />} />
                        <Route path="edit/:id" element={<PostEdit />} />
                        <Route path="show/:id" element={<PostShow />} />
                      </Route>

                      <Route path="/users">
                        <Route index element={<UserList />} />
                        <Route path="create" element={<UserCreate />} />
                        <Route path="edit/:id" element={<UserEdit />} />
                        <Route path="show/:id" element={<UserShow />} />
                      </Route>

                      <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route> */}

                      {/* <Route path="/blog-posts">
                        <Route index element={<BlogPostList />} />
                        <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} />
                      </Route> */}
                      {/* <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route>  */}

                      <Route path="/properties">
                        <Route index element={<PropertyList />} />
                        <Route path="create" element={<PropertyCreate />} />
                        <Route path="edit/:id" element={<PropertyEdit />} />
                        <Route path="show/:id" element={<AntdInferencer />} />
                      </Route>
                      <Route path="caretaker_properties">
                        <Route index element={<CaretakersList />} />
                        <Route path="create" element={<CaretakersCreate />} />
                        <Route path="edit/:id" element={<CaretakersEdit />} />
                        <Route path="show/:id" element={<CaretakersShow />} />
                      </Route>
                      <Route path="customers">
                        <Route index element={<CustomerList />} />
                        <Route path="show/:id" element={<CustomerShow />} />
                      </Route>
                      <Route path="tenants">
                        <Route index element={<TenantList />} />
                        <Route path="show/:id" element={<TenantShow />} />
                      </Route>
                      <Route path="contracts">
                        <Route index element={<ContractList />} />
                        <Route path="show/:id" element={<ContractShow />} />
                      </Route>
                      <Route path="invoices">
                        <Route index element={<InvoiceList />} />
                        <Route path="show/:id" element={<InvoiceShow />} />
                      </Route>
                      
                      {/* <Route path="/users">
                        <Route index element={<UserList />} />
                        <Route path="create" element={<UserCreate />} />
                      </Route> */}

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
