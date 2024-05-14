import { getVideoDuration as gvd } from 'react-native-video-duration';

const parseDuration = (duration: string) => {
    const splittedDur = duration.split(':');
    const hours = splittedDur[0];
    const minutes = splittedDur[1];
    const seconds = splittedDur[2];

    return { hours, minutes, seconds }
};

const serializeDuration = (hours: string, minutes: string, seconds: string) => {
    return `${hours}:${minutes}:${seconds}`
};

const parseSecondsToHHMMSS = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 3600 % 60;

    const pad = (num: number) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const parseHHMMSSToSeconds = (hhmmss: string): number => {
    const [hours, minutes, seconds] = hhmmss.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

const getVideoDuration = async (url: string) => {
    try {
        const seconds = await gvd(url);
        const duration = parseSecondsToHHMMSS(Number(seconds));

        return duration;
    } catch (e) {
        console.error(e);
    }
};

export { parseDuration, serializeDuration, getVideoDuration, parseHHMMSSToSeconds };