import registerRoutes from "./handler.js"
import Express from "express"
import { Client, GatewayIntentBits, Partials } from "discord.js"
import cors from "cors"
import requestIp from "request-ip"
import { config } from "dotenv"
import "colors"

import Contador from "./database/models/contador.js"


import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'




const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
})

const app = Express()
app.use(requestIp.mw())
app.use(
  cors({ origin: "*", methods: ["GET"], })
)

config()
registerRoutes(app)


import connectiondb from "./database/connect.js"
connectiondb.start()




app.use(async (req, res, next) => {

  try {
    const resultado = await Contador.findOne()
    let requestCount = resultado ? resultado.contagem : 0;

    requestCount++;

    await Contador.findOneAndUpdate({}, { contagem: requestCount }, { upsert: true })

    next();
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).send('Erro interno do servidor');
  }

})


app.get('/stats', (req, res) => {
  Contador.findOne()
    .then(resultado => {
      const requestCount = resultado ? resultado.contagem : 0;
      res.json({ totalRequests: requestCount });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    });
});



client.on('ready', async () => {
  let i = 0;

  setInterval(async () => {
    const resultado = await Contador.findOne();
    let requestCount = resultado ? resultado.contagem : 0;

    let status = [`Request: ${requestCount}`];

    client.user.setPresence({
      activities: [{ name: `${status[i++ % status.length]}`, type: 3 }],
      status: 'online',
    });
  }, 10000); // Intervalo ajustado para 10 segundos

  client.user.setStatus('online');
});


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
