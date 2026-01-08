import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Layout from "./components/pages/Layout"
import Claims from "./components/claims/Claims"
import Labs from './components/mow/Labs'
import Dwss from './components/mow/Dwss'
import Dwq from './components/mow/Dwq'
import Dwr from './components/mow/Dwr'
import Maji from './components/mow/Maji'
import Basin from './components/mow/Basin'
import Region from "./components/regions/Region";
import Projects from "./components/projects/Projects"
import BasinProjects from "./components/basinprojects/BasinProjects"
import Ruwasa from './components/ruwasa/Ruwasa'
import RegionDetails from './components/ruwasa/RegionDetails'
import DistrictProjects from './components/ruwasaprojects/DistrictProjects'
import Planned from './components/projects/Planned'
import Ongoing from './components/projects/Ongoing'
import Completed from './components/projects/Completed'
import RegionProjects from './components/projects/RegionProjects'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
         <Route index element={<Home />}/>
         <Route path="claims" element={<Claims/>}/>
         <Route path="dwss" element={<Dwss/>}/>
         <Route path="dwq" element={<Dwq/>}/>
         <Route path="dwr" element={<Dwr/>}/>
         <Route path="basins" element={<Basin/>}/>
         <Route path="labs" element={<Labs/>}/>
         <Route path="maji" element={<Maji/>}/>
         <Route path="ruwasa" element={<Ruwasa/>}/>
         <Route path="regions/:regionKey" element={<Region/>}/>
         <Route path="projects/:regionKey" element={<Projects/>}/>
         <Route path="basinprojects/:basinKey" element={<BasinProjects/>}/>
         <Route path="ruwasa/:regionKey" element={<RegionDetails />} />
         <Route path="ruwasaprojects/:districtKey" element={<DistrictProjects />} />
         <Route path="planned" element={<Planned/>}/>
         <Route path="ongoing" element={<Ongoing/>}/>
         <Route path="completed" element={<Completed/>}/>
         <Route path="/ongoingregions/:region" element={<RegionProjects/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
