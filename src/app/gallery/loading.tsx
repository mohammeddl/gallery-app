export default function Loading() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden'>
              <div className='relative pb-[100%] bg-gray-200 animate-pulse' />
              <div className='p-4'>
                <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
