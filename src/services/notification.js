const connection = require("../database/connection");
const moment = require('moment');
const CronJob = require("cron").CronJob;
const axios = require("axios").default;

const DoorOpening = new CronJob('*/10 * * * * *', async () => {
    const equipments = await connection("equipments").select("*");
    for (let i = 0; i < equipments.length; i++) {
        const door_openings = await connection("door_openings").select("*").where("sensorSerialNo", "=", equipments[i].serial).orderBy("id", "DESC").first();
        if (door_openings) {
            if (door_openings.open) {
                if (!door_openings.notification) {
                    const d1 = moment(new Date());
                    const d2 = moment(door_openings.created_at);
                    if (d1.diff(d2) > 9000) {
                        await axios.post(process.env.APP_URL + "/notification", { serial: door_openings.sensorSerialNo, title: "Porta aberta mais que 20 segundos", type: "warning" }).then(() => { }).catch(() => { });
                        await connection("door_openings").where("id", door_openings.id).update({ notification: true });
                    }
                }
            }
        }
    }
}, null, true, 'America/Sao_Paulo');

DoorOpening.start();