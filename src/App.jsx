
import './App.css'
import { Route,Routes } from 'react-router-dom'
import LatestJobs from './pages/LatestJobs'
import Home from './pages/Home'
import Results from './pages/Results'
import AdmitCard from './pages/AdmitCard'
import AnswerKey from './pages/AnswerKey'
import Syllabus from './pages/Syllabus'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Adminlayout from './layout/Adminlayout'
import JobSingle from './pages/JobSingle'
import SingleAdmit from './pages/SingleAdmit'
import SngleResult from './pages/SngleResult'
import SingleAnswer from './pages/SingleAnswer'
import SingleSyllabus from './pages/SingleSyllabus'
import Footer from './components/Footer'
import SingleAdmission from './pages/SingleAdmission'


function App() {
 

  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/latestjob' Component={LatestJobs}/>
    <Route path='/results' Component={Results}/>
    <Route path='/admitcard' Component={AdmitCard}/>  
    <Route path='/answer-key' Component={AnswerKey}/>  
    <Route path='/syllabus' Component={Syllabus}/>  
    <Route path='/contact' Component={Contact}/>  
    <Route path='/job/:id' Component={JobSingle}/>  
    <Route path='/admit-card/:id' Component={SingleAdmit}/>  
    <Route path='/result/:id' Component={SngleResult}/>  
    <Route path='/answer-key/:id' Component={SingleAnswer}/>  
    <Route path='/syllabus/:id' Component={SingleSyllabus}/>  
    <Route path='/admission/:id' Component={SingleAdmission}/>  

    {/* <Route path='/admin' Component={Adminlayout}>
    
    </Route> */}
  </Routes>
  <Footer/>
  </>
  )
}

export default App
