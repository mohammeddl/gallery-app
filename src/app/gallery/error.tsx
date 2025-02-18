"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Gallery error:", error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Photo Gallery</h1>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='bg-red-50 border-l-4 border-red-400 p-4 rounded-md'>
          <div className='flex items-center'>
            <AlertCircle className='h-6 w-6 text-red-400 mr-3' />
            <div>
              <h3 className='text-lg font-medium text-red-800'>
                Something went wrong!
              </h3>
              <div className='mt-2 text-red-700'>
                <p>
                  {error.message ||
                    "An error occurred while loading the gallery."}
                </p>
              </div>
              <div className='mt-4'>
                <button
                  onClick={reset}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                  <RefreshCcw className='h-4 w-4 mr-2' />
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
