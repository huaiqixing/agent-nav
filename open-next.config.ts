import { defineCloudflareConfig } from '@opennextjs/cloudflare'

const config = defineCloudflareConfig({
  cloudflare: {
    useWorkerdCondition: true,
  },
})

export default config