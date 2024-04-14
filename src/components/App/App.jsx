import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshUser } from '../../redux/auth/operations'
import { selectIsRefreshing } from '../../redux/auth/selectors'
import Layout from '../Layout/Layout'
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute'
import PrivateRout from '../PrivateRoute/PrivateRoute'
import NotFoundPage from '../../pages/NotFoundPage'
import Loader from '../Loader/Loader'
import { Toaster } from 'react-hot-toast'

import './App.css'

const HomePage = lazy(() => import('../../pages/HomePage'))
const RegistrationPage = lazy(
  () => import('../../pages/RegistrationPage'),
)
const LoginPage = lazy(() => import('../../pages/LoginPage'))
const ContactsPage = lazy(() => import('../../pages/ContactsPage'))

export default function App() {
  const dispatch = useDispatch()
  const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return (
    <div className="container">
      <Layout>
        {isRefreshing ? (
          <Loader />
        ) : (
          <Suspense fullback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RegistrationPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRout
                    redirectTo="/login"
                    component={<ContactsPage />}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
      </Layout>
      <Toaster />
    </div>
  )
}
