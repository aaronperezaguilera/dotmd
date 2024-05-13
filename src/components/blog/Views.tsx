import { useEffect, useState } from 'react'

export const Views = ({ slug, increment }: { slug: string; increment?: boolean }) => {
  const [views, setViews] = useState()

  useEffect(() => {
    if (increment) {
      const incrementViews = async () => {
        await fetch(`/api/${slug}`, {
          method: 'POST'
        })
      }
      incrementViews()
    }
    const fetchViews = async () => {
      const visitsData = await fetch(`/api/${slug}`)
      const visits = await visitsData.json()

      setViews(visits)
    }
    fetchViews()
  }, [slug])

  return (
    <div className='flex items-center'>
      <span>{views}</span>
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='ml-1'
      >
        <path
          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        ></path>
        <path
          d='M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        ></path>
      </svg>
    </div>
  )
}

export default Views
