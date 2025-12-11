import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Layout/Router';
import Authprovider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';

// 1. এই লাইনটা ইম্পোর্ট করো (TanStack Query সেটআপের জন্য)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. একটা ক্লায়েন্ট তৈরি করো
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      
      {/* 3. QueryClientProvider দিয়ে রাউটারকে মুড়িয়ে দিতে হবে */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      
    </Authprovider>
    <ToastContainer />
  </StrictMode>
)