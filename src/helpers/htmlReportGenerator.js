const reporter = require('cucumber-html-reporter');
let date = new Date();

let currentDate = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear() + '_' + date.getHours()
                 + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();

let options = {

  brandtitle:"DeepPack",
  theme: "bootstrap",
  jsonFile:'artifacts/reports/cucumber_report.json',
  output:`artifacts/reports/cucumber_report_${currentDate}.html`,
  screenshotsDirectory:'artifacts/screenshots/',
  storeScreenshots:true,
  reportSuiteAsScenarios:true,
  lauchReport:true,
  metadata:{
    "App Version":"1.1.1",
    "Test Environment":"QA",
    "Platform":"web/React",
    "Sprint":"001"


  }




};

reporter.generate(options);
