// node_modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// pages
import { DashboardPage, AudioControlPage, AddNewAudioPage } from "./pages";

// components
import { LayoutComponent } from "./components";

import { PATH } from "./consts";

import store from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LayoutComponent>
                    <Routes>
                        <Route
                            path={PATH.Dashboard}
                            exact={true}
                            element={<DashboardPage />}
                        />
                        <Route
                            path={`${PATH.AudioControl}/:id`}
                            exact={true}
                            element={<AudioControlPage />}
                        />
                        <Route
                            path={PATH.AddNewAudio}
                            exact={true}
                            element={<AddNewAudioPage />}
                        />
                    </Routes>
                </LayoutComponent>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
