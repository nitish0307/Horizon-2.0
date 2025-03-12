"use client"

import { withAuth } from "@/components/with-auth"

function ChannelsPage() {
  // Your channels page content
  return (
    <div>
      <h1>Channels</h1>
      {/* Rest of your channels page content */}
    </div>
  )
}

export default withAuth(ChannelsPage)

