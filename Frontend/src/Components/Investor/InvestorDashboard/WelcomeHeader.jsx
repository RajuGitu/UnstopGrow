import React from 'react'

function WelcomeHeader() {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-indigo-100">
          Discover promising startups and grow your investment portfolio.
        </p>
      </div>
    </>
  )
}

export default WelcomeHeader
