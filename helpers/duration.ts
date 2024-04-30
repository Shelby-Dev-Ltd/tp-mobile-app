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

export { parseDuration, serializeDuration };