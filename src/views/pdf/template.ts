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
            <p style="display: flex;align-items: center;">
                ${topArrowIcon}
                ${keyword.beforeSeoRanking} <span style="color: #39B54A;font-size: 10px;margin-left: 10px;">${keyword.beforeSeoRankingChange}</span>
            </p>
        </td>
    </tr>`;
  });
  const chartData = JSON.stringify(data.chartData);
  return `<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report of ${data.domain}</title>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
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
            padding: 15px 20px;
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
<div id="chart"></div>
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
                <path d="M 45 0 c 15.103 0 27.389 12.287 27.389 27.389 C 72.389 46.616 46.147 66.607 45 90 c -1.147 -23.393 -27.389 -43.384 -27.389 -62.611 C 17.611 12.287 29.897 0 45 0 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <circle cx="45.004999999999995" cy="26.575000000000003" r="9.205" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(45,41,115); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
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
                <path d="M 45 0 c 15.103 0 27.389 12.287 27.389 27.389 C 72.389 46.616 46.147 66.607 45 90 c -1.147 -23.393 -27.389 -43.384 -27.389 -62.611 C 17.611 12.287 29.897 0 45 0 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <circle cx="45.004999999999995" cy="26.575000000000003" r="9.205" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(45,41,115); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
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
    const dynamicData = JSON.parse('${chartData}');
    var options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
            height: 200,
        },
        series: [{
            name: 'Ranking',
            data: dynamicData.rankings
        }],
        grid: {
            show: false
        },
        xaxis: {
            categories: dynamicData.xAxisData,
            labels: {
                style: {
                    colors: '#ffffff',
                }
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                }
            },
            axisBorder: {
                show: false
            }
        },
        markers: {
            size: 6,
            strokeWidth: 3,
            fillOpacity: 0,
            strokeOpacity: 0,
            label: {show: false}
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
</script>
</body>
</html>`
};
export default template;