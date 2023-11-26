import registerRoutes from "./handler.js"
import Express from "express"
import cors from "cors"
import requestIp from "request-ip"
import { config } from "dotenv"
import "colors"
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { Client, GatewayIntentBits, Partials } from "discord.js"

const client = new Client({
  intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds],
  partials: [Partials.User, Partials.GuildMember],
})

const app = Express()
app.use(requestIp.mw())
app.use(
  cors({ origin: "*", methods: ["GET"], })
)

config()
registerRoutes(app)

app.listen(8080, () => {
  console.log("[📡 SERVIDOR EXPRESS]".bgMagenta, "Online: Porta 8080.".magenta)
  client.login(process.env.BOT_TOKEN).then(() => {
    console.log("[🤖 BOT DISCORD]".bgCyan, "Conectado.".cyan)
  })
})


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "90s")
})


const HTTP_STATUS = {
  OK: 200,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
}

app.use(async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || ""
    const { success, reset } = await ratelimit.limit(ip)

    if (!success) {
      const now = Date.now()
      const retryAfter = Math.floor((reset - now) / 1000)

      res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        status: HTTP_STATUS.TOO_MANY_REQUESTS,
        headers: { 'Tentar novamente depois de': `${retryAfter} segundos` },
        message: 'Muitas solicitações',
      })
    } else {
      next()
    }
  } catch (error) {
    console.error("Erro ao verificar limite de taxa de processamento:", error)

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send("Erro do Servidor Interno")
  }
})



export default client
process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise)
})
process.on("uncaughtException", (error, origin) => {
  console.log(error, origin)
})
process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(error, origin)
})
