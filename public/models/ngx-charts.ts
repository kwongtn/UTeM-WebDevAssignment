export interface ChartDataElement {
  name: string;
  value: number;
}

export class ChartData {
  name: string = '';
  series: Array<ChartDataElement> = [];

  constructor(seriesName: string) {
    this.name = seriesName;
  }
}

export interface BarChartData extends Array<ChartData> {}
