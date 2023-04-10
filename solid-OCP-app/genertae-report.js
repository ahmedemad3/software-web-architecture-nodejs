// reportGenerator.js
const dataSourceA = require('./dataSourceA')
const dataSourceB = require('./dataSourceB')
const pdfReport = require('./pdfReport')
const excelReport = require('./excelReport')

function generateReport() {
  const dataFromSourceA = dataSourceA.generateData()
  const dataFromSourceB = dataSourceB.generateData()

  const pdfReportData = pdfReport.generateReport(dataFromSourceA, dataFromSourceB)
  const excelReportData = excelReport.generateReport(dataFromSourceA, dataFromSourceB)

  return { pdfReportData, excelReportData }
}

module.exports = { generateReport }

// dataSourceA.js
function generateData() {
  // generate data for data source A
}

module.exports = { generateData }

// dataSourceB.js
function generateData() {
  // generate data for data source B
}

module.exports = { generateData }

// pdfReport.js
function generateReport(dataFromSourceA, dataFromSourceB) {
  // generate PDF report
}

module.exports = { generateReport }

// Excel Report.js
function generateReport(dataFromSourceA, dataFromSourceB) {
  // generate Excel report
 }

module.exports = { generateReport }
