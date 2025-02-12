import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import CommonLayout from './components/common-layout'
import TasksPage from './pages/tasks'
import ScrumBoardPage from './pages/scrum-board'

function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/tasks' element={<CommonLayout />}>
        <Route path='list' element={<TasksPage />} />
        <Route path='scrum-board' element={<ScrumBoardPage />} />
      </Route>
      {/* fallback route */}
      <Route path='*' element={<Navigate to="/auth" />} />
    </Routes>
  )
}

export default App
