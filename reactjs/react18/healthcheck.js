const path = require('path')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })

axios
  .get(process.env.FE_BASE_URL)
  .then((res) => {
    if (res.status === 200) {
      process.exit(0)
    } else {
      handleUnhealthyServer()
    }
  })
  .catch(() => {
    handleUnhealthyServer()
  })

function handleUnhealthyServer() {
  //An array of Discord Embeds.
  let embeds = [
    {
      title: 'Website Docker container crashes',
      color: 7015949, // TODO: find a more suitable red color
      footer: {
        text: `📅 ${new Date()}`
      },
      fields: [
        {
          name: 'Environment',
          value: process.env.REACT_APP_FLAGS_CTX_APP_NAME
        },
        {
          name: 'Examined URL',
          value: process.env.FE_BASE_URL
        }
      ]
    }
  ]

  const url = process.env.DISCORD_WEBHOOK_URL
  axios
    .post(url, { embeds })
    .then(() => {
      console.log('Webhook delivered successfully')
      process.exit(1)
    })
    .catch((error) => {
      console.log(error)
      process.exit(1)
    })
}
