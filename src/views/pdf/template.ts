const template = function (data: any) : string {
  const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
          <path d="M 45 0 c 15.103 0 27.389 12.287 27.389 27.389 C 72.389 46.616 46.147 66.607 45 90 c -1.147 -23.393 -27.389 -43.384 -27.389 -62.611 C 17.611 12.287 29.897 0 45 0 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,80,80); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
          <circle cx="45.004999999999995" cy="26.575000000000003" r="9.205" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(191,0,3); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      </g>
  </svg>`;
  const topArrowIcon = `<svg style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15" height="10" viewBox="0 0 256 256" xml:space="preserve">
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
          <path d="M 46.969 0.896 c -1.041 -1.194 -2.897 -1.194 -3.937 0 L 13.299 35.011 c -0.932 1.072 -0.171 2.743 1.25 2.743 h 14.249 V 88.09 c 0 1.055 0.855 1.91 1.91 1.91 h 28.584 c 1.055 0 1.91 -0.855 1.91 -1.91 V 37.754 h 14.249 c 1.421 0 2.182 -1.671 1.25 -2.743 L 46.969 0.896 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(39,193,39); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      </g>
  </svg>`;
  let tableRows = '';
  data.keywords.forEach((keyword: any) => {
    tableRows += `<tr>
        <td style="text-align: left;">${keyword.keyword}</td>
        <td>
            <p style="display: flex; align-items: center; text-align: center;justify-content: center;">
                ${locationIcon}
                <span>
                    ${keyword.currentRanking}
                </span>
            </p>
        </td>
        <td>
            <p style="display: flex; align-items: center; text-align: center;justify-content: center;">
                ${locationIcon}
                <span>
                    ${keyword.previousRanking}
                </span>
            </p>
        </td>
        <td>
            <p style="display: flex;align-items: center;text-transform: capitalize;">
                ${topArrowIcon}
                ${keyword.beforeSeoRanking} <span style="color: #39B54A;font-size: 10px;margin-left: 10px;">${keyword.beforeSeoRankingChange}</span>
            </p>
        </td>
    </tr>`;
  });
  const xAxis = JSON.stringify(data.xAxis);
  const series = JSON.stringify(data.keywords.map((keyword: any) => {return {
    label: keyword.keyword.toUpperCase(),
    data: keyword.rankings,
    pointRadius: 5,
    lineTension: 0.5,
  }}));
  return `<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report of ${data.domain}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        html {
            -webkit-print-color-adjust: exact;
        }
        th{
            padding: 10px 20px;
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
            padding: 10px 20px;
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
    </style>
</head>
<body style="background-color: #2D2973; margin: 0; padding: 50px;font-family: Arial;">
<h1 style="font-size: 40px;color: #ffffff; text-transform: uppercase;text-align: center;">SEARCH ENGINE RANKINGS</h1>
<h2 style="text-align: center;margin-bottom: 55px;">
    <span style="font-size: 25px; text-transform: uppercase; color:#ffffff;padding: 10px 40px;background: #7768DF;border-radius: 30px;">${data.domain}</span>
</h2>
<div style="position: relative; width: 100%;">
    <p style="position:absolute; top: -30px; left: 42.5%; width: 15%; text-align: center; color: #ffffff; font-size: 20px;text-transform: uppercase;background: #2D2973;">Ranking</p>
    <div style="border-top: 2px dotted #ffffff; margin: 20px 0;"></div>
</div>
<div style="display: flex;flex-wrap: nowrap;justify-content: space-around;margin-bottom: 10px;">
    <div style="display: flex;align-items: center;background: #36337A;width: calc(50% - 10px); border-radius: 10px;">
        <img src="https://i.ibb.co/NrrVPxH/first-Icon.png" alt="FirstIcon" style="margin-left: 10px;">
        <span style="color: #ffffff;font-size: 35px;font-weight: bold; margin: 0 20px;">${data.totalKeywords}</span>
        <span style="color: #ffffff; font-size: 15px; font-weight: 300;letter-spacing: 0.8px;line-height: 18px;">Total Keywords</span>
    </div>
    <div style="display: flex;align-items: center;background: #36337A;width: calc(50% - 10px); border-radius: 10px;">
        <img src="https://i.ibb.co/8B9Tpwz/second-Icon.png" alt="FirstIcon" style="margin-left: 10px;">
        <span style="color: #ffffff;font-size: 35px;font-weight: bold; margin: 0 20px;">${data.firstPageRanking}</span>
        <span style="color: #ffffff; font-size: 15px; font-weight: 300;letter-spacing: 0.8px;line-height: 18px;">Ranking <br> On First Page</span>
    </div>
</div>
<div style="display: flex;flex-wrap: nowrap;justify-content: space-around;">
    <div style="display: flex;align-items: center;background: #36337A;width: calc(50% - 10px); border-radius: 10px;">
        <img src="https://i.ibb.co/6FWvxqh/third-Icon.png" alt="FirstIcon" style="margin-left: 10px;">
        <span style="color: #ffffff;font-size: 35px;font-weight: bold; margin: 0 20px;">${data.secondPageRanking}</span>
        <span style="color: #ffffff; font-size: 15px; font-weight: 300;letter-spacing: 0.8px;line-height: 18px;">Ranking <br> On Second Page</span>
    </div>
    <div style="display: flex;align-items: center;background: #36337A;width: calc(50% - 10px); border-radius: 10px;">
        <img src="https://i.ibb.co/VtnNC8r/fourth-Icon.png" alt="FirstIcon" style="margin-left: 10px;">
        <span style="color: #ffffff;font-size: 35px;font-weight: bold; margin: 0 20px;">${data.improvedRanking}</span>
        <span style="color: #ffffff; font-size: 15px; font-weight: 300;letter-spacing: 0.8px;line-height: 18px;">Ranking Changes<br>Improved</span>
    </div>
</div>
<div style="position: relative; width: 100%;">
    <p style="position:absolute; top: -15px; left: 0; width: 50%; color: #ffffff; font-size: 12px;background: #2D2973;padding-left: 10px;">
        <span style="height: 10px;width: 20px;border-radius: 5px;display: inline-block;margin-right: 10px;background-color:#7768DF;"></span>Keywords Ranking on First Page in Major Search Engines
    </p>
    <div style="border-top: 2px dotted #ffffff; margin: 20px 0;"></div>
</div>
<div>
<canvas id="myChart"></canvas>
</div>
<div style="position: relative; width: 100%;margin-bottom: 20px;">
    <p style="background: #2D2973;padding-left: 10px;color: #ffffff;position:absolute;top: -30px;display: flex;align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\ts5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20\ts20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039\tl5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\tc-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\tc0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        <span style="display: inline-block;margin-left: 10px; padding-right: 10px;">Google (US)</span>
    </p>
    <div style="border-top: 2px dotted #ffffff; margin: 20px 0;"></div>
</div>
<div>
    <table style="width: 100%;color: #ffffff;border: none;border-collapse: collapse;border-radius: 10px;">
        <tr style="background-color:#7768DF;color: #ffffff;">
            <th style="border-top-left-radius: 10px;text-align: left;">Keyword</th>
            <th>Current <br> ${data.currentDate}</th>
            <th>Previous <br> ${data.previousDate}</th>
            <th style="border-top-right-radius: 10px;">Before SEO</th>
        </tr>
        ${tableRows}
    </table>
</div>
<div style="display: flex;margin-top: 30px;">
    <div style="display: flex;">
        <div style="width: 10%">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                <path d="M 45 0 c 15.103 0 27.389 12.287 27.389 27.389 C 72.389 46.616 46.147 66.607 45 90 c -1.147 -23.393 -27.389 -43.384 -27.389 -62.611 C 17.611 12.287 29.897 0 45 0 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <circle cx="45.004999999999995" cy="26.575000000000003" r="9.205" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(45,41,115); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
            </g>
        </svg>
        </div>
        <p style="width: 90%;margin-top: 0;color: #ffffff; word-spacing: 2px;">
            Represents the website rankings in the local map pack in the google search results.
            <br>
            <span style="display: inline-block; height: 5px; width: 30px;background-color: #FF2F5E;margin-top: 10px;border-radius: 3px;"></span>
        </p>
    </div>
    <div style="display: flex;">
        <div style="width: 10%">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
    <path d="M 81.517 86.864 H 60.004 c -1.519 0 -2.75 -1.231 -2.75 -2.75 V 23.222 c 0 -1.519 1.231 -2.75 2.75 -2.75 h 21.513 c 1.519 0 2.75 1.231 2.75 2.75 v 60.892 C 84.267 85.633 83.036 86.864 81.517 86.864 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 64.439 25.891 h 23.017 c 2.262 0 3.395 -2.858 1.795 -4.53 L 72.556 3.913 c -0.991 -1.036 -2.599 -1.036 -3.59 0 L 52.27 21.361 c -1.599 1.672 -0.467 4.53 1.795 4.53 L 64.439 25.891" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 52.408 84.306 V 32.767 H 38.867 c -1.413 0 -2.558 1.145 -2.558 2.558 v 48.981 c 0 1.413 1.145 2.558 2.558 2.558 h 16.099 C 53.553 86.864 52.408 85.719 52.408 84.306 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 31.463 84.306 V 45.062 h -10.75 c -1.413 0 -2.558 1.145 -2.558 2.558 v 36.686 c 0 1.413 1.145 2.558 2.558 2.558 h 13.308 C 32.608 86.864 31.463 85.719 31.463 84.306 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 13.308 84.306 V 57.357 H 2.558 C 1.145 57.357 0 58.502 0 59.915 v 24.391 c 0 1.413 1.145 2.558 2.558 2.558 h 13.308 C 14.454 86.864 13.308 85.719 13.308 84.306 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>
        </div>
        <p style="width: 90%;margin-top: 0;color: #ffffff; word-spacing: 2px;">
            Represents the website rankings in the knowledge panel of google search results.
            <br>
            <span style="display: inline-block; height: 5px; width: 30px;background-color: #FF2F5E;margin-top: 10px;border-radius: 3px;"></span>
        </p>
    </div>
    <div style="display: flex;">
        <div style="width: 10%">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                  <path d="M 85.414 11.8 H 4.586 C 2.053 11.8 0 13.853 0 16.386 v 57.228 C 0 76.147 2.053 78.2 4.586 78.2 h 80.828 c 2.533 0 4.586 -2.053 4.586 -4.586 V 16.386 C 90 13.853 87.947 11.8 85.414 11.8 z M 36.475 25.917 c 3.922 0 7.101 3.179 7.101 7.101 c 0 3.922 -3.179 7.101 -7.101 7.101 c -3.922 0 -7.101 -3.179 -7.101 -7.101 C 29.375 29.096 32.554 25.917 36.475 25.917 z M 81.269 73.163 H 8.731 c -2.273 0 -4.116 -1.843 -4.116 -4.116 l 15.26 -18.195 c 2.753 -3.282 7.745 -3.448 10.71 -0.355 l 0.963 1.005 c 2.991 3.12 8.038 2.919 10.771 -0.43 l 7.714 -9.451 c 2.809 -3.441 8.034 -3.542 10.973 -0.21 l 24.38 27.637 C 85.385 71.32 83.542 73.163 81.269 73.163 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              </g>
          </svg>
        </div>
        <p style="width: 90%;margin-top: 0;color: #ffffff; word-spacing: 2px;">
            Represents the website rankings in the carousel section of google search results.
            <br>
            <span style="display: inline-block; height: 5px; width: 30px;background-color: #FF2F5E;margin-top: 10px;border-radius: 3px;"></span>
        </p>
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
</html>`
};
export default template;