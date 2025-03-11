import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "./contexts/GlobalContext"
import { SearchProvider } from "./contexts/SearchContext.jsx";

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import AdvancedResearch from "./pages/AdvancedResearch.jsx";
import ApartmentDetails from "./pages/ApartmentDetails.jsx";
import ApartmentPostForm from "./pages/ApartmentPostForm.jsx";
import Homepage from "./pages/Homepage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Terms from './components/Terms.jsx';




function App() {


  return (
    <BrowserRouter>
      <GlobalProvider>
        <SearchProvider>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={Homepage} />
              <Route path="/apartment">
                <Route index Component={Homepage} />

                <Route path=":slug" Component={ApartmentDetails} />

              </Route>
              <Route path="/advanced-research" Component={AdvancedResearch} />
              <Route path="/post-apartment" Component={ApartmentPostForm} />
              <Route path="/terms" Component={Terms} />
              <Route path="*" Component={NotFound} />
            </Route>
          </Routes>
        </SearchProvider>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App