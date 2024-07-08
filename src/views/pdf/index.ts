import {Data, Keyword} from '../../types/Controller/PDF';

const template = function (data: Data): string {
  const locationIcon = `<img 
    src="https://i.ibb.co/64FrgR0/placeholder.png" 
    alt="placeholder" 
    border="0" />`;
  const topArrowIcon = `<img 
    src="https://i.ibb.co/YRfmbcj/top-up.png" 
    alt="top-up" 
    border="0">`;
  let tableRows = '';
  data.keywords.forEach((keyword: Keyword) => {
    tableRows += `<tr>
        <td style="text-align: left;">
          ${keyword.keyword}
        </td>
        <td>
          <p class="current-ranking">
             ${locationIcon}
             <span>
                ${keyword.currentRanking}
             </span>
          </p>
        </td>
        <td>
            <p style="previous-ranking">
                ${locationIcon}
                <span>
                    ${keyword.previousRanking}
                </span>
            </p>
        </td>
        <td>
            <p class="ranking-change-wrapper">
                ${topArrowIcon}
                ${keyword.initialRanking} 
                <span class="ranking-change">
                    ${keyword.initialRankingChange}
                </span>
            </p>
        </td>
    </tr>`;
  });
  const xAxis: string = JSON.stringify(data.xAxis);
  const series: string = JSON.stringify(data.keywords.map((keyword: Keyword) => {
    return {
      label: keyword.keyword.toUpperCase(),
      data: keyword.rankings,
      pointRadius: 5,
      lineTension: 0.5,
    };
  }));
  return `<!DOCTYPE html>
  <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
                content="width=device-width, 
                    user-scalable=no, 
                    initial-scale=1.0, 
                    maximum-scale=1.0, 
                    minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" 
            content="ie=edge">
            <title>
                Report of ${data.domain}
            </title>
            <script 
                src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                html {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                body {
                    margin: 0;
                    font-family: Arial;
                }
                @media print {
                    @page {
                          margin: 0;
                          background-color: #2D2973 !important;
                      }
                    html, body {
                        background-color: #2D2973!important;
                    }
                }
                th{
                    padding: 10px 15px;
                    text-align: center;
                }
                tr{
                    color: #000000;
                }
                tr:nth-child(even) {
                    background-color: #dddddd;
                }
                tr:nth-child(odd) {
                    background-color: #F3F2FF;
                }
                td:first-child{
                    text-transform: uppercase;
                    font-size: 12px;
                }
                td{
                    padding: 5px 15px;
                    text-align: center;
                }
                tr:last-child td:first-child{
                    border-bottom-left-radius: 10px;
                }
                tr:last-child td:last-child{
                    border-bottom-right-radius: 10px;
                }
                td:nth-child(even){
                    background-color: rgba(0, 0, 0, .05);
                }
                .previous-ranking{
                  display: flex; 
                  align-items: center; 
                  text-align: center;
                  justify-content: center;
                }
                .ranking-change-wrapper{
                  display: flex; 
                  align-items: center; 
                  text-align: center;
                }
                .ranking-change{
                  color: #39B54A;
                  font-size: 10px;
                  margin-left: 10px;
                }
                .current-ranking{
                  display: flex; 
                  align-items: center; 
                  text-align: center;
                  justify-content: center;
                }
                .page-header{
                    font-size: 40px;
                    color: #ffffff; 
                    text-transform: uppercase;
                    text-align: center;
                }
                .domain{
                    font-size: 25px; 
                    text-transform: uppercase; 
                    color:#ffffff;
                    padding: 10px 40px;
                    background: #7768DF;
                    border-radius: 30px;
                }
                .ranking-text{
                    position:absolute; 
                    top: -30px; 
                    left: 42.5%; 
                    width: 15%; 
                    text-align: center; 
                    color: #ffffff; 
                    font-size: 20px;
                    text-transform: uppercase;
                    background: #2D2973;
                }
                .dotted-line{
                    border-top: 2px dotted #ffffff; 
                    margin: 20px 0;
                }
                .widget-wrapper{
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-around;
                    margin-bottom: 10px;
                }
                .widget{
                    display: flex;
                    align-items: center;
                    background: #36337A;
                    width: calc(50% - 10px); 
                    border-radius: 10px;
                }
                .widget-number{
                    color: #ffffff;
                    font-size: 35px;
                    font-weight: bold; 
                    margin: 0 20px;
                }
                .widget-text{
                    color: #ffffff; 
                    font-size: 15px; 
                    font-weight: 300;
                    letter-spacing: 0.8px;
                    line-height: 18px;
                }
                .chart-header{
                    position:absolute; 
                    top: -15px; 
                    left: 0; 
                    width: 50%; 
                    color: #ffffff; 
                    font-size: 12px;
                    background: #2D2973;
                    padding-left: 10px;
                }
                .chart-header-bullet{
                    height: 10px;
                    width: 20px;
                    border-radius: 5px;
                    display: inline-block;
                    margin-right: 10px;
                    background-color:#7768DF;
                }
                .google{
                    display: inline-block;
                    margin-left: 10px; 
                    padding-right: 10px;
                    color: #ffffff;
                }
                .relative-100{
                    position: relative; 
                    width: 100%;
                }
                .mb-20{
                    margin-bottom: 20px;
                }
                .below-chart-header{
                    background: #2D2973;
                    padding-left: 10px;
                    color: #ffffff;
                    position:absolute;
                    top: -30px;
                    display: flex;
                    align-items: center;
                }
                .table{
                    width: 100%;
                    color: #ffffff;
                    border: none;
                    border-collapse: collapse;
                    border-radius: 10px;
                }
                .tHead{
                    background-color:#7768DF;
                    color: #ffffff;
                }
                .tHead-first{
                    border-top-left-radius: 10px;
                    text-align: left;
                }
                .thHead-last{
                    border-top-right-radius: 10px;
                }
                .bellow-chart-header{
                    background: #2D2973;
                    padding-left: 10px;
                    color: #ffffff;
                    position:absolute;
                    top: -30px;
                    display: flex;
                    align-items: center;
                }
                .footer-text{
                    width: 90%;
                    margin-top: 0;
                    color: #ffffff; 
                    word-spacing: 2px;
                }
                .footer-text-bullet{
                    display: inline-block; 
                    height: 5px; 
                    width: 30px;
                    background-color: #FF2F5E;
                    margin-top: 10px;
                    border-radius: 3px;
                }
            </style>
        </head>
        <body>
            <div style="padding: 50px;">
                <h1 class="page-header">SEARCH ENGINE RANKINGS</h1>
                <h2 style="text-align: center;margin-bottom: 55px;">
                    <span class="domain">${data.domain}</span>
                </h2>
                <div class="relative-100">
                    <p class="ranking-text">Ranking</p>
                    <div class="dotted-line"></div>
                </div>
                  <div class="widget-wrapper">
                      <div class="widget">
                          <img 
                            src="https://i.ibb.co/NrrVPxH/first-Icon.png" 
                            alt="FirstIcon" 
                            style="margin-left: 10px;">
                          <span class="widget-number">${data.totalKeywords}</span>
                          <span class="widget-text">Total Keywords</span>
                      </div>
                      <div class="widget">
                          <img 
                            src="https://i.ibb.co/VtnNC8r/fourth-Icon.png" 
                            alt="FirstIcon" 
                            style="margin-left: 10px;">
                          <span class="widget-number">${data.improvedRanking}</span>
                          <span class="widget-text">Ranking Changes<br>Improved</span>
                      </div>
                  </div>
                  <div class="relative-100">
                      <p class="chart-header">
                          <span class="chart-header-bullet"></span>
                          Keywords Ranking on First Page in Major Search Engines
                      </p>
                      <div class="dotted-line"></div>
                  </div>
                <div>
                <canvas id="myChart"></canvas>
                </div>
          <div class="relative-100 mb-20">
              <p class="bellow-chart-header">
                  <img 
                    src="https://i.ibb.co/1b5HNfR/google.png" 
                    style="height: 30px;width: 30px;"
                    alt="google" border="0">
                  <span class="google">Google (US)</span>
              </p>
              <div class="dotted-line"></div>
          </div>
          <div>
              <table class="table">
                  <tr style="background-color:#7768DF;color: #ffffff;">
                      <th class="tHead-first">Keyword</th>
                      <th>Current <br> ${data.currentDate.toString()}</th>
                      <th>Previous <br> ${data.previousDate.toString()}</th>
                      <th class="tHead-last">Initial Ranking</th>
                  </tr>
                  ${tableRows}
              </table>
          </div>
          <div style="display: flex;margin-top: 30px;">
              <div style="display: flex;">
                  <div style="width: 10%">
                      <img 
                      src="https://i.ibb.co/hL4F3yh/white-Location.png" 
                      alt="white-Location" 
                      border="0">
                  </div>
                  <p class="footer-text">
                      Represents the website rankings in the local map pack
                       in the google search results.
                      <br>
                      <span class="footer-text-bullet"></span>
                  </p>
              </div>
              <div style="display: flex;">
                  <div style="width: 10%">
                  <img 
                    src="https://i.ibb.co/k55Q2Q1/barChart.png" 
                    alt="barChart" 
                    border="0">
                  </div>
                  <p class="footer-text">
                      Represents the website rankings in the knowledge 
                      panel of google search results.
                      <br>
                      <span class="footer-text-bullet"></span>
                  </p>
              </div>
              <div style="display: flex;">
                  <div style="width: 10%">
                    <img 
                      src="https://i.ibb.co/VD77Pcn/image-Icon.png" 
                      alt="image-Icon" 
                      border="0">
                  </div>
                  <p class="footer-text">
                      Represents the website rankings in the carousel 
                      section of google search results.
                      <br>
                      <span class="footer-text-bullet"></span>
                  </p>
              </div>
          </div>
          </div>
          <script>
              const ctx = document.getElementById('myChart');
              const series = JSON.parse('${series}');
              const xAxis = JSON.parse('${xAxis}');
              new Chart(ctx, {
              type: 'line',
              data: {
                labels: xAxis,
                datasets: series
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#fff",
                    },
                  },
                  x: {
                    ticks: {
                        color: "#fff",
                    },
                    grid: {
                        display: false,
                    }
                  }
                },
                bezierCurve: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                      usePointStyle: true,
                      color: "#fff",
                    },
                  }
                }
              }
            });
          </script>
        </body>
    </html>`;
};
export default template;