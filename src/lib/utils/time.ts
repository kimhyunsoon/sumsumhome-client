import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

interface TimeInterface extends Record<string, number> {
  day: number
  hour: number
  min: number
  second: number
}

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);

function secondsToTime(seconds: number): TimeInterface {
  if (seconds < 0) return { day: 0, hour: 0, min: 0, second: 0};
  const day = Math.floor(seconds / (24 * 60 * 60));
  const hour = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const min = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;
  return { day, hour, min, second: remainingSeconds };
}

function diffTimeToString(diffTime: TimeInterface, endTime: string = 'second') {
  const timeMap: Record<string, string> = {
    day: '일 ',
    hour: '시간 ',
    min: '분 ',
    second: '초 ',
  }
  let string = '';
  for (const key in diffTime) {
    const timeString: string = timeMap[key];
    if (diffTime[key] > 0) string += `${String(diffTime[key])}${timeString}`;
    if (endTime === key) break;
  }
  return string;
}

function getDiffDate(beforeDate: Date, afterDate: Date = new Date()): TimeInterface {
  const after = dayjs(afterDate);
  const before = dayjs(beforeDate);
  return secondsToTime(after.diff(before, 'second'));
}

function getDiffString(endTime: string, beforeDate: Date, afterDate: Date = new Date()): string {
  const after = dayjs(afterDate);
  const before = dayjs(beforeDate);
  const diffTime: TimeInterface = secondsToTime(after.diff(before, 'second'));
  return diffTimeToString(diffTime, endTime);
}

function makeLocalString(date: Date, format: string): string {
  return dayjs(new Date(date)).format(format);
}

function makeLocalStatusTimes(lightStatusTimes: string): any[] {
  const times = JSON.parse(lightStatusTimes);
  const timesObj: Record<number, any> = {};
  for (let i = 0; i < times.length; i += 1) {
    const local = dayjs.utc().set('hour', i).set('minute', 0).set('second', 0).tz();
    timesObj[Number(local.format('H'))] = times[i];
  }
  const result = Object.values(timesObj).sort((a, b) => a - b);
  return result;
}

function makeUtcHour(hour: number): number {
  return Number(dayjs.tz().set('hour', hour).set('minute', 0).set('second', 0).utc().format('H'));
}

function getClosetReserveRemainMin(lightStatusTimes: number[]) {
  const now = dayjs.utc();
  return lightStatusTimes
      .map((hour) => now.add(hour <= Number(now.format('H')) ? 1 : 0, 'day').hour(hour).minute(0).second(0))
      .sort((a, b) => a.diff(b))[0]
      .diff(now, 'minute');
}

function getLightInfoToAfterString(lightInfo: Record<string, any>): string {
  const { lightStatus, lightStatusTimes, lightOnMaxDuration, lightStatusRecentDate } = lightInfo;
  makeLocalStatusTimes(lightStatusTimes);
  const lightReserveTimes: number[] = JSON.parse(lightStatusTimes)
    .reduce((acc: number[], row: Record<string, number>, index: number) => {
      if (row.value === Number(!lightStatus)) acc.push(index);
      return acc;
    }, []);
  const durationMin = dayjs.utc().diff(dayjs(lightStatusRecentDate), 'minute'); // 현재 켜져있는 분 수  
  let remainMin: number = 0; // 상태가 변경예정인 시각까지의 분 수 (반환할 수치)
  // let resultString: string = ''; // 수치를 제외하고 반환할 값 (문구)
  let auto: boolean = false; // 자동 여부

  if (lightReserveTimes.length <= 0) { // 예약이 없을 경우
    if (!lightStatus) return '켜짐 예약이 없어요.' // 켜짐예약이 없을 경우 바로 반환
    else { // 꺼짐예약이 없을 경우 lightOnMaxDuration에 따라 반환
      remainMin = lightOnMaxDuration - durationMin
      auto = true;
    };
  } else {
    remainMin = getClosetReserveRemainMin(lightReserveTimes); // 예약시간 배열에서 가까운 예약시간까지 남은 분 수 도출
    if (lightStatus && (remainMin > lightOnMaxDuration - durationMin)) {
      remainMin = lightOnMaxDuration - durationMin;
      auto = true;
    }
  }

  return `${remainMin <= 0 ? '잠시 ' : diffTimeToString(secondsToTime(remainMin * 60))} 후 ${auto ? '자동으로' : ''} ${lightStatus ? '꺼질 예정이에요.' : '켜질 예정이에요.'}`
}

export {
  getDiffDate,
  getDiffString,
  makeLocalString,
  getLightInfoToAfterString,
  makeLocalStatusTimes,
  makeUtcHour,
  diffTimeToString,
  secondsToTime,
};