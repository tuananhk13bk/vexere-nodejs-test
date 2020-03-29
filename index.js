const CronJob = require("cron").CronJob

const job = new CronJob(
  "* * * * * *",
  function() {
    console.log("You will see this message every second")
  },
  null,
  true,
)

job.start()
