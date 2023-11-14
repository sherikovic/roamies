import { Injectable, Logger } from '@nestjs/common'
import { TELEGRAM_TOKEN, OPENWEATHER_APIKEY } from "./telegram.constants"
import axios from 'axios'
const store = require('store')
const schedule = require('node-schedule')

const TelegramBot = require('node-telegram-bot-api')

@Injectable()
export class TelegramBotService {
    private readonly bot: any
    private logger = new Logger(TelegramBotService.name)

    constructor() {
        this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

        this.bot.onText(/\/start/, this.onStart)
        this.bot.onText(/\/subscribe/, this.onStart)
        this.bot.onText(/\/unsubscribe/, this.onUnsubscribe)
        this.bot.onText(/\/update/, this.onUpdate)

        this.bot.on("polling_error", this.logger.debug);

        this.bot.setMyCommands([
            { command: '/start', description: "registers a user to the list" },
            { command: '/subscribe', description: "same as /start" },
            { command: '/unsubscribe', description: "remvoes user from the list" },
            { command: '/update', description: "updates user\'s location" }
        ])

        this.bot.on('location', this.onLocation)
        this.bot.on('callback_query', (callbackQuery) => {
            const action = callbackQuery.data
            const msg = callbackQuery.message
            const chat_id = msg.chat.id

            if (action === 'subscribe') {
                this.onSubscribe(chat_id)
            } else if (action === 'update') {
                this.sendLocateMeMessage(chat_id)
            } else if (action === 'noupdate') {
                this.bot.sendMessage(chat_id, "All set!")
            }
        })

        this.scheduleJob(this.bot)
    }

    scheduleJob = (bot: any) => {
        const job = schedule.scheduleJob('* 9 * * *', () => {
            const subscribed_users = store.get('subscribed')
            if (subscribed_users) {
                subscribed_users.forEach(async user => {
                    try {
                        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${user.location.latitude}&lon=${user.location.longitude}&appid=${OPENWEATHER_APIKEY}`)
                        const msg = `Temperature in ${data.name}, ${data.sys.country} is ${Math.floor(data.main.temp - 273.15)}, humidity is ${data.main.humidity} with ${data.weather[0].description}`
                        bot.sendMessage(user.chat_id, msg)
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
        })
    }

    onStart = (msg: any) => {
        const chat_id = msg.chat.id
        if (this.checkIfUserIsSubscribed(chat_id)) {
            this.bot.sendMessage(chat_id, "You're already subscribed!")
        } else {
            this.bot.sendMessage(
                chat_id,
                'Welcome to this Weather bot!',
                {
                    parse_mode: "Markdown",
                    reply_markup: JSON.stringify({
                        inline_keyboard: [[{
                            text: 'Subscibe?',
                            callback_data: 'subscribe'
                        }]]
                    })
                }
            )
        }
    }
    onSubscribe = (chat_id: any) => {
        this.sendLocateMeMessage(chat_id)
    }
    onUnsubscribe = (msg: any) => {
        const chat_id = msg.chat.id
        if (this.checkIfUserIsSubscribed(chat_id)) {
            const subscribed_users = store.get('subscribed')
            const newData = subscribed_users.filter(user => user.chat_id !== chat_id)
            store.set('subscribed', newData)
            this.bot.sendMessage(chat_id, 'You have successfully unsubscribed!')
        } else {
            this.bot.sendMessage(chat_id, "You're not subscribed!")
        }
    }
    onUpdate = (msg: any) => {
        const chat_id = msg.chat.id
        if (this.checkIfUserIsSubscribed(chat_id)) {
            this.sendUpdateLocationMessage(chat_id)
        } else {
            this.bot.sendMessage(chat_id, "You're not subscribed, send /start or /subscribe to subscribe.")
        }
    }
    onLocation = (msg: any) => {
        const chat_id = msg.chat.id
        const location = {
            latitude: msg.location.latitude,
            longitude: msg.location.longitude
        }
        if (this.checkIfUserIsSubscribed(chat_id)) {
            this.updateUserLocation(chat_id, location)
        } else {
            this.saveUserData(chat_id, location)
        }
    }

    updateUserLocation = (chat_id: any, location: any) => {
        let subscribed_users = store.get('subscribed')
        const index = subscribed_users.findIndex(user => user.chat_id === chat_id)
        subscribed_users[index].location = location
    }

    saveUserData = (chat_id: any, location: object) => {
        let subscribed_users = store.get('subscribed')
        const newData = {
            chat_id,
            location
        }
        if (!subscribed_users) {
            subscribed_users = [newData]
            store.set('subscribed', subscribed_users)
        } else {
            const newSubs = subscribed_users.push(newData)
            store.set('subscribed', newSubs)
        }
        this.bot.sendMessage(chat_id, "You're now subscribed!")
    }

    checkIfUserIsSubscribed = (chat_id: any) => {
        const subscribed_users = store.get('subscribed')
        if (subscribed_users) {
            if (subscribed_users.find(user => user.chat_id === chat_id)) {
                return true
            }
        }
        return false
    }

    sendLocateMeMessage = async (chat_id: any) => {
        this.bot.sendMessage(
            chat_id,
            "Click on \"Locate Me\" to request your location.", {
            parse_mode: "Markdown",
            reply_markup: {
                one_time_keyboard: true,
                resize_keyboard: true,
                keyboard: [[
                    {
                        text: "Locate me",
                        request_location: true
                    }
                ],
                ["Cancel"]]
            }
        })
    }

    sendUpdateLocationMessage = (chat_id: any) => {
        this.bot.sendMessage(
            chat_id,
            'Would you like to update your location?',
            {
                parse_mode: "Markdown",
                reply_markup: JSON.stringify({
                    inline_keyboard:
                        [[
                            {
                                text: 'Yes',
                                callback_data: 'update'
                            },
                            {
                                text: 'No',
                                callback_data: 'noupdate'
                            }
                        ]]
                })
            }
        )
    }
}
