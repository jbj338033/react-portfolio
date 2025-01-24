import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import NarshaLayout from "./components/narsha/NarshaLayout";
import NarshaDetail from "./components/narsha/NarshaDetail";
import DatabaseLayout from "./components/database/DatabaseLayout";
import DatabaseDetail from "./components/database/DatabaseDetail";
import NarshaList from "./components/narsha/NarshaList";
import NarshaDiaryContainer from "./components/narsha/NarshaDiaryContainer";
import AlgorithmLayout from "./components/algorithm/AlgorithmLayout";
import AlgorithmList from "./components/algorithm/AlgorithmList";
import AlgorithmDetail from "./components/algorithm/AlgorithmDetail";
import { ThemeProvider } from "@emotion/react";
import { useThemeStore } from "./stores/theme";
import { THEMES } from "./constants/theme";
import AILayout from "./components/ai/AILayout";
import AIList from "./components/ai/AIList";
import AIDetail from "./components/ai/AIDetail";
import MathLayout from "./components/math/MathLayout";
import MathList from "./components/math/MathList";
import MathDetail from "./components/math/MathDetail";
import NewYearCounter from "./pages/NewYear";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import ProjectLayout from "./layouts/ProjectLayout";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={THEMES[theme]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/projects" element={<ProjectLayout />}>
            <Route index element={<Projects />} />
            <Route path=":projectId" element={<ProjectDetail />} />
          </Route>

          <Route path="/narsha" element={<NarshaLayout />}>
            <Route index element={<NarshaList />} />

            <Route path=":projectId" element={<NarshaDiaryContainer />} />

            <Route path=":projectId/:entryId" element={<NarshaDetail />} />
          </Route>

          <Route path="/database" element={<DatabaseLayout />}>
            <Route path=":id" element={<DatabaseDetail />} />
          </Route>

          <Route path="/algorithm" element={<AlgorithmLayout />}>
            <Route index element={<Navigate to="/algorithm/sort" replace />} />
            <Route path=":category" element={<AlgorithmList />} />
            <Route path=":category/:id" element={<AlgorithmDetail />} />
            <Route
              path="*"
              element={<Navigate to="/algorithm/sort" replace />}
            />
          </Route>

          <Route path="/ai" element={<AILayout />}>
            <Route index element={<Navigate to="/ai/basics" replace />} />
            <Route path=":chapterId" element={<AIList />} />
            <Route path=":chapterId/:topicId" element={<AIDetail />} />
            <Route path="*" element={<Navigate to="/ai/basics" replace />} />
          </Route>

          <Route path="/math" element={<MathLayout />}>
            <Route index element={<Navigate to="/math/polynomial" replace />} />
            <Route path=":chapterId/:topicId" element={<MathDetail />} />
            <Route path=":chapterId" element={<MathList />} />
            <Route
              path="*"
              element={<Navigate to="/math/polynomial" replace />}
            />
          </Route>

          <Route path="/newyear" element={<NewYearCounter />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
