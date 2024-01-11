import { useState, useEffect } from 'react'
import DashboardStatsCard from './DashboardStatsCard '

const DashboardStats = ({ startDate, endDate }) => {
   const [dashboardStats, setDashboardStats] = useState({
      topTrendingKeyword: [],
      totalActiveUsers: [],
      totalFavorites: [],
   })

   useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch('/api/dashboard-stats', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  startDate,
                  endDate,
               }),
            })

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()

            setDashboardStats(data)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      })()
   }, [startDate, endDate])

   return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-6 sm:mx-12 md:mt-6 sm:mt-4 mt-2 gap-4">
         <DashboardStatsCard
            title="Total Active Users"
            data={dashboardStats.totalActiveUsers[0]?.totalActiveUsers || 0}
         />
         <DashboardStatsCard
            title="Top Trending Keyword"
            data={dashboardStats.topTrendingKeyword[0]?._id || 0}
         />
         <DashboardStatsCard
            title="Total Favorites"
            data={dashboardStats.totalFavorites[0]?.totalUniqueFavorites || 0}
         />
      </div>
   )
}

export default DashboardStats
