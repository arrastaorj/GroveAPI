import registerRoutes from "./handler.js"
import Express from "express"
import { Client, GatewayIntentBits, Partials } from "discord.js"
import cors from "cors"
import requestIp from "request-ip"
import { config } from "dotenv"
import "colors"

import Contador from "./database/models/contador.js"
import RateLimit from "./database/models/rateLimit.js"



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
    const resultado = await Contador.findOne();
    let requestCount = resultado ? resultado.contagem : 0;

    requestCount++;

    await Contador.findOneAndUpdate({}, { contagem: requestCount }, { upsert: true });

    const ip = req.ip;
    const windowMs = 60 * 2000;
    const maxRequests = 5;

    let rateLimitRecord = await RateLimit.findOne({ ip });

    if (!rateLimitRecord) {
      rateLimitRecord = await RateLimit.create({ ip, requests: 1 });
    } else {
      const now = new Date();
      const timeDiff = now - rateLimitRecord.createdAt;

      if (timeDiff <= windowMs) {
        if (rateLimitRecord.requests >= maxRequests) {
          return res.status(429).json({ error: 'Muitas solicitações' });
        } else {
          await RateLimit.findByIdAndUpdate(rateLimitRecord._id, {
            $inc: { requests: 1 },
          });
        }
      } else {
        await RateLimit.findByIdAndUpdate(rateLimitRecord._id, {
          requests: 1,
          createdAt: now,
        });
      }
    }

    next();
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).send('Erro interno do servidor');
  }
});



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



client.on(`ready`, async () => {

  const resultado = await Contador.findOne();
  let requestCount = resultado ? resultado.contagem : 0;

  let status = [
    `Request: ${requestCount}`
  ],
    i = 0

  setInterval(() => {
    client.user.setPresence({
      activities: [{ name: `${status[i++ % status.length]}`, type: 3 }],
      status: 'online',
    })
  }, 1000)
  client.user.setStatus('online')
});


app.listen(8080, () => {
  console.log("[📡 SERVIDOR EXPRESS]".bgMagenta, "Online: Porta 8080.".magenta)
  client.login(process.env.BOT_TOKEN).then(() => {
    console.log("[🤖 BOT DISCORD]".bgCyan, "Conectado.".cyan)
  })
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
