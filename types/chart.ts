import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

export type DatasetsType = Array<Dataset>;

export type LineChartProps = {
    labels: Array<string>;
    datasets: DatasetsType;
}

export type PieChartData = {
    name: string;
    population: number;
    color: string,
    legendFontColor: string;
    legendFontSize: number;
}

export type PieChartProps = {
    data: Array<PieChartData>;
}